'use client';

import { Unauthenticated } from 'convex/react';

import AuthDialog from './auth-dialog';
import { Button } from '@/components/ui/button';

const AuthHeaderContent = () => {
  return (
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
  );
};

export default AuthHeaderContent;
