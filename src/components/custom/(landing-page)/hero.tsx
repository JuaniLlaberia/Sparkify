'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';

import PromptInput from '../promp-input';
import SuggestionsCards from './suggestions-cards';
import { AnimatedShinyText } from '@/components/ui/animated-shiny-text';
import { cn } from '@/lib/utils';
import { api } from '../../../../convex/_generated/api';

const Hero = () => {
  const [userInput, setUsetInput] = useState<string>('');
  const router = useRouter();
  const createChat = useMutation(api.chats.createChat);

  const handleGenerate = async (prompt: string) => {
    try {
      const chatId = await createChat({
        prompt,
        message: { role: 'user', content: prompt },
      });

      router.push(`/chat/${chatId}`);
      toast.success('Chat created successfully');
    } catch {
      toast.error('Failed to create chat');
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
        setUserInput={setUsetInput}
      />
      <SuggestionsCards />
    </div>
  );
};

export default Hero;
