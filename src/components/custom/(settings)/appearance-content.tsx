'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { DialogTitle } from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const AppearanceContent = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div className='flex flex-col h-full space-y-2.5'>
      <DialogTitle>Appearance</DialogTitle>
      <div className='flex items-center justify-between'>
        <p className='text-sm'>Interface theme</p>
        <Select
          value={theme}
          onValueChange={val => setTheme(val)}
        >
          <SelectTrigger className='w-[180px] bg-background'>
            <SelectValue placeholder='Theme' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='light'>
              <span className='flex items-center'>
                <Sun className='size-4 mr-2 text-muted-foreground' />
                Light
              </span>
            </SelectItem>
            <SelectItem value='dark'>
              <span className='flex items-center'>
                <Moon className='size-4 mr-2 text-muted-foreground' />
                Dark
              </span>
            </SelectItem>
            <SelectItem value='system'>
              <span className='flex items-center'>
                <Monitor className='size-4 mr-2 text-muted-foreground' />
                System
              </span>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default AppearanceContent;
