'use client'

import { chats as fakeChatsContacts } from '@/services/fakeChatsContacts';
import { createContext, ReactNode, useReducer } from 'react';

export type Message = {
    id: string;
    sender: string;
    content: string;
    timestamp: string;

};

export type Chat = {
    id: string;
    name: string;
    avatar: string;
    messages: Message[];
    participants?: string[];

};

type ChatState = {
    chats: Chat[];
    activeChatId: string | null;
};

type ChatAction = 
    | {type: 'SET_ACTIVE_CHAT'; payload: string}
    | {type: 'SEND_MESSAGE'; payload: {chatId: string; message: Message}}
    | { type: 'CREATE_CHAT'; payload: Chat };

const initialStateContacts: ChatState = {
    chats: fakeChatsContacts,
    activeChatId: fakeChatsContacts[0]?.id || null,
};

function chatReducer(state: ChatState, action: ChatAction): ChatState {
    switch (action.type) {
      case 'SET_ACTIVE_CHAT':
        return { ...state, activeChatId: action.payload };
  
      case 'SEND_MESSAGE':
        const updatedChats = state.chats.map((chat) => {
          if (chat.id === action.payload.chatId) {
            return {
              ...chat,
              messages: [...chat.messages, action.payload.message],
            };
          }
          return chat;
        });
        return { ...state, chats: updatedChats };
  
      case 'CREATE_CHAT': // 👈 Adicione isto
        return {
          ...state,
          chats: [...state.chats, action.payload],
          activeChatId: action.payload.id,
        };
  
      default:
        return state;
    }
  }
  


export const ChatContactsContext = createContext<{
    state: ChatState;
    dispatch: React.Dispatch<ChatAction>;
}>({state: initialStateContacts, dispatch: () => null});


export const ChatContactsProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(chatReducer, initialStateContacts);

    return (
        <ChatContactsContext.Provider value={{state, dispatch}}>
            {children}
        </ChatContactsContext.Provider>
    );
};
