'use client';

import { useAction, useMutation, useQuery } from 'convex/react';
import { Sparkles } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';

import PromptInput from '@/components/custom/promp-input';
import MessagesLoader from './messages-loader';
import Thumbnail from '@/components/ui/thumbnail';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useLoaders } from '@/context/loaders-context';
import { convertImageToBase64 } from '@/lib/helpers';

type ChatViewProps = {
  chatId: Id<'chats'>;
};

const ChatView = ({ chatId }: ChatViewProps) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [userInput, setUserInput] = useState<string>('');
  const [userImage, setUserImage] = useState<File>();
  const [isUploadingImg, setIsUploadingImg] = useState<boolean>(false);
  const { setIsLoadingCode, setIsLoadingMessage, isLoadingMessage } =
    useLoaders();

  const messages = useQuery(api.messages.getMessages, { chatId });
  const createMessage = useMutation(api.messages.createMessage);
  const generateGeminiMessage = useAction(api.gemini.generateGeminiMessage);
  const generateGeminiCode = useAction(api.gemini.generateGeminiCode);
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);

  const sendMessage = async (prompt: string) => {
    try {
      let imageDB:
        | {
            storageId: Id<'_storage'>;
            name: string;
            size: number;
          }
        | undefined;
      let imageBase64: string | undefined;

      // Proccess image in case we have one
      if (userImage) {
        setIsUploadingImg(true);

        try {
          const uploadUrl = await generateUploadUrl();
          const result = await fetch(uploadUrl, {
            method: 'POST',
            body: userImage,
          });
          const { storageId } = await result.json();
          imageDB = {
            storageId,
            name: userImage.name,
            size: userImage.size,
          };

          imageBase64 = await convertImageToBase64(userImage);

          setIsUploadingImg(false);
          setUserInput('');
        } catch {
          toast.error('Failed to upload/process image');
          return;
        } finally {
          setUserImage(undefined);
        }
      } else {
        setUserInput('');
      }

      // Create user message
      await createMessage({
        role: 'user',
        content: prompt,
        image: imageDB,
        chatId,
      });

      // Process Gemini responses
      setIsLoadingMessage(true);
      setIsLoadingCode(true);

      const history = messages?.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }))!;

      await Promise.all([
        generateGeminiMessage({
          prompt,
          chatId,
          history,
        }).then(() => setIsLoadingMessage(false)),

        generateGeminiCode({
          prompt,
          image: imageBase64,
          chatId,
          history,
        }).then(() => setIsLoadingCode(false)),
      ]);
    } catch (error) {
      const errorMessage =
        error instanceof Error && error.message.includes('Insufficient credits')
          ? 'Not enough credits! Please purchase more credits to continue.'
          : 'Something went wrong! Try again please';

      toast.error(errorMessage);
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
                    <AvatarImage src={message.userImage} />
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
              <div className='flex flex-col gap-2.5'>
                <p className='text-sm'>{message.content}</p>
                <Thumbnail
                  url={message.image.url}
                  name={message.image.name}
                  size={message.image.size}
                />
              </div>
            </li>
          ))
        )}
        {isLoadingMessage && (
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
        userImage={userImage}
        setUserImage={setUserImage}
        isUploading={isUploadingImg}
      />
    </section>
  );
};

export default ChatView;
