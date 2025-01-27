'use client';

import { Download, Rocket } from 'lucide-react';
import { useParams } from 'next/navigation';

import Header from '@/components/custom/header';
import ChatView from './(components)/chat-view';
import CodeView from './(components)/code-view';
import { Button } from '@/components/ui/button';
import { Id } from '../../../../convex/_generated/dataModel';

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: Id<'chats'> }>();

  return (
    <div className='flex flex-col w-full'>
      <Header
        content={
          <div className='space-x-2.5'>
            <Button
              size='sm'
              variant='secondary'
            >
              <Download className='size-4 mr-1.5' /> Export
            </Button>
            <Button
              size='sm'
              variant='special'
            >
              <Rocket className='size-4 mr-1.5' /> Deploy
            </Button>
          </div>
        }
      />
      <div className='min-h-[calc(100vh-4rem)] p-5 grid grid-cols-1 md:grid-cols-7 md:gap-4 xl:gap-10'>
        <ChatView chatId={chatId} />
        <CodeView chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
