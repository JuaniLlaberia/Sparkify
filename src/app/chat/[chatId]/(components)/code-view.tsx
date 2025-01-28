'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import { useEffect, useState } from 'react';
import { Loader } from 'lucide-react';
import { useQuery } from 'convex/react';

import CodePreview from './code-preview';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_FILES, DEPENDENCIES } from '@/lib/consts';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { useLoaders } from '@/context/loaders-context';
import { useSandpackActions } from '@/context/sandpack-action-context';

type CodeViewProps = {
  chatId: Id<'chats'>;
};

const CodeView = ({ chatId }: CodeViewProps) => {
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const { isLoadingCode } = useLoaders();
  const { action } = useSandpackActions();

  const chat = useQuery(api.chats.getChat, { chatId });
  const mergedFiles = { ...DEFAULT_FILES, ...chat?.fileData };

  useEffect(() => {
    if (isLoadingCode) setActiveView('editor');
  }, [isLoadingCode]);

  useEffect(() => {
    if (action === undefined) return;

    setActiveView('preview');
  }, [action]);

  return (
    <section className='relative col-span-full md:col-span-4 lg:col-span-5'>
      <div className='bg-[#101010] border border-b-0 border-border rounded-t-lg p-2  max-h-[6vh]'>
        <Tabs
          className='w-[200px]'
          onValueChange={val => setActiveView(val as 'editor' | 'preview')}
          value={activeView}
        >
          <TabsList className='grid w-full grid-cols-2 bg-muted/25'>
            <TabsTrigger value='editor'>Code</TabsTrigger>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <SandpackProvider
        theme='dark'
        files={mergedFiles}
        customSetup={{
          dependencies: {
            ...DEPENDENCIES,
          },
        }}
        options={{
          externalResources: ['https://cdn.tailwindcss.com'],
        }}
      >
        <SandpackLayout
          style={{
            borderBottomLeftRadius: '8px',
            borderBottomRightRadius: '8px',
          }}
        >
          {activeView === 'editor' ? (
            <>
              <SandpackFileExplorer
                style={{
                  height: '83vh',
                  backgroundColor: '#101010',
                }}
              />
              <SandpackCodeEditor
                style={{
                  height: '83vh',
                  backgroundColor: '#101010',
                }}
              />
            </>
          ) : (
            <CodePreview />
          )}
        </SandpackLayout>
      </SandpackProvider>
      {isLoadingCode && (
        <div className='w-full h-full absolute top-0 left-0 flex items-center justify-center rounded-lg bg-background/50 border border-border'>
          <div className='flex items-center gap-2 animate-pulse'>
            <Loader className='size-5 animate-spin ' />
            <p>Generating your code</p>
          </div>
        </div>
      )}
    </section>
  );
};

export default CodeView;
