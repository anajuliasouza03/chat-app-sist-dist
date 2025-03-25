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
    | {type: 'SET_ACTIVE_CHAT'; payload: string}
    | {type: 'SEND_MESSAGE'; payload: {chatId: string; message: Message}};

const initialState: ChatState = {
    chats: fakeChats,
    activeChatId: fakeChats[0]?.id || null,
};

function chatReducer (state: ChatState, action: ChatAction): ChatState {
    switch(action.type){
        case 'SET_ACTIVE_CHAT':
            return {...state, activeChatId: action.payload};
        case 'SEND_MESSAGE':
            const updatedChats = state.chats.map(chat => {
                if(chat.id === action.payload.chatId){
                    return {
                        ...chat,
                        messages: [...chat.messages, action.payload.message],
                    };
                }
                return chat;
            });
            return {...state, chats:updatedChats};
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
