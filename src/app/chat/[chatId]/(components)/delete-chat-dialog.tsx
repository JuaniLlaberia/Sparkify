'use client';

import { useState, type ReactElement } from 'react';
import { useMutation } from 'convex/react';
import { toast } from 'sonner';
import { Loader } from 'lucide-react';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Id } from '../../../../../convex/_generated/dataModel';
import { api } from '../../../../../convex/_generated/api';
import { Button } from '@/components/ui/button';

type DeleteChatDialogProps = {
  chatId: Id<'chats'>;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const DeleteChatDialog = ({
  chatId,
  trigger,
  onSuccess,
}: DeleteChatDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const deleteChat = useMutation(api.chats.deleteChat);

  const handleDeleteChat = async () => {
    setIsLoading(true);

    try {
      await deleteChat({ chatId });

      onSuccess?.();
      toast.success('Message deleted successfully');
      setIsOpen(false);
    } catch {
      toast.error('Failed to delete chat');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Delete Chat</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Delete chat</DialogTitle>
          <DialogDescription>
            You are about to delete this chat. This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className='justify-end'>
          <DialogClose asChild>
            <Button
              size='sm'
              variant='outline'
              disabled={isLoading}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            disabled={isLoading}
            size='sm'
            variant='destructive'
            onClick={handleDeleteChat}
            className='min-w-16'
          >
            {isLoading ? <Loader className='size-4 animate-spin' /> : 'Confirm'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteChatDialog;
