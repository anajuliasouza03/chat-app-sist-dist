'use client'

import { useContext, useEffect, useState } from "react";
import Image from 'next/image';
import { Chat, ChatContext } from "@/context/ChatContext";
import { ChatContactsContext } from "@/context/ChatContactsContext";
import { useActiveChatType } from "@/context/ActiveChatTypeContext";
import { AuthContext } from "@/context/AuthContext";

export default function ChatList() {
  const { state: authState } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { dispatch: dispatchChatsContext } = useContext(ChatContactsContext);
  const { setType } = useActiveChatType();

  const [grupos, setGrupos] = useState<Chat[]>([]);
  const [conversas, setConversas] = useState<Chat[]>([]);

  // Função reutilizável para buscar os chats
  const fetchChats = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/chats");
      const data = await response.json();

      //console.log("Chats recebidos da API:", data);

      const userChats = data.filter((chat: any) =>
        chat.participants?.some((p: any) => p.name === authState.user?.name)
      );

      const grupos = userChats.filter((chat: any) => chat.participants?.length > 2);
      const conversas = userChats.filter((chat: any) => chat.participants?.length === 2);

      setGrupos(grupos);
      setConversas(conversas);

      dispatch({ type: "SET_ALL_CHATS", payload: grupos });
      dispatchChatsContext({ type: "SET_ALL_CHATS", payload: conversas });

    } catch (err) {
      console.error(" Erro ao buscar chats:", err);
    }
  };

  
  useEffect(() => {
    fetchChats(); 
  }, [grupos, conversas]);


  const handleSelectedChat = (chatId: string) => {
    dispatch({ type: 'SET_ACTIVE_CHAT', payload: chatId });
    setTimeout(() => setType('group'), 0);
   // fetchChats();
  };

  const handleSelectedChatContext = (chatId: string) => {
    dispatchChatsContext({ type: 'SET_ACTIVE_CHAT', payload: chatId });
    setTimeout(() => setType('contact'), 0);
    //fetchChats();
  };

  const handleDeleteChat = async (chatId: string) => {
    if (!confirm("Tem certeza que deseja excluir este grupo?")) return;
  
    try {
      const res = await fetch(`http://localhost:3001/api/chats/${chatId}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      console.log(" Grupo excluído com sucesso");
      //fetchChats(); // Atualiza os dados
    } catch (err) {
      console.error("Erro ao excluir grupo:", err);
    }
  };
  
  const handleDeleteChatContext = async (chatId: string) => {
    if (!confirm("Tem certeza que deseja excluir esta conversa?")) return;
  
    try {
      const res = await fetch(`http://localhost:3001/api/chats/${chatId}`, {
        method: 'DELETE',
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      console.log("Conversa excluída com sucesso");
     // fetchChats(); // Atualiza
    } catch (err) {
      console.error(" Erro ao excluir conversa:", err);
    }
  };
  

  const handleEditChat = async (chatId: string) => {
    const newName = prompt("Digite o novo nome do grupo:");
    if (!newName?.trim()) return;
  
    try {
      const res = await fetch(`http://localhost:3001/api/chats/${chatId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newName }),
      });
  
      if (!res.ok) throw new Error(await res.text());
  
      console.log(" Nome do grupo alterado com sucesso");
     // fetchChats(); // Atualiza os dados após sucesso
    } catch (err) {
      console.error("Erro ao editar nome do grupo:", err);
    }
  };
  

  return (
    <div className="flex flex-col gap-3">
      <h1 className="font-bold text-[#2F0D5B]">Grupos</h1>

      {grupos.map((chat) => (
        <div key={chat.id} className="flex items-center justify-between gap-3 p-2 rounded-lg text-left hover:bg-purple-100 transition-all">
          <button
            onClick={() => handleSelectedChat(chat.id)}
            className="flex items-center gap-3 flex-1 text-left"
          >
            <Image
              src={chat.avatar || "/assets/default-avatar.png"}
              alt={chat.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#2F0D5B]">{chat.name || "sem nome"}</span>
              <span className="text-xs text-gray-500 truncate max-w-[200px]">
                {chat.messages[chat.messages.length - 1]?.content}
              </span>
            </div>
          </button>

          <div className="flex gap-2">
            <button onClick={() => handleEditChat(chat.id)} className="text-purple-600 text-sm hover:underline" title="Editar grupo">editar</button>
            <button onClick={() => handleDeleteChat(chat.id)} className="text-red-600 text-sm hover:underline" title="Excluir grupo">excluir</button>
          </div>
        </div>
      ))}

      <h1 className="font-bold text-[#2F0D5B]">Conversas</h1>

      {conversas.map((chat) => (
        <div key={chat.id} className="flex items-center justify-between gap-3 p-2 rounded-lg text-left hover:bg-purple-100 transition-all">
          <button
            onClick={() => handleSelectedChatContext(chat.id)}
            className="flex items-center gap-3 flex-1 text-left"
          >
            <Image
              src={chat.avatar || "/assets/default-avatar.png"}
              alt={chat.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#2F0D5B]">{chat.name || "sem nome"}</span>
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
  );
}
