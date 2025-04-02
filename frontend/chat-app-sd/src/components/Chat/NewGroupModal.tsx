'use client';

import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import { ChatContext } from '@/context/ChatContext';
import { useActiveChatType } from '@/context/ActiveChatTypeContext';
import { useView } from '@/context/ViewContext';
import { contacts } from '@/services/fakeContacts';

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

  const handleCreateGroup = async () => {
    if (!groupName.trim() || selectedContacts.length === 0 || !authState.user) return;

    const participantes = [
      { id: Number(authState.user.id), name: authState.user.name },
      ...contacts
        .filter((contact) => selectedContacts.includes(contact.id))
        .map((c) => ({ id: Number(c.id), name: c.name }))
    ];

    const payload = {
      participants: participantes,
      messages: []
    };

    try {
      console.log("📦 Enviando payload:", payload);

      const res = await fetch('http://localhost:3001/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro na resposta: ${res.status} - ${text}`);
      }

      const newGroup = await res.json();
      newGroup.name = groupName;
      newGroup.avatar = '/assets/icon1.png';

      dispatch({ type: 'CREATE_CHAT', payload: newGroup });
      dispatch({ type: 'SET_ACTIVE_CHAT', payload: newGroup.id });
      setType('group');
      setView('chats');
      onClose();
    } catch (err) {
      console.error('❌ Erro ao criar grupo:', err);
      alert('Erro ao criar grupo. Verifique o console.');
    }
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
