'use client';

import { useState, type ReactElement } from 'react';

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

import { Button } from '@/components/ui/button';
import { Textarea } from '../ui/textarea';

type FeedbackDialogProps = {
  trigger?: ReactElement;
};

const FeedbackDialog = ({ trigger }: FeedbackDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [feedback, setFeedback] = useState<string>('');

  return (
    <Dialog
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <DialogTrigger asChild>
        {trigger || <Button size='sm'>Feedback</Button>}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className='text-xl'>Your Feedback</DialogTitle>
          <DialogDescription>
            Share your thoughts. Your feedback helps us improve.
          </DialogDescription>
        </DialogHeader>

        <Textarea
          id='feedback'
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder='Your feedback'
          rows={6}
          className='resize-none'
        />

        <DialogFooter className='justify-end'>
          <DialogClose asChild>
            <Button
              size='sm'
              variant='outline'
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            size='sm'
            className='min-w-16'
          >
            Send
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDialog;
