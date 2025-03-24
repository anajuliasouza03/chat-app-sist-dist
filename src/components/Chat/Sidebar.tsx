'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext } from 'react';
import Image from 'next/image';
import { useView } from '@/context/ViewContext';

export default function Sidebar() {
  const { dispatch, state } = useContext(AuthContext);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  const { setView } = useView();

const handleChats = () => {
  setView('chats');
};

const handleContacts = () => {
  setView('contacts');
};

  return (
    <div className="bg-purple-700 text-white w-[100px] flex flex-col items-center justify-between py-4 h-screen">

      <div>
        {state.user?.avatar && (
          <Image
            src={state.user.avatar}
            alt={state.user.name}
            width={48}
            height={48}
            className="rounded-full border-2 border-white"
          />
        )}
        
        
      </div>

      <div className="w-full flex flex-col gap-2">
        <button onClick={handleChats} className=" font-bold  h-12 hover:border-r-4 border-amber-300 hover:bg-[#612DD1]">Chats</button>
        <button onClick={handleContacts} className="font-bold h-12 hover:border-r-4 border-amber-300 hover:bg-[#612DD1]">Contatos</button>
      </div>

      <button
        onClick={handleLogout}
        className="font-bold text-white hover:underline"
      >
        Sair
      </button>
    </div>
  );
}