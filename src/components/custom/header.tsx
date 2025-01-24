'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Authenticated } from 'convex/react';
import { useAuthToken } from '@convex-dev/auth/react';
import type { ReactElement } from 'react';

import Hint from '../ui/hint';
import { SidebarTrigger } from '../ui/sidebar';
import { cn } from '@/lib/utils';

type HeaderProps = {
  content?: ReactElement;
};

const Header = ({ content }: HeaderProps) => {
  const authToken = useAuthToken();

  return (
    <nav className='flex items-center justify-between p-3.5'>
      <div className='flex items-center gap-5'>
        <Authenticated>
          <Hint
            label='Toggle sidebar'
            side='right'
          >
            <SidebarTrigger />
          </Hint>
        </Authenticated>

        <Link
          href='/'
          className={cn(
            'flex items-center gap-1.5 font-semibold',
            authToken ? 'md:hidden' : ''
          )}
        >
          <Sparkles
            className='size-4'
            fill='white'
          />
          Sparkify UI
        </Link>
      </div>

      {content}
    </nav>
  );
};

export default Header;
