'use client'

import { ChatContext  } from "@/context/ChatContext";
import { ChatContactsContext  } from "@/context/ChatContactsContext";
import { useContext, useState } from "react";
import Image from 'next/image';

export default function ChatList() {

    const {state, dispatch} = useContext(ChatContext);
    const {chats, activeChatId} = state;

    const {state:stateChatsContacts, dispatch:dispatchChatsContext} = useContext(ChatContactsContext);
    const {chats:chatsChatsContacts, activeChatId:activeChatIDChatsContacts} = stateChatsContacts;

    const handleSelectedChat = (chatId: string) => {
        dispatch({type: 'SET_ACTIVE_CHAT', payload: chatId});
        console.log('selecionou grupo', chatId);
    };

    const handleSelectedChatContext = (chatId: string) => {
        dispatchChatsContext({type: 'SET_ACTIVE_CHAT', payload: chatId});
    };

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-[#2F0D5B]">Grupos</h1>

            {chats.map((chat) => (
            <button
                    key={chat.id}
                    onClick={() => handleSelectedChat(chat.id)}
                    className={`flex items-center gap-3 p-2 rounded-lg text-left hover:bg-purple-100 transition-all ${
                    activeChatId === chat.id ? 'bg-purple-100' : 'bg-white'
                    }`}
            >
                    <Image
                        src={chat.avatar}
                        alt={chat.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#2F0D5B]">{chat.name}</span>
                    <span className="text-xs text-gray-500 truncate max-w-[200px]">
                        {chat.messages[chat.messages.length - 1]?.content}
                    </span>
                    </div>
            </button>
            ))}
            <h1 className="font-bold text-[#2F0D5B]">Conversas</h1>

            {chatsChatsContacts.map((chat) => (
            <button
                    key={chat.id}
                    onClick={() => handleSelectedChatContext(chat.id)}
                    className={`flex items-center gap-3 p-2 rounded-lg text-left hover:bg-purple-100 transition-all ${
                    activeChatIDChatsContacts === chat.id ? 'bg-purple-100' : 'bg-white'
                    }`}
            >
                    <Image
                        src={chat.avatar}
                        alt={chat.name}
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                    <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#2F0D5B]">{chat.name}</span>
                    <span className="text-xs text-gray-500 truncate max-w-[200px]">
                        {chat.messages[chat.messages.length - 1]?.content}
                    </span>
                    </div>
            </button>
            ))}
            

        </div>
    )

}