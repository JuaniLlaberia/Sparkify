'use client';

import {
  createContext,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactElement,
} from 'react';

type MessageType = { role: 'user' | 'model'; content: string };

type MessagesContextType = {
  messages: MessageType[];
  setMessages: Dispatch<SetStateAction<MessageType[] | []>>;
};

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

const MessagesProvider = ({ children }: { children: ReactElement }) => {
  const [messages, setMessages] = useState<MessageType[] | []>([]);

  return (
    <MessagesContext value={{ messages, setMessages }}>
      {children}
    </MessagesContext>
  );
};

export { MessagesContext, MessagesProvider };
