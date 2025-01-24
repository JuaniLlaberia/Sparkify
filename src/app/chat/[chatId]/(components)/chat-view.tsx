'use client';

import { useAction, useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import PromptInput from '@/components/custom/promp-input';
import MessagesLoader from './messages-loader';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const ChatView = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { chatId } = useParams<{ chatId: Id<'chats'> }>();

  const messages = useQuery(api.messages.getMessages, { chatId });
  const generateGeminiResponse = useAction(api.gemini.generateResponse);
  const createMessage = useMutation(api.messages.createMessage);

  const sendMessage = async (prompt: string) => {
    setUserInput('');
    await createMessage({ role: 'user', content: prompt, chatId });

    try {
      setIsLoading(true);
      await generateGeminiResponse({
        prompt,
        chatId,
        history: messages?.map(msg => ({
          role: msg.role === 'user' ? 'user' : 'model',
          parts: [{ text: msg.content }],
        }))!,
      });
    } catch (e) {
      console.log(e);
      toast.error('Something went wrong! Try again please');
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToBottom = () =>
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });

  useEffect(() => {
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
        {isLoading && (
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
