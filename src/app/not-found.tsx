import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className='flex items-center justify-center w-full'>
      <div className='text-center px-4 sm:px-6 lg:px-8'>
        <div className='relative'>
          <div className='absolute inset-0 flex items-center justify-center opacity-10'>
            <div className='text-[20rem] font-extrabold text-primary'>404</div>
          </div>
          <div className='relative z-10'>
            <h1 className='text-6xl sm:text-7xl font-bold mb-4 text-primary'>
              Oops!
            </h1>
            <h2 className='text-3xl sm:text-4xl font-semibold mb-4 text-foreground'>
              Page Not Found
            </h2>
            <p className='text-lg sm:text-xl mb-8 text-muted-foreground max-w-md mx-auto'>
              It seems you&apos;ve ventured into uncharted territory. Let&apos;s
              get you back on track!
            </p>
            <Button
              asChild
              className='group'
            >
              <Link href='/'>
                <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
                Go Back
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
