'use client';

import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';
import { useState } from 'react';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DEFAULT_FILES, DEPENDENCIES } from '@/lib/consts';

const CodeView = () => {
  const [activeView, setActiveView] = useState<'editor' | 'preview'>('editor');
  const [files, setFiles] = useState<{ [filePath: string]: { code: string } }>(
    DEFAULT_FILES
  );

  return (
    <section className='col-span-full md:col-span-4 lg:col-span-5'>
      <div className='bg-[#101010] border border-b-0 border-border rounded-t-lg p-2  max-h-[6vh]'>
        <Tabs
          defaultValue={activeView}
          className='w-[200px]'
          onValueChange={val => setActiveView(val as 'editor' | 'preview')}
        >
          <TabsList className='grid w-full grid-cols-2 bg-muted/25'>
            <TabsTrigger value='editor'>Code</TabsTrigger>
            <TabsTrigger value='preview'>Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <SandpackProvider
        template='react'
        theme='dark'
        files={files}
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
            <SandpackPreview
              showNavigator
              style={{
                height: '83vh',
                backgroundColor: '#101010',
              }}
            />
          )}
        </SandpackLayout>
      </SandpackProvider>
    </section>
  );
};

export default CodeView;
