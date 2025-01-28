import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { formatNumber } from '@/lib/helpers';
import { Skeleton } from '@/components/ui/skeleton';
import { Doc } from '../../../../../convex/_generated/dataModel';

const TokensCard = ({ user }: { user?: Doc<'users'> }) => {
  return (
    <div className='flex flex-1 items-center min-h-20 px-6 py-4 border bg-muted/25 border-border rounded-lg'>
      {user ? (
        <div className='flex flex-col w-[60%]'>
          <div className='flex items-center gap-2.5'>
            <Avatar>
              <AvatarFallback>{user?.fullName?.charAt(0)}</AvatarFallback>
              <AvatarImage src={user?.image} />
            </Avatar>
            <div>
              <span className='font-bold'>{formatNumber(user?.tokens)}</span>
              <span className='text-muted-foreground text-sm'>
                {' '}
                tokens left
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton className='w-40 h-6' />
      )}
      <div className='ml-auto text-right text-sm'>
        <h2 className='font-bold mb-1'>Need more tokens?</h2>
        <span className='text-muted-foreground'>
          Buy one of the packages below.
        </span>
      </div>
    </div>
  );
};

export default TokensCard;
