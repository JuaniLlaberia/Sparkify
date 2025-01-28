'use client';

import { Download, Rocket } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useSandpackActions } from '@/context/sandpack-action-context';

const ExportBtnsHeader = () => {
  const { setAction } = useSandpackActions();

  return (
    <div className='space-x-2.5'>
      <Button
        size='sm'
        variant='secondary'
        onClick={() =>
          setAction({
            actionType: 'export',
            timeStamp: Date.now(),
          })
        }
      >
        <Download className='size-4 mr-1.5' /> Export
      </Button>
      <Button
        size='sm'
        variant='special'
        onClick={() =>
          setAction({
            actionType: 'deploy',
            timeStamp: Date.now(),
          })
        }
      >
        <Rocket className='size-4 mr-1.5' /> Deploy
      </Button>
    </div>
  );
};

export default ExportBtnsHeader;
