'use client';

import Link from 'next/link';
import { BookOpen, LogOut, Settings } from 'lucide-react';
import { useAuthActions } from '@convex-dev/auth/react';
import { useQuery } from 'convex/react';

import { api } from '../../../convex/_generated/api';
import { Skeleton } from '../ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserMenu = () => {
  const { signOut } = useAuthActions();

  const user = useQuery(api.users.currentUser);
  if (!user) return <Skeleton className='size-8' />;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
          <AvatarImage
            src={user.image}
            alt='Profile photo'
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side='bottom'
        align='end'
        className='mb-1'
      >
        <DropdownMenuLabel className='flex items-center gap-3 font-normal'>
          <Avatar>
            <AvatarFallback>{user.fullName?.charAt(0)}</AvatarFallback>
            <AvatarImage
              src={user.image}
              alt='Profile photo'
            />
          </Avatar>
          <div>
            <p className='font-semibold'>{user.fullName}</p>
            <p className='text-xs text-muted-foreground'>{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href='/chat/library'>
            <BookOpen
              className='size-4 mr-2'
              strokeWidth={1.5}
            />
            Library
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href='/chat/settings'>
            <Settings
              className='size-4 mr-2'
              strokeWidth={1.5}
            />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={signOut}>
          <LogOut
            className='size-4 mr-2'
            strokeWidth={1.5}
          />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
