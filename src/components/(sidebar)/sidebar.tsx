'use client';

import Link from 'next/link';
import { ComponentProps } from 'react';
import { Sparkles } from 'lucide-react';
import { Authenticated } from 'convex/react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarRail,
} from '@/components/ui/sidebar';
import { SidebarMain } from './sidebar-main';
import { ChatsList } from './chats-list';
import { UserMenu } from './user-menu';

export const AppSidebar = ({ ...props }: ComponentProps<typeof Sidebar>) => {
  return (
    <Authenticated>
      <Sidebar
        collapsible='icon'
        {...props}
      >
        <SidebarHeader>
          <SidebarMenuButton
            asChild
            className='flex items-center justify-center hover:bg-transparent'
          >
            <Link href='/'>
              <Sparkles
                className='size-4 shrink-0'
                fill='white'
              />
              <span className='text-base font-semibold group-data-[collapsible=icon]:hidden'>
                Sparkify UI
              </span>
            </Link>
          </SidebarMenuButton>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMain />
          <ChatsList />
        </SidebarContent>
        <SidebarFooter>
          <UserMenu />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Authenticated>
  );
};
