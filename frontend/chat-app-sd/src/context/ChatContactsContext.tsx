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
    | { type: 'CREATE_CHAT'; payload: Chat }
    | { type: 'DELETE_CHAT'; payload: string }
    | { type: 'SET_MESSAGES'; payload: { chatId: string; messages: Message[] } }
    | { type: 'SET_ALL_CHATS'; payload: Chat[] }



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
  
      case 'CREATE_CHAT': 
        return {
          ...state,
          chats: [...state.chats, action.payload],
          activeChatId: action.payload.id,
        };

      case 'DELETE_CHAT':
        return {
          ...state,
          chats: state.chats.filter((chat) => chat.id !== action.payload),
          activeChatId: state.activeChatId === action.payload ? null : state.activeChatId,
        };
      case 'SET_MESSAGES':
        return {
          ...state,
          chats: state.chats.map(chat =>
            chat.id === action.payload.chatId
              ? { ...chat, messages: action.payload.messages }
              : chat
          ),
        };
        case 'SET_ALL_CHATS':
          return {
            ...state,
            chats: action.payload,
            activeChatId: action.payload.length > 0 ? action.payload[0].id : null
            
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
