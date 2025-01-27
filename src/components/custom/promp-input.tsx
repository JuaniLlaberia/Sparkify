'use client';

import { ArrowRight } from 'lucide-react';
import type { Dispatch, KeyboardEvent, SetStateAction } from 'react';

import { Button } from '../ui/button';
import FileSelector from './file-selector';
import { useLoaders } from '@/context/loaders-context';

type PromptInputProps = {
  handleSend: (input: string) => void;
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
};

const PromptInput = ({
  handleSend,
  userInput,
  setUserInput,
}: PromptInputProps) => {
  const { isLoadingMessage } = useLoaders();

  const handleEnterPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();

      if (e.shiftKey) {
        setUserInput(userInput + '\n');
      } else if (userInput.trim() !== '') {
        handleSend(userInput);
      }
    }
  };

  return (
    <div className='p-5 border border-border bg-muted/25 mb-5 md:mb-0 rounded-xl max-w-[34rem] w-full mt-3'>
      <div className='flex gap-2 relative'>
        <textarea
          autoFocus
          placeholder='What do you have in mind?'
          className='outline-none bg-transparent border-transparent w-full pr-10 h-24 max-h-48 resize-none placeholder:text-muted-foreground'
          value={userInput}
          onChange={e => setUserInput(e.target.value)}
          onKeyDown={handleEnterPress}
        />
        <div
          className={`
          absolute right-0 transition-all duration-300
          ${
            userInput
              ? 'translate-y-0 opacity-100'
              : 'translate-y-full opacity-0'
          }
        `}
        >
          <Button
            size='icon'
            variant='special'
            onClick={() => handleSend(userInput)}
            disabled={isLoadingMessage}
          >
            <ArrowRight
              className='size-6'
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <FileSelector />
        {userInput && (
          <p className='text-xs text-muted-foreground font-light'>
            Use{' '}
            <span className='bg-muted p-1 px-1.5 rounded-md text-primary'>
              Shift
            </span>{' '}
            +{' '}
            <span className='bg-muted p-1 px-1.5 rounded-md text-primary'>
              Enter
            </span>{' '}
            for a new line
          </p>
        )}
      </div>
    </div>
  );
};

export default PromptInput;
