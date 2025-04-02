'use client'

import { ChatContext  } from "@/context/ChatContext";
import { ChatContactsContext  } from "@/context/ChatContactsContext";
import { useContext, useState } from "react";
import Image from 'next/image';
import { useActiveChatType } from "@/context/ActiveChatTypeContext";

export default function ChatList() {

    const {state, dispatch} = useContext(ChatContext);
    const {chats, activeChatId} = state;

    const {state:stateChatsContacts, dispatch:dispatchChatsContext} = useContext(ChatContactsContext);
    const {chats:chatsChatsContacts, activeChatId:activeChatIDChatsContacts} = stateChatsContacts;

    const { setType } = useActiveChatType();

    const handleSelectedChat = (chatId: string) => {
        dispatch({type: 'SET_ACTIVE_CHAT', payload: chatId});
        setType('group');
        console.log('selecionou grupo', chatId);
    };

    const handleSelectedChatContext = (chatId: string) => {
        dispatchChatsContext({type: 'SET_ACTIVE_CHAT', payload: chatId});
        setType('contact');
    };

    const handleEditChat = (chatId: string) => {
        const newName = prompt("Digite o novo nome do grupo:");
        if (newName?.trim()) {
          dispatch({ type: "EDIT_CHAT_NAME", payload: { chatId, newName } });
        }
    };
      
    const handleDeleteChat = (chatId: string) => {
        if (confirm("Tem certeza que deseja excluir este grupo?")) {
          dispatch({ type: "DELETE_CHAT", payload: chatId });
        }
    };

    const handleDeleteChatContext = (chatId: string) => {
        if (confirm("Tem certeza que deseja excluir esta conversa?")) {
          dispatchChatsContext({ type: "DELETE_CHAT", payload: chatId });
        }
    };
      
      

    return (
        <div className="flex flex-col gap-3">
            <h1 className="font-bold text-[#2F0D5B]">Grupos</h1>

            {chats.map((chat) => (
            <div
                key={chat.id}
                className={`flex items-center justify-between gap-3 p-2 rounded-lg text-left hover:bg-purple-100 transition-all ${
                activeChatId === chat.id ? "bg-purple-100" : "bg-white"
                }`}
            >
                <button
                onClick={() => handleSelectedChat(chat.id)}
                className="flex items-center gap-3 flex-1 text-left"
                >
                <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#2F0D5B]">
                    {chat.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[200px]">
                    {chat.messages[chat.messages.length - 1]?.content}
                    </span>
                </div>
                </button>

                <div className="flex gap-3">
                <button
                    onClick={() => handleEditChat(chat.id)}
                    className="text-purple-700 text-sm hover:underline"
                    title="Editar nome"
                >
                    editar
                </button>
                <button
                    onClick={() => handleDeleteChat(chat.id)}
                    className="text-red-600 text-sm hover:underline"
                    title="Excluir grupo"
                >
                    excluir
                </button>
                </div>
            </div>
            ))}


            <h1 className="font-bold text-[#2F0D5B]">Conversas</h1>

            {chatsChatsContacts.map((chat) => (
            <div
                key={chat.id}
                className={`flex items-center justify-between gap-3 p-2 rounded-lg text-left hover:bg-purple-100 transition-all ${
                activeChatIDChatsContacts === chat.id ? "bg-purple-100" : "bg-white"
                }`}
            >
                <button
                onClick={() => handleSelectedChatContext(chat.id)}
                className="flex items-center gap-3 flex-1 text-left"
                >
                <Image
                    src={chat.avatar}
                    alt={chat.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <span className="text-sm font-semibold text-[#2F0D5B]">
                    {chat.name}
                    </span>
                    <span className="text-xs text-gray-500 truncate max-w-[200px]">
                    {chat.messages[chat.messages.length - 1]?.content}
                    </span>
                </div>
                </button>

                <button
                onClick={() => handleDeleteChatContext(chat.id)}
                className="text-red-600 text-sm hover:underline"
                title="Excluir conversa"
                >
                excluir
                </button>
            </div>
            ))}

            

        </div>
    )

}