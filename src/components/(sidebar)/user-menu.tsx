'use client';

import Link from 'next/link';
import { useAuthActions } from '@convex-dev/auth/react';
import { BookOpen, ChevronsUpDown, LogOut, Settings } from 'lucide-react';
import { useState } from 'react';
import { useQuery } from 'convex/react';

import SettignsDialog from '../custom/(settings)/settings-dialog';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { api } from '../../../convex/_generated/api';
import { Skeleton } from '../ui/skeleton';

export const UserMenu = () => {
  const user = useQuery(api.users.currentUser);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  const { isMobile } = useSidebar();
  const { signOut } = useAuthActions();

  if (!user)
    return (
      <SidebarMenuButton className='hover:bg-transparent p-0 group-data-[collapsible=icon]:!p-0'>
        <Skeleton className='size-8 shrink-0' />
        <Skeleton className='h-8 w-full' />
      </SidebarMenuButton>
    );

  const { fullName, image, email } = user;

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu
          open={isDropdownOpen}
          onOpenChange={setIsDropdownOpen}
        >
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <Avatar className='h-8 w-8 rounded-lg'>
                <AvatarImage
                  src={image}
                  alt={fullName}
                />
                <AvatarFallback className='rounded-lg'>
                  {fullName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className='grid flex-1 text-left text-sm leading-tight'>
                <span className='truncate font-semibold'>{fullName}</span>
                <span className='truncate text-xs text-muted-foreground'>
                  {email}
                </span>
              </div>
              <ChevronsUpDown className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
            side={isMobile ? 'bottom' : 'right'}
            align='end'
            sideOffset={4}
          >
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <Avatar className='h-8 w-8 rounded-lg'>
                  <AvatarImage
                    src={image}
                    alt={fullName}
                  />
                  <AvatarFallback className='rounded-lg'>
                    {fullName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className='grid flex-1 text-left text-sm leading-tight'>
                  <span className='truncate font-semibold'>{fullName}</span>
                  <span className='truncate text-xs text-muted-foreground'>
                    {email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href='/chat/library'>
                <BookOpen
                  className='size-4 mr-2'
                  strokeWidth={1.5}
                />
                Library
              </Link>
            </DropdownMenuItem>
            <SettignsDialog
              onSuccess={() => setIsDropdownOpen(false)}
              trigger={
                <DropdownMenuItem onSelect={e => e.preventDefault()}>
                  <Settings
                    className='size-4 mr-2'
                    strokeWidth={1.5}
                  />
                  Settings
                </DropdownMenuItem>
              }
            />
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOut
                className='size-4 mr-2'
                strokeWidth={1.5}
              />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};
