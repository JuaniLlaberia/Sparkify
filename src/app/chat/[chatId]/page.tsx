'use client';

import { useParams } from 'next/navigation';

import Header from '@/components/custom/header';
import ChatView from './(components)/chat-view';
import CodeView from './(components)/code-view';
import ExportBtnsHeader from './(components)/export-btns-header';
import { Id } from '../../../../convex/_generated/dataModel';

const ChatPage = () => {
  const { chatId } = useParams<{ chatId: Id<'chats'> }>();

  return (
    <div className='flex flex-col w-full'>
      <Header content={<ExportBtnsHeader />} />
      <div className='min-h-[calc(100vh-4rem)] p-5 grid grid-cols-1 md:grid-cols-7 md:gap-4 xl:gap-10'>
        <ChatView chatId={chatId} />
        <CodeView chatId={chatId} />
      </div>
    </div>
  );
};

export default ChatPage;
