'use client';

import { useAuthActions } from '@convex-dev/auth/react';
import { type ReactElement } from 'react';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { GitHubLogo } from '../github-logo';
import { GoogleLogo } from '../google-logo';

type AuthDialogProps = {
  trigger?: ReactElement;
};

const AuthDialog = ({ trigger }: AuthDialogProps) => {
  const { signIn } = useAuthActions();

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Sign In</Button>}
      </DialogTrigger>
      <DialogContent>
        <div className='space-y-1 flex flex-col items-center mb-4'>
          <DialogTitle className='text-2xl'>Welcome to Sparkify</DialogTitle>
          <DialogDescription>
            To use Sparkify you must log into an account or create one.
          </DialogDescription>
        </div>

        <div className='flex flex-col gap-2 px-10'>
          <Button
            className='flex-1'
            variant='outline'
            type='button'
            onClick={() => signIn('google')}
          >
            <GoogleLogo className='mr-2 size-4' /> Google
          </Button>
          <Button
            className='flex-1'
            variant='outline'
            type='button'
            onClick={() => signIn('github')}
          >
            <GitHubLogo className='mr-2 size-4' /> GitHub
          </Button>
        </div>

        <DialogFooter className='justify-center mt-3'>
          <p className='text-sm text-muted-foreground'>
            By using Sparkify, you understand that it can make mistakes.
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
