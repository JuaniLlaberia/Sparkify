'use client';

import { useMutation } from 'convex/react';
import { Loader, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuthActions } from '@convex-dev/auth/react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import { api } from '../../../../convex/_generated/api';

type AccountContentProps = {
  setIsOpen: (open: boolean) => void;
  onSuccess?: () => void;
};

const AccountContent = ({ setIsOpen, onSuccess }: AccountContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const { signOut } = useAuthActions();

  const deleteUserAccount = useMutation(api.users.deleteUser);

  const handleDeleteUserAccount = async () => {
    setIsLoading(true);
    try {
      await deleteUserAccount();

      setIsOpen(false);
      onSuccess?.();

      signOut();
      toast.success('Your account has been deleted successfully');
      router.push('/');
    } catch {
      toast.error('Failed to delete your account');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 space-y-2.5'>
        <DialogTitle>Account</DialogTitle>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Delete your account</p>
          <Button
            size='sm'
            variant='destructive'
            onClick={handleDeleteUserAccount}
            disabled={isLoading}
            className='min-w-20'
          >
            {isLoading ? (
              <Loader className='size-4 animate-spin' />
            ) : (
              'Delete account'
            )}
          </Button>
        </div>
      </div>

      <Alert variant='destructive'>
        <TriangleAlert className='h-4 w-4' />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription>
          This action is irreversible. All data will be deleted.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default AccountContent;
