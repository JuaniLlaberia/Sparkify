'use client';

import { useMutation } from 'convex/react';
import { Loader, TriangleAlert } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { DialogTitle } from '@/components/ui/dialog';
import { api } from '../../../../convex/_generated/api';

type GeneralContentProps = {
  setIsOpen: (open: boolean) => void;
  onSuccess?: () => void;
};

const GeneralContent = ({ setIsOpen, onSuccess }: GeneralContentProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const deleteChats = useMutation(api.chats.deleteAllUserChats);

  const handleDeleteChats = async () => {
    setIsLoading(true);
    try {
      await deleteChats();

      setIsOpen(false);
      onSuccess?.();
      toast.success('All your chats have been deleted');
      router.push('/');
    } catch {
      toast.error('Failed to delete your chats');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex flex-col h-full'>
      <div className='flex-1 space-y-2.5'>
        <DialogTitle>Chats</DialogTitle>
        <div className='flex items-center justify-between'>
          <p className='text-sm'>Delete all chats</p>
          <Button
            size='sm'
            variant='destructive'
            onClick={handleDeleteChats}
            disabled={isLoading}
            className='min-w-20'
          >
            {isLoading ? (
              <Loader className='size-4 animate-spin' />
            ) : (
              'Delete all'
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

export default GeneralContent;
