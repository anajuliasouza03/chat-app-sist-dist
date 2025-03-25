'use client';

import { createContext, ReactNode, useContext, useState } from 'react';

type ChatType = 'group' | 'contact';

type ActiveChatTypeContextProps = {
  type: ChatType | null;
  setType: (type: ChatType | null) => void;
};

export const ActiveChatTypeContext = createContext<ActiveChatTypeContextProps>({
  type: null,
  setType: () => {},
});

export const ActiveChatTypeProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ChatType | null>(null);

  return (
    <ActiveChatTypeContext.Provider value={{ type, setType }}>
      {children}
    </ActiveChatTypeContext.Provider>
  );
};

export const useActiveChatType = () => useContext(ActiveChatTypeContext);
