'use client';

import { useContext, useState } from 'react';
import { ChatContactsContext } from '@/context/ChatContactsContext';
import { AuthContext } from '@/context/AuthContext';
import { useActiveChatType } from '@/context/ActiveChatTypeContext';
import { useView } from '@/context/ViewContext';
import { contacts } from '@/services/fakeContacts';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onClose: () => void;
};

export default function NewChatModal({ onClose }: Props) {
  const { state: authState } = useContext(AuthContext);
  const { state: contactsState, dispatch } = useContext(ChatContactsContext);
  const { setType } = useActiveChatType();
  const { setView } = useView();

  const user = authState.user;
  if (!user) return null;


  const existingContactIds = contactsState.chats
    .filter(chat => chat.participants?.includes(user.id))
    .flatMap(chat => chat.participants)
    .filter(id => id !== user.id);


  const availableContacts = contacts.filter(contact => !existingContactIds.includes(contact.id));

  const handleCreateChat = (contactId: string) => {
    const contact = contacts.find(c => c.id === contactId);
    if (!contact) return;

    const newChat = {
      id: uuidv4(),
      name: contact.name,
      avatar: contact.avatar,
      messages: [],
      participants: [user.id, contact.id],
    };

    dispatch({ type: 'CREATE_CHAT', payload: newChat });
    setType('contact');
    setView('chats');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-[#2F0D5B]">Novo Chat</h2>

        {availableContacts.length === 0 ? (
          <p className="text-gray-500 text-sm">Você já iniciou conversas com todos os contatos.</p>
        ) : (
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
        )}

        <div className="flex justify-end pt-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded text-sm">
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}
