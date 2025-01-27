'use client';

import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactElement,
  useContext,
} from 'react';

type LoadersContextType = {
  isLoadingMessage: boolean;
  isLoadingCode: boolean;
  setIsLoadingMessage: Dispatch<SetStateAction<boolean>>;
  setIsLoadingCode: Dispatch<SetStateAction<boolean>>;
};

const LoadersContext = createContext<LoadersContextType | undefined>(undefined);

const LoadersProvider = ({ children }: { children: ReactElement }) => {
  const [isLoadingMessage, setIsLoadingMessage] = useState<boolean>(false);
  const [isLoadingCode, setIsLoadingCode] = useState<boolean>(false);

  return (
    <LoadersContext
      value={{
        isLoadingCode,
        isLoadingMessage,
        setIsLoadingCode,
        setIsLoadingMessage,
      }}
    >
      {children}
    </LoadersContext>
  );
};

const useLoaders = () => {
  const context = useContext(LoadersContext);
  if (!context)
    throw new Error('Loaders context must be use within a LoadersProvider');

  return context;
};

export { useLoaders, LoadersProvider };
