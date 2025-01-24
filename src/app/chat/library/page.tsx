import Header from '@/components/custom/header';
import ChatsTable from './(components)/chats-table';

const LibraryPage = () => {
  return (
    <div className='flex flex-col w-full'>
      <Header />
      <div className='w-full flex justify-center min-h-[calc(100vh-4rem)] p-5'>
        <ChatsTable />
      </div>
    </div>
  );
};

export default LibraryPage;
