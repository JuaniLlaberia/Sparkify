'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAction, useConvexAuth, useMutation } from 'convex/react';
import { toast } from 'sonner';

import PromptInput from '../promp-input';
import SuggestionsCards from './suggestions-cards';
import AuthDialog from './auth-dialog';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import { api } from '../../../../convex/_generated/api';
import { useLoaders } from '@/context/loaders-context';
import { convertImageToBase64 } from '@/lib/helpers';
import { Id } from '../../../../convex/_generated/dataModel';

const Hero = () => {
  const router = useRouter();
  const [userInput, setUserInput] = useState<string>('');
  const [userImage, setUserImage] = useState<File>();
  const [isUploadingImg, setIsUploadingImg] = useState<boolean>(false);
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState<boolean>(false);
  const { setIsLoadingCode, setIsLoadingMessage } = useLoaders();

  const { isLoading, isAuthenticated } = useConvexAuth();

  const createChat = useMutation(api.chats.createChat);
  const generateGeminiMessage = useAction(api.gemini.generateGeminiMessage);
  const generateGeminiCode = useAction(api.gemini.generateGeminiCode);
  const generateUploadUrl = useMutation(api.upload.generateUploadUrl);

  const handleGenerate = async (prompt: string) => {
    if (!isAuthenticated && !isLoading) {
      setIsAuthDialogOpen(true);
      return;
    }

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
        } catch (error) {
          toast.error('Failed to upload/process image');
          return;
        } finally {
          setUserImage(undefined);
        }
      } else {
        setUserInput('');
      }

      setIsLoadingMessage(true);
      setIsLoadingCode(true);

      const chatId = await createChat({
        prompt,
        image: imageDB,
        message: { role: 'user', content: prompt },
      });

      router.push(`/chat/${chatId}`);
      toast.success('Chat created successfully');

      await Promise.all([
        generateGeminiMessage({
          prompt,
          chatId,
          history: [],
        }).then(() => setIsLoadingMessage(false)),

        generateGeminiCode({
          prompt,
          image: imageBase64,
          chatId,
          history: [],
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

  return (
    <div className='flex flex-col items-center mt-24 md:mt-48 gap-2 p-6'>
      <div
        className={cn(
          'mb-3 md:mb-8 rounded-full border border-border/50 transition-all ease-in hover:cursor-pointer bg-transparent hover:bg-muted/20'
        )}
      >
        <AnimatedShinyText className='inline-flex items-center justify-center text-sm px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400 lg:text-sm'>
          <span>⚡ Build Smarter, Code Faster, Use Sparkify</span>
        </AnimatedShinyText>
      </div>
      <h1 className='font-semibold text-4xl md:text-[44px] leading-[40px]'>
        What do you want to build?
      </h1>
      <p className='text-muted-foreground font-medium text-base md:text-lg mt-1'>
        Prompt, run, edit, and deploy full-stack web apps.
      </p>
      <PromptInput
        handleSend={handleGenerate}
        userInput={userInput}
        setUserInput={setUserInput}
        userImage={userImage}
        setUserImage={setUserImage}
        isUploading={isUploadingImg}
      />
      <SuggestionsCards handleSend={handleGenerate} />

      {/* Dialog for when the user is not authenticated */}
      <AuthDialog
        isOpen={isAuthDialogOpen}
        setIsOpen={setIsAuthDialogOpen}
      />
    </div>
  );
};

export default Hero;
