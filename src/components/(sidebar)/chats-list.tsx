'use client';

import Link from 'next/link';
import { useQuery } from 'convex/react';
import { usePathname } from 'next/navigation';
import { MessageSquare, MoreHorizontal } from 'lucide-react';

import ChatsActons from './chats-actions';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { api } from '../../../convex/_generated/api';
import { Skeleton } from '../ui/skeleton';

export const ChatsList = () => {
  const chats = useQuery(api.chats.getUserChats);
  const pathname = usePathname();

  return (
    <SidebarGroup className='group-data-[collapsible=icon]:hidden'>
      <SidebarGroupLabel>Recent Chats</SidebarGroupLabel>
      <SidebarMenu>
        {chats === undefined ? (
          <ul className='space-y-1.5'>
            <li>
              <Skeleton className='w-full h-6' />
            </li>
            <li>
              <Skeleton className='w-full h-6' />
            </li>
            <li>
              <Skeleton className='w-full h-6' />
            </li>
            <li>
              <Skeleton className='w-full h-6' />
            </li>
            <li>
              <Skeleton className='w-full h-6' />
            </li>
          </ul>
        ) : chats.length > 0 ? (
          chats.map(chat => (
            <SidebarMenuItem key={chat._id}>
              <SidebarMenuButton
                asChild
                isActive={pathname.includes(chat._id)}
              >
                <Link href={`/chat/${chat._id}`}>
                  <MessageSquare className='size-4 mr-1.5' />
                  {chat.prompt}
                </Link>
              </SidebarMenuButton>
              <ChatsActons chatData={chat} />
            </SidebarMenuItem>
          ))
        ) : (
          <p className='text-muted-foreground text-center text-sm py-4'>
            No chats
          </p>
        )}
        {(chats || []).length > 0 && (
          <SidebarMenuItem>
            <SidebarMenuButton
              className='text-sidebar-foreground/70'
              asChild
            >
              <Link href='/chat/library'>
                <MoreHorizontal className='text-sidebar-foreground/70' />
                <span>More</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
