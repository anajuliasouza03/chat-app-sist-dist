'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ChatContext } from '@/context/ChatContext';
import { useActiveChatType } from '@/context/ActiveChatTypeContext';
import { useView } from '@/context/ViewContext';
import { contacts } from '@/services/fakeContacts';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  onClose: () => void;
};

export default function NewGroupModal({ onClose }: Props) {
  const { state: authState } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const { setType } = useActiveChatType();
  const { setView } = useView();

  const [groupName, setGroupName] = useState('');
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);

  const handleToggleContact = (id: string) => {
    setSelectedContacts((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  
  const handleCreateGroup = () => {
    if (!groupName.trim() || selectedContacts.length === 0 || !authState.user) return;
 
    const selectedNames = contacts
      .filter((contact) => selectedContacts.includes(contact.id))
      .map((contact) => contact.name);
  
    const newGroup = {
      id: uuidv4(),
      name: groupName,
      avatar: '/assets/icon1.png',
      messages: [],
      participants: [authState.user.name, ...selectedNames], 
    };
  
    dispatch({ type: 'CREATE_CHAT', payload: newGroup });
    setType('group');
    setView('chats');
    console.log('Criando grupo:', newGroup);
    onClose();
  };
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-[400px] space-y-4 shadow-lg">
        <h2 className="text-xl font-bold text-[#2F0D5B]">Novo Grupo</h2>

        <input
          type="text"
          placeholder="Nome do grupo"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full p-2 border rounded"
        />

        <div className="max-h-60 overflow-y-auto space-y-2">
          {contacts.map((contact) => (
            <label key={contact.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedContacts.includes(contact.id)}
                onChange={() => handleToggleContact(contact.id)}
              />
              <img src={contact.avatar} alt={contact.name} className="w-8 h-8 rounded-full" />
              <span>{contact.name}</span>
            </label>
          ))}
        </div>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded bg-gray-300 text-sm">Cancelar</button>
          <button
            onClick={handleCreateGroup}
            className="px-4 py-2 rounded bg-purple-600 text-white text-sm hover:bg-purple-700"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
