'use client';

import { Unauthenticated } from 'convex/react';
import { useState } from 'react';

import AuthDialog from './auth-dialog';
import { Button } from '@/components/ui/button';

const AuthHeaderContent = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Unauthenticated>
      <div className='flex gap-2.5'>
        <AuthDialog
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
          isOpen={isOpen}
          setIsOpen={setIsOpen}
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
