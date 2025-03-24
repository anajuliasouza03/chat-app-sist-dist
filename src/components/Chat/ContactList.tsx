'use client';

import { contacts } from '@/services/fakeContacts';

export default function ContactList() {
  return (
    <div className="flex flex-col gap-2 p-3">
      <h1 className="font-bold text-[#2F0D5B]">Contatos</h1>
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="flex items-center gap-3 p-2 rounded-lg bg-white hover:bg-purple-100 transition-all"
        >
          <img
            src={contact.avatar}
            alt={contact.name}
            className="w-10 h-10 rounded-full"
          />
          <span className="text-sm font-semibold text-[#2F0D5B]">
            {contact.name}
          </span>
        </div>
      ))}
    </div>
  );
}