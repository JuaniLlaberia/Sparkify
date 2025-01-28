'use client';

import Link from 'next/link';
import { useQuery } from 'convex/react';
import { ChevronRight } from 'lucide-react';

import { DialogTitle } from '@/components/ui/dialog';
import { api } from '../../../../convex/_generated/api';
import { Skeleton } from '@/components/ui/skeleton';
import { formatNumber } from '@/lib/helpers';
import { buttonVariants } from '@/components/ui/button';

type TokensContentProps = {
  setIsOpen: (open: boolean) => void;
  onSuccess?: () => void;
};

const TokensContent = ({ setIsOpen, onSuccess }: TokensContentProps) => {
  const user = useQuery(api.users.currentUser);

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 space-y-2.5'>
        <DialogTitle>Usage</DialogTitle>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Your tokens</p>
          {user ? (
            <p>
              {formatNumber(user.tokens)}{' '}
              <span className='text-muted-foreground text-sm'>tokens left</span>
            </p>
          ) : (
            <Skeleton className='w-24 h-6' />
          )}
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <p className='text-muted-foreground text-sm'>Need more tokens?</p>
        <Link
          href='/chat/tokens'
          className={buttonVariants({ size: 'sm' })}
          onClick={() => {
            setIsOpen(false);
            onSuccess?.();
          }}
        >
          Go to Tokens
          <ChevronRight className='size-4' />
        </Link>
      </div>
    </div>
  );
};

export default TokensContent;
