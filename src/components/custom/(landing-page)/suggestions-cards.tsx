'use client';

import { use } from 'react';

import { MessagesContext } from '@/context/messages-context';
import { SUGGESTIONS } from '@/lib/consts';

const SuggestionsCards = () => {
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
    <ul className='flex flex-wrap mt-8 md:mt-12 max-w-2xl items-center justify-center gap-2.5'>
      {SUGGESTIONS.map((suggestion, i) => (
        <li
          key={i}
          className='py-1 px-3 text-xs 2xl:text-sm text-muted-foreground border border-border rounded-full transition-colors hover:cursor-pointer hover:text-primary hover:bg-muted/25'
          onClick={() => handleGenerate(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsCards;
