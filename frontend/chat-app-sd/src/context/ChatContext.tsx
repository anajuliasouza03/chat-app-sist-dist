'use client'

import { chats as fakeChats } from '@/services/fakeGroups';
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
  | { type: 'SET_ACTIVE_CHAT'; payload: string }
  | { type: 'SEND_MESSAGE'; payload: { chatId: string; message: Message } }
  | { type: 'CREATE_CHAT'; payload: Chat }
  | { type: 'EDIT_CHAT_NAME'; payload: { chatId: string; newName: string } }
  | { type: 'DELETE_CHAT'; payload: string };


const initialState: ChatState = {
    chats: fakeChats,
    activeChatId: fakeChats[0]?.id || null,
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

      case 'EDIT_CHAT_NAME':
        return {
          ...state,
          chats: state.chats.map(chat =>
            chat.id === action.payload.chatId
              ? { ...chat, name: action.payload.newName }
              : chat
          ),
        };
      
      case 'DELETE_CHAT':
        return {
          ...state,
          chats: state.chats.filter(chat => chat.id !== action.payload),
          activeChatId: state.activeChatId === action.payload ? null : state.activeChatId,
        };
        
  
      default:
        return state;
    }
  }
  

export const ChatContext = createContext<{
    state: ChatState;
    dispatch: React.Dispatch<ChatAction>;
}>({state: initialState, dispatch: () => null});


export const ChatProvider = ({children}: {children: ReactNode}) => {
    const [state, dispatch] = useReducer(chatReducer, initialState);

    return (

            <ChatContext.Provider value={{state, dispatch}} >
                {children}
            </ChatContext.Provider>  

    )
}
