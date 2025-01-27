'use client';

import { MoreHorizontal, PencilLine, Trash2 } from 'lucide-react';
import { useState } from 'react';

import DeleteChatDialog from '@/app/chat/[chatId]/(components)/delete-chat-dialog';
import EditChatDialog from '@/app/chat/[chatId]/(components)/edit-chat-dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenuAction, useSidebar } from '@/components/ui/sidebar';
import { Doc } from '../../../convex/_generated/dataModel';
import { Button } from '../ui/button';

type ChatsActionsProps = {
  chatData: Doc<'chats'>;
  showOnHover?: boolean;
};

const ChatsActions = ({ chatData, showOnHover = true }: ChatsActionsProps) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const { isMobile } = useSidebar();

  return (
    <DropdownMenu
      open={isDropdownOpen}
      onOpenChange={setIsDropdownOpen}
    >
      <DropdownMenuTrigger asChild>
        {showOnHover ? (
          <SidebarMenuAction showOnHover>
            <MoreHorizontal />
            <span className='sr-only'>More</span>
          </SidebarMenuAction>
        ) : (
          <Button
            size='icon-sm'
            variant='ghost'
          >
            <MoreHorizontal />
            <span className='sr-only'>More</span>
          </Button>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-48 rounded-lg'
        side={isMobile ? 'bottom' : 'right'}
        align={isMobile ? 'end' : 'start'}
      >
        <EditChatDialog
          chatId={chatData._id}
          defaultName={chatData.prompt || 'New Chat'}
          onSuccess={() => setIsDropdownOpen(false)}
          trigger={
            <DropdownMenuItem onSelect={e => e.preventDefault()}>
              <PencilLine className='text-muted-foreground' />
              <span>Rename</span>
            </DropdownMenuItem>
          }
        />
        <DeleteChatDialog
          chatId={chatData._id}
          onSuccess={() => setIsDropdownOpen(false)}
          trigger={
            <DropdownMenuItem
              className='text-red-400 focus:text-red-400 focus:bg-red-400/15'
              onSelect={e => e.preventDefault()}
            >
              <Trash2 className='text-red-400' />
              <span>Delete Chat</span>
            </DropdownMenuItem>
          }
        />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ChatsActions;
