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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type EditChatDialogProps = {
  chatId: Id<'chats'>;
  defaultName: string;
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const EditChatDialog = ({
  chatId,
  defaultName,
  trigger,
  onSuccess,
}: EditChatDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [name, setName] = useState<string>(defaultName);

  const updateChat = useMutation(api.chats.updateChat);

  const handleUpdateChat = async () => {
    if (name.trim().length === 0) {
      toast.error('Chat name is required');
      return;
    }
    setIsLoading(true);

    try {
      await updateChat({ chatId, chatData: { prompt: name } });

      onSuccess?.();
      toast.success('Chat updated successfully');
      setIsOpen(false);
    } catch {
      toast.error('Failed to update chat');
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
        {trigger || <Button size='sm'>Edit Chat</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Rename chat</DialogTitle>
          <DialogDescription>
            You can modify the chat name and it won&apos;t modify it&apos;s
            content.
          </DialogDescription>
        </DialogHeader>

        <div>
          <Label htmlFor='name'>Chat name</Label>
          <Input
            id='name'
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder='e.g. Application #1'
          />
        </div>

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
            onClick={handleUpdateChat}
            className='min-w-16'
          >
            {isLoading ? <Loader className='size-4 animate-spin' /> : 'Save'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditChatDialog;
