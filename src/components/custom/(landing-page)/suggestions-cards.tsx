'use client';

import { SUGGESTIONS } from '@/lib/consts';

type SuggestionsCardsProps = {
  handleSend: (input: string) => void;
};

const SuggestionsCards = ({ handleSend }: SuggestionsCardsProps) => {
  return (
    <ul className='flex flex-wrap mt-8 md:mt-12 max-w-2xl items-center justify-center gap-2.5'>
      {SUGGESTIONS.map((suggestion, i) => (
        <li
          key={i}
          className='py-1 px-3 text-xs 2xl:text-sm text-muted-foreground border border-border rounded-full transition-colors hover:cursor-pointer hover:text-primary hover:bg-muted/25'
          onClick={() => handleSend(suggestion)}
        >
          {suggestion}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionsCards;
