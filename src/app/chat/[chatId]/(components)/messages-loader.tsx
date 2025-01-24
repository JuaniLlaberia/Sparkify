import { Skeleton } from '@/components/ui/skeleton';

const MessagesLoader = () => {
  return (
    <ul className='space-y-1.5'>
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <li key={i}>
          <Skeleton className='w-full h-28 flex items-start gap-3 rounded-xl p-2.5'>
            <Skeleton className='size-8 shrink-0' />
            <div className='w-full space-y-2'>
              <Skeleton className='h-5 w-full' />
              <Skeleton className='h-5 w-full' />
              <Skeleton className='h-5 w-full' />
            </div>
          </Skeleton>
        </li>
      ))}
    </ul>
  );
};

export default MessagesLoader;
