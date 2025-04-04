'use client';

import { useContext } from 'react';
import { ChatContactsContext } from '@/context/ChatContactsContext';
import { AuthContext } from '@/context/AuthContext';
import { useActiveChatType } from '@/context/ActiveChatTypeContext';
import { useView } from '@/context/ViewContext';
import { contacts } from '@/services/fakeContacts';

type Props = {
  onClose: () => void;
};

export default function NewChatModal({ onClose }: Props) {
  const { state: authState } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContactsContext);
  const { setType } = useActiveChatType();
  const { setView } = useView();

  const user = authState.user;
  if (!user) return null;

  const availableContacts = contacts.filter(c => c.id !== Number(user.id));

  const handleCreateChat = async (contactId: number) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact || !user) return;
  
    const userId = Number(user.id);
    const contactIdNum = Number(contact.id);
  
    const payload = {
    //  name: contact.name,
      participants: [
        { id: userId, name: user.name },
        { id: contactIdNum, name: contact.name }
      ],
      messages: []
    };
  
    console.log(" Enviando payload:", JSON.stringify(payload, null, 2));
  
    try {
      const res = await fetch('http://localhost:3001/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
  
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro na resposta: ${res.status} - ${text}`);
      }
  
      const newChat = await res.json();
  
      newChat.name = newChat.name || 'Novo chat';
      newChat.avatar = contact.avatar || '/assets/icon1.png';
  
      dispatch({ type: 'CREATE_CHAT', payload: newChat });
      dispatch({ type: 'SET_ACTIVE_CHAT', payload: newChat.id });
      setType('contact');
      setView('chats');
      onClose();
    } catch (err) {
      console.error(' Erro ao criar novo chat:', err);
      alert('Erro ao criar chat. Verifique o console.');
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-[#2F0D5B]">Novo Chat</h2>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {availableContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleCreateChat(contact.id)}
              className="flex items-center gap-2 p-2 bg-purple-50 hover:bg-purple-100 rounded-lg text-left"
            >
              <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full" />
              <span>{contact.name}</span>
            </button>
          ))}
        </div>

        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
