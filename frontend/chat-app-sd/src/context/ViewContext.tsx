'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type ViewType = 'chats' | 'contacts';

type ViewContextType = {
  view: ViewType;
  setView: (view: ViewType) => void;
};

export const ViewContext = createContext<ViewContextType>({
  view: 'chats',
  setView: () => {},
});

export const useView = () => useContext(ViewContext);

export const ViewProvider = ({ children }: { children: ReactNode }) => {
  const [view, setView] = useState<ViewType>('chats');

  return (
    <ViewContext.Provider value={{ view, setView }}>
      {children}
    </ViewContext.Provider>
  );
};
