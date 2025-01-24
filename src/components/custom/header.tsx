'use client';

import { Authenticated, AuthLoading, Unauthenticated } from 'convex/react';
import { Sparkles } from 'lucide-react';

import AuthDialog from './(landing-page)/auth-dialog';
import UserMenu from './user-menu';
import { Button } from '../ui/button';
import { Skeleton } from '../ui/skeleton';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className='flex items-center justify-between p-3.5'>
      <Link
        href='/'
        className='flex items-center gap-1.5 font-semibold'
      >
        <Sparkles
          className='size-4'
          fill='white'
        />
        Sparkify UI
      </Link>

      <AuthLoading>
        <Skeleton className='size-8' />
      </AuthLoading>
      <Unauthenticated>
        <div className='flex gap-2.5'>
          <AuthDialog
            trigger={
              <Button
                size='sm'
                variant='secondary'
              >
                Sign In
              </Button>
            }
          />
          <AuthDialog
            trigger={
              <Button
                size='sm'
                variant='special'
              >
                Get Started
              </Button>
            }
          />
        </div>
      </Unauthenticated>
      <Authenticated>
        <UserMenu />
      </Authenticated>
    </nav>
  );
};

export default Header;
