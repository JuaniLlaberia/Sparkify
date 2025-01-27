import { type ComponentType, type ReactElement, useState } from 'react';
import { Coins, Palette, Settings, User } from 'lucide-react';

import GeneralContent from './general-content';
import AccountContent from './account-content';
import TokensContent from './tokens-content';
import AppearanceContent from './appearance-content';
import { Dialog, DialogContent, DialogTrigger } from '../../ui/dialog';
import { Button, buttonVariants } from '../../ui/button';
import { cn } from '@/lib/utils';

const SETTINGS_LINKS = [
  {
    title: 'General',
    key: 'general',
    icon: (
      <Settings
        className='size-4'
        strokeWidth={2}
      />
    ),
  },
  {
    title: 'Account',
    key: 'account',
    icon: (
      <User
        className='size-4'
        strokeWidth={2}
      />
    ),
  },
  {
    title: 'Tokens',
    key: 'tokens',
    icon: (
      <Coins
        className='size-4'
        strokeWidth={2}
      />
    ),
  },
  {
    title: 'Appearance',
    key: 'appearance',
    icon: (
      <Palette
        className='size-4'
        strokeWidth={2}
      />
    ),
  },
] as const;

type ContentProps = {
  setIsOpen: (open: boolean) => void;
  onSuccess?: () => void;
};

const SETTINGS_CONTENTS: Record<string, ComponentType<ContentProps>> = {
  general: GeneralContent,
  account: AccountContent,
  tokens: TokensContent,
  appearance: AppearanceContent,
};

type SettingsDialogProps = {
  trigger?: ReactElement;
  onSuccess?: () => void;
};

const SettingsDialog = ({ trigger, onSuccess }: SettingsDialogProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [activeContent, setActiveContent] =
    useState<keyof typeof SETTINGS_CONTENTS>('general');
  const CurrentContent = SETTINGS_CONTENTS[activeContent];

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open && onSuccess) {
      onSuccess();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOpenChange}
    >
      <DialogTrigger asChild>
        {trigger || (
          <Button size='sm'>
            <Settings className='size-4 mr-1.5' />
            Settings
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className='gap-0 p-0 grid grid-cols-3 max-w-xl overflow-hidden'>
        <aside className='col-span-1 p-4 bg-background'>
          <ul className='w-full space-y-1'>
            {SETTINGS_LINKS.map(link => (
              <li
                key={link.key}
                onClick={() => setActiveContent(link.key)}
                className={cn(
                  buttonVariants({ variant: 'ghost' }),
                  'w-full justify-start cursor-pointer',
                  activeContent === link.key
                    ? 'bg-accent/75 hover:text-accent-foreground'
                    : ''
                )}
              >
                {link.icon}
                {link.title}
              </li>
            ))}
          </ul>
        </aside>
        <div className='col-span-2 p-6 bg-muted/60 border-l border-border min-h-72'>
          <CurrentContent
            setIsOpen={setIsOpen}
            onSuccess={onSuccess}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
