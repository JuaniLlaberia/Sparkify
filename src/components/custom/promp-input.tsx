'use client';

import { ArrowRight, Link } from 'lucide-react';
import { use, useState } from 'react';

import Hint from '../ui/hint';
import { Button } from '../ui/button';
import { MessagesContext } from '@/context/messages-context';

const PromptInput = () => {
  const [userInput, setUsetInput] = useState<string>('');

  const messagesContext = use(MessagesContext);
  if (!messagesContext)
    throw new Error('Messages context must be used within a MessagesProvider.');
  const { setMessages } = messagesContext;

  const handleGenerate = (input: string) => {
    setMessages([
      {
        role: 'user',
        content: input,
      },
    ]);
  };

  return (
    <div className='p-5 border border-border bg-muted/25 rounded-xl max-w-[34rem] w-full mt-3'>
      <div className='flex gap-2 relative'>
        <textarea
          autoFocus
          placeholder='What do you have in mind?'
          className='outline-none bg-transparent border-transparent w-full h-24 max-h-48 resize-none placeholder:text-muted-foreground'
          onChange={e => setUsetInput(e.target.value)}
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
            onClick={() => handleGenerate(userInput)}
          >
            <ArrowRight
              className='size-6'
              strokeWidth={2.5}
            />
          </Button>
        </div>
      </div>
      <div>
        <Hint
          label='Upload file'
          side='bottom'
        >
          <Button
            variant='ghost'
            size='icon'
          >
            <Link
              className='size-4'
              strokeWidth={2.5}
            />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export default PromptInput;
