'use client';

import { useContext } from "react";
import { ChatContext } from "@/context/ChatContext";
import { ChatContactsContext } from "@/context/ChatContactsContext";
import { useActiveChatType } from "@/context/ActiveChatTypeContext";
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


export default function ChatWindow() {
  const { state: groupState } = useContext(ChatContext);
  const { state: contactState } = useContext(ChatContactsContext);

  const activeGroup = groupState.chats.find(chat => chat.id === groupState.activeChatId);
  const activeContact = contactState.chats.find(chat => chat.id === contactState.activeChatId);

  console.log("activeGroup:", groupState.activeChatId, activeGroup);
  console.log("activeContact:", contactState.activeChatId, activeContact);

  const { dispatch: dispatchGroup } = useContext(ChatContext);
  const { dispatch: dispatchContact } = useContext(ChatContactsContext);


  let activeChat = null;

  const { type } = useActiveChatType();

  if (type === 'group') {
    activeChat = activeGroup;
  } else if (type === 'contact') {
    activeChat = activeContact;
  }

  if (!activeChat) {
    return <div className="p-5 text-gray-500 flex justify-center h-screen items-center">Selecione um chat para começar</div>;
  }

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!message.trim() || !activeChat) return;
  
    const newMessage = {
      id: uuidv4(), // gera id único
      sender: 'Você',
      content: message,
      timestamp: new Date().toISOString(),
    };
  
    if (type === 'group') {
      dispatchGroup({
        type: 'SEND_MESSAGE',
        payload: { chatId: activeChat.id, message: newMessage },
      });
    } else if (type === 'contact') {
      dispatchContact({
        type: 'SEND_MESSAGE',
        payload: { chatId: activeChat.id, message: newMessage },
      });
    }
  
    setMessage('');
  };




  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-xl font-bold mb-2 text-[#2F0D5B]">{activeChat.name}</h2>
      <p className="text-sm font-bold mb-2 text-gray-500">{activeChat.participants?.join(', ')}</p>
      <div className="flex-1 overflow-y-auto space-y-2">
        {activeChat.messages.map((msg) => (

        <div
            key={msg.id}
            className={`flex ${msg.sender.toLowerCase() === 'você' ? 'justify-end' : 'justify-start'}`}
        >
            <div
                className={`max-w-[70%] p-2 rounded-lg text-sm ${
                    msg.sender.toLowerCase() === 'você'
                    ? 'bg-purple-200 text-right'
                    : 'bg-yellow-100 text-left'
                }`}
            >
                {msg.sender !== 'você' && (
                    <strong className="block text-xs text-[#2F0D5B] mb-1">{msg.sender}</strong>
                )}
                <span>{msg.content}</span>
            </div>
        </div>  
        ))}
      </div>

      <div className="flex items-center gap-2 p-2 bg-white border-t border-purple-400">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
        />
        <button onClick={handleSend} className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full">
          Enviar
        </button>
      </div>

    </div>
  );
}
