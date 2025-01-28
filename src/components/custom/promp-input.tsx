'use client';

import Image from 'next/image';
import { ArrowRight, Link, Loader, X } from 'lucide-react';
import {
  useRef,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from 'react';

import Hint from '../ui/hint';
import { Button } from '../ui/button';
import { useLoaders } from '@/context/loaders-context';
import { formatFileSize } from '@/lib/helpers';

type PromptInputProps = {
  handleSend: (input: string) => void;
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  userImage: File | undefined;
  setUserImage: Dispatch<SetStateAction<File | undefined>>;
  isUploading: boolean;
};

const PromptInput = ({
  handleSend,
  userInput,
  setUserInput,
  userImage,
  setUserImage,
  isUploading,
}: PromptInputProps) => {
  const imageElementRef = useRef<HTMLInputElement>(null);

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
      {!!userImage && (
        <div className='pb-3'>
          <div className='relative max-w-[200px] bg-background border border-border rounded-lg p-1.5 flex items-center gap-3 justify-start group/image'>
            {!isUploading && (
              <Hint label='Remove image'>
                <button
                  onClick={() => {
                    setUserImage(undefined);
                    imageElementRef.current!.value = '';
                  }}
                  className='hidden group-hover/image:flex rounded-full bg-accent absolute -top-2.5 -right-2.5 text-white size-6 z-[4] border-2 border-border items-center justify-center'
                >
                  <X className='size-3.5' />
                </button>
              </Hint>
            )}
            <Image
              src={URL.createObjectURL(userImage)}
              alt='uploaded'
              width={50}
              height={50}
              className='rounded-lg overflow-hidden object-cover'
            />
            <div>
              <p className='text-xs font-medium line-clamp-1'>
                {userImage.name}
              </p>
              <p className='text-xs text-muted-foreground'>
                {formatFileSize(userImage.size)}
              </p>
            </div>
            {isUploading && (
              <div className='absolute top-0 left-0 bg-background/60 w-full h-full flex items-center justify-center rouned-lg'>
                <Loader className='absolute size-5 animate-spin' />
              </div>
            )}
          </div>
        </div>
      )}
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
            disabled={isLoadingMessage || isUploading}
          >
            <ArrowRight
              className='size-6'
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <>
          <Hint
            label='Upload file'
            side='bottom'
          >
            <Button
              disabled={isUploading}
              onClick={() => imageElementRef.current?.click()}
              variant='ghost'
              size='icon'
            >
              <Link
                className='size-4'
                strokeWidth={2.5}
              />
            </Button>
          </Hint>
          <input
            type='file'
            accept='image/*'
            className='hidden'
            ref={imageElementRef}
            onChange={e => setUserImage(e.target.files![0])}
          />
        </>
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
