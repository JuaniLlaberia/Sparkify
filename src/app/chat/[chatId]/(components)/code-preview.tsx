'use client';

import {
  SandpackPreview,
  SandpackPreviewRef,
  useSandpack,
} from '@codesandbox/sandpack-react';
import { useEffect, useRef } from 'react';

import { useSandpackActions } from '@/context/sandpack-action-context';

const CodePreview = () => {
  const previewRef = useRef<SandpackPreviewRef>(null);
  const { sandpack } = useSandpack();
  const { action } = useSandpackActions();

  const handleGetSandpackClient = async () => {
    const client = previewRef.current?.getClient();

    if (client) {
      //@ts-expect-error Library doesn't support typescript properly
      const result = await client.getCodeSandboxURL();

      if (action?.actionType === 'deploy')
        window.open(`https://${result?.sandboxId}.csb.app/`);
      if (action?.actionType === 'export') window.open(result?.editorUrl);
    }
  };

  useEffect(() => {
    handleGetSandpackClient();
  }, [sandpack && action, handleGetSandpackClient]);

  return (
    <SandpackPreview
      ref={previewRef}
      showNavigator
      style={{
        height: '83vh',
        backgroundColor: '#101010',
      }}
    />
  );
};

export default CodePreview;
