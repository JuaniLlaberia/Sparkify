'use client';

import Link from 'next/link';
import { BookOpen, HelpCircle, Plus } from 'lucide-react';

import Hint from '../ui/hint';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import FeedbackDialog from '../custom/feedback-dialog';

export const SidebarMain = () => {
  return (
    <SidebarGroup>
      <SidebarMenu className='space-y-1'>
        <SidebarMenuItem>
          <Hint
            label='New chat'
            side='right'
          >
            <SidebarMenuButton
              variant='outline'
              asChild
            >
              <Link href='/'>
                <Plus className='size-4 shrink-0' />
                <span className='group-data-[collapsible=icon]:hidden'>
                  New Chat
                </span>
              </Link>
            </SidebarMenuButton>
          </Hint>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Hint
            label='Library'
            side='right'
          >
            <SidebarMenuButton asChild>
              <Link href='/chat/library'>
                <BookOpen className='size-4 shrink-0' />
                <span className='group-data-[collapsible=icon]:hidden'>
                  Library
                </span>
              </Link>
            </SidebarMenuButton>
          </Hint>
        </SidebarMenuItem>
        <SidebarMenuItem>
          <Hint
            label='Feedback'
            side='right'
          >
            <FeedbackDialog
              trigger={
                <SidebarMenuButton>
                  <HelpCircle className='size-4 shrink-0' />
                  <span className='group-data-[collapsible=icon]:hidden'>
                    Feedback
                  </span>
                </SidebarMenuButton>
              }
            />
          </Hint>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  );
};
