'use client';

import { useContext, useEffect, useMemo, useState } from "react";
import { ChatContext } from "@/context/ChatContext";
import { ChatContactsContext } from "@/context/ChatContactsContext";
import { useActiveChatType } from "@/context/ActiveChatTypeContext";
import { AuthContext } from "@/context/AuthContext";

export default function ChatWindow() {
  const { state: groupState, dispatch: dispatchGroup } = useContext(ChatContext);
  const { state: contactState, dispatch: dispatchContact } = useContext(ChatContactsContext);
  const { state: authState } = useContext(AuthContext);
  const { type } = useActiveChatType();

  const [message, setMessage] = useState('');
 

  const activeChat =
    type === 'group'
      ? groupState.chats.find(chat => chat.id === groupState.activeChatId)
      : type === 'contact'
        ? contactState.chats.find(chat => chat.id === contactState.activeChatId)
        : null;
  
  useEffect(() => {
    if (activeChat) {
      fetchMessages(); // Carrega as mensagens da conversa selecionada
    }
  }, [activeChat?.id, type]); 

  const fetchMessages = async () => {
    if (!activeChat) return;
    try {
      const url = `http://localhost:3001/api/messages?chatId=${activeChat.id}`;
      console.log("🌐 Buscando mensagens de:", url);

      const res = await fetch(url);

      if (!res.ok) {
        console.error(" Erro HTTP:", res.status, await res.text());
        return;
      }

      const data = await res.json();
      console.log(" Mensagens recebidas da API:", data);

      const formattedMessages = data.map((msg: any) => ({
        id: msg.id.toString(),
        sender: msg.userName,
        content: msg.content,
        timestamp: msg.timestamp,
      }));

      const action = {
        type: "SET_MESSAGES",
        payload: {
          chatId: activeChat.id,
          messages: formattedMessages,
        },
      } as const;

      type === 'group' ? dispatchGroup(action) : dispatchContact(action);
   

    } catch (err) {
      console.error(" Erro ao carregar mensagens:", err);
    }
  };

  
  const handleSend = async () => {
    if (!message.trim() || !authState.user || !activeChat) return;

    const payload = {
      userId: Number(authState.user.id),
      chatId: activeChat.id,
      content: message,
      userName: authState.user.name,
    };

    try {
      const response = await fetch("http://localhost:3001/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      console.log("Mensagem enviada:", result);

      const newMessage = {
        id: Date.now().toString(),
        sender: authState.user.name, //sender é o user logado
        content: message,
        timestamp: new Date().toISOString(),
      };

      const action = {
        type: "SEND_MESSAGE",
        payload: {
          chatId: activeChat.id,
          message: newMessage,
        },
      } as const;

      type === 'group' ? dispatchGroup(action) : dispatchContact(action);
      setMessage('');
    } catch (err) {
      console.error("Erro ao enviar:", err);
    }
  };

  if (!activeChat) {
    return (
      <div className="p-5 text-gray-500 flex justify-center h-screen items-center">
        Selecione um chat para começar
      </div>
    );
  }



  return (
    <div className="flex flex-col h-full">
      {/* Título do chat */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-bold mb-1 text-[#2F0D5B]">{activeChat.name}</h2>
        <p className="text-sm text-gray-500">
          {activeChat.participants?.map((p: any) => p.name || p).join(', ')}
        </p>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
      {activeChat.messages.map((msg) => {

       // Verifica se a mensagem é do usuário logado
       const isMineMessage = msg.sender && msg.sender.trim().toLowerCase() === authState.user?.name.trim().toLowerCase();
       console.log("authState.user?.name: ", authState.user?.name);
       console.log("msg.sender: ", msg.sender);
      
      return (
          <div key={msg.id} className={`flex ${isMineMessage ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[70%] p-2 rounded-lg text-sm ${
                isMineMessage ? 'bg-purple-200 text-right' : 'bg-yellow-100 text-left'
              }`}
            >
              {!isMineMessage && (
                <strong className="block text-xs text-[#2F0D5B] mb-1">{msg.sender}</strong>
              )}
              
              <span>{`${authState.user?.name ?? msg.sender}: ${msg.content}`}</span>
            </div>
          </div>
        );
      })}

      </div>

      {/* Campo de mensagem */}
      <div className="p-4 border-t border-gray-200 flex items-center gap-2 bg-white">
        <input
          type="text"
          placeholder="Digite sua mensagem..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-full bg-gray-100 text-sm outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm px-4 py-2 rounded-full"
        >
          Enviar
        </button>
      </div>
    </div>
  );
}
