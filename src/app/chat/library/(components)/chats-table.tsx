'use client';

import { useState } from 'react';
import { Loader, MessageSquare, Plus, Search } from 'lucide-react';
import { usePaginatedQuery } from 'convex/react';

import ChatsActions from '@/components/(sidebar)/chats-actions';
import { Input } from '@/components/ui/input';
import { api } from '../../../../../convex/_generated/api';
import { Separator } from '@/components/ui/separator';
import { formatRelativeDate } from '@/lib/helpers';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import Link from 'next/link';

const BATCH_SIZE = 10;

const ChatsTable = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { results, status, loadMore } = usePaginatedQuery(
    api.chats.getAllUserChatsPaginated,
    {},
    { initialNumItems: BATCH_SIZE }
  );

  const filteredResults = results.filter(result =>
    result.prompt?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className='w-full max-w-7xl space-y-1.5'>
      <h1 className='text-xl font-semibold mb-3'>Library</h1>
      <div className='relative w-full'>
        <Input
          type='text'
          placeholder='Search for your chat...'
          className='w-full pl-10 pr-4 bg-background/75'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
          <Search className='size-4 text-muted-foreground' />
        </div>
      </div>
      {status === 'LoadingFirstPage' ? (
        <ul className='space-y-1.5'>
          {[...Array(5)].map((_, index) => (
            <li key={index}>
              <Skeleton className='w-full h-24' />
            </li>
          ))}
        </ul>
      ) : (
        <ul className='space-y-1.5 w-full'>
          {filteredResults.length > 0 ? (
            filteredResults.map(result => (
              <li
                key={result._id}
                className='w-full'
              >
                <Link
                  href={`/chat/${result._id}`}
                  className='block w-full'
                >
                  <div className='w-full bg-muted/25 border border-border rounded-lg p-2.5 px-3.5 hover:bg-muted/50 transition-colors'>
                    <p className='flex items-center gap-2'>
                      <MessageSquare className='size-4 shrink-0' />
                      <span className='truncate'>{result.prompt}</span>
                    </p>
                    <Separator className='my-2.5' />
                    <div className='flex items-center justify-between'>
                      <p className='text-sm text-muted-foreground'>
                        {formatRelativeDate(result._creationTime)}
                      </p>
                      <ChatsActions
                        chatData={result}
                        showOnHover={false}
                      />
                    </div>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <p className='text-sm text-muted-foreground text-center py-6'>
              {searchTerm ? 'No chats match your search' : 'No chats found'}
            </p>
          )}
        </ul>
      )}

      <div className='flex items-center justify-end gap-3'>
        {status === 'LoadingMore' && <Loader className='size-4 animate-spin' />}
        {filteredResults.length > 0 && (
          <Button
            onClick={() => loadMore(BATCH_SIZE)}
            disabled={status !== 'CanLoadMore'}
            variant='outline'
            size='sm'
          >
            <Plus /> Load more
          </Button>
        )}
      </div>
    </section>
  );
};

export default ChatsTable;
