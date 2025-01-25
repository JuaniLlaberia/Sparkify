'use client';

import { useAction, useMutation, useQuery } from 'convex/react';
import { Sparkles } from 'lucide-react';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import PromptInput from '@/components/custom/promp-input';
import MessagesLoader from './messages-loader';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ChatViewProps = {
  chatId: Id<'chats'>;
  isLoading: boolean;
  handleChatLoader: Dispatch<SetStateAction<boolean>>;
  handleCodeLoader: Dispatch<SetStateAction<boolean>>;
};

const ChatView = ({
  chatId,
  isLoading,
  handleChatLoader,
  handleCodeLoader,
}: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState<string>('');

  const messages = useQuery(api.messages.getMessages, { chatId });
  const createMessage = useMutation(api.messages.createMessage);
  const generateGeminiMessage = useAction(api.gemini.generateGeminiMessage);
  const generateGeminiCode = useAction(api.gemini.generateGeminiCode);

  //For having a loading state when I am redirected from the home-page (can't use isLoading)
  const redirectedLoading = messages?.length === 1;

  const sendMessage = async (prompt: string) => {
    setUserInput('');
    await createMessage({ role: 'user', content: prompt, chatId });

    try {
      handleChatLoader(true);
      handleCodeLoader(true);

      const history = messages?.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))!;

      generateGeminiMessage({
        prompt,
        chatId,
        history,
      }).then(() => handleChatLoader(false));

      generateGeminiCode({
        prompt,
        chatId,
        history,
      }).then(() => handleCodeLoader(false));
    } catch {
      toast.error('Something went wrong! Try again please');
    }
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
    if (!messages) return;

    scrollToBottom();
  }, [messages]);

  return (
    <section className='flex flex-col col-span-full md:col-span-3 lg:col-span-2 h-[89vh]'>
      <ul className='flex-1 space-y-1.5 overflow-y-auto scrollbar-thin scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thumb-muted scrollbar-track-transparent pb-3 pr-1'>
        {messages === undefined ? (
          <MessagesLoader />
        ) : (
          messages.map(message => (
            <li
              key={message._id}
              className='flex gap-3 items-start bg-muted/25 border border-border rounded-xl p-3'
            >
              <Avatar>
                {message.role === 'user' ? (
                  <>
                    <AvatarFallback>{message.user?.charAt(0)}</AvatarFallback>
                    <AvatarImage src={message.image} />
                  </>
                ) : (
                  <AvatarFallback>
                    <Sparkles
                      className='size-4'
                      fill='white'
                    />
                  </AvatarFallback>
                )}
              </Avatar>
              <p className='text-sm'>{message.content}</p>
            </li>
          ))
        )}
        {(isLoading || redirectedLoading) && (
          <p className='flex items-center gap-1.5 justify-center text-sm pt-1 animate-pulse'>
            <Sparkles
              className='size-4'
              fill='white'
            />
            Sparkify is thinking...
          </p>
        )}

        <div ref={messagesEndRef} />
      </ul>

      <PromptInput
        handleSend={sendMessage}
        userInput={userInput}
        setUserInput={setUserInput}
      />
    </section>
  );
};

export default ChatView;
