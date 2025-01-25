'use client';

import Link from 'next/link';
import { ArrowLeft, RefreshCcw } from 'lucide-react';

import { Button } from '@/components/ui/button';

const ErrorPage = ({ reset }: { reset: () => void }) => {
  return (
    <section className='flex items-center justify-center w-full'>
      <div className='text-center px-4 sm:px-6 lg:px-8 max-w-2xl'>
        <h1 className='text-6xl sm:text-7xl font-bold mb-6 text-destructive'>
          Oops!
        </h1>
        <h2 className='text-3xl sm:text-4xl font-semibold mb-6 text-foreground'>
          Something went wrong
        </h2>
        <p className='text-lg sm:text-xl mb-8 text-muted-foreground'>
          We apologize for the inconvenience. Our team has been notified and is
          working on a fix.
        </p>
        <div className='flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4'>
          <Button
            onClick={() => reset()}
            size='lg'
            className='group w-full sm:w-auto'
          >
            <RefreshCcw className='mr-2 h-4 w-4 transition-transform group-hover:rotate-180' />
            Try Again
          </Button>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='group w-full sm:w-auto'
          >
            <Link href='/'>
              <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
              Go Back Home
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ErrorPage;
