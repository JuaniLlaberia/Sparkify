'use client';

import {
  createContext,
  useState,
  useContext,
  type ReactElement,
  type Dispatch,
  type SetStateAction,
} from 'react';

type SandpackActionType = {
  actionType: 'deploy' | 'export';
  timeStamp: number;
};

type SandpackActionContextType = {
  action: SandpackActionType | undefined;
  setAction: Dispatch<SetStateAction<SandpackActionType | undefined>>;
};

const SandpackActionContext = createContext<
  SandpackActionContextType | undefined
>(undefined);

const SandpackActionProvider = ({ children }: { children: ReactElement }) => {
  const [action, setAction] = useState<SandpackActionType>();

  return (
    <SandpackActionContext value={{ action, setAction }}>
      {children}
    </SandpackActionContext>
  );
};

const useSandpackActions = () => {
  const context = useContext(SandpackActionContext);
  if (!context)
    throw new Error(
      'Actions context must be use within a SandpackActionProvider'
    );

  return context;
};

export { useSandpackActions, SandpackActionProvider };
