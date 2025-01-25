'use client';

import Link from 'next/link';
import { Sparkles } from 'lucide-react';
import { Authenticated, Unauthenticated } from 'convex/react';
import type { ReactElement } from 'react';

import Hint from '../ui/hint';
import { SidebarTrigger } from '../ui/sidebar';

type HeaderProps = {
  content?: ReactElement;
};

const Header = ({ content }: HeaderProps) => {
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

        <Unauthenticated>
          <Link
            href='/'
            className='flex items-center gap-1.5 font-semibold'
          >
            <Sparkles
              className='size-4'
              fill='white'
            />
            Sparkify UI
          </Link>
        </Unauthenticated>
      </div>

      {content}
    </nav>
  );
};

export default Header;
