'use client';

import { AuthContext } from '@/context/AuthContext';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { useView } from '@/context/ViewContext';
import { useRouter } from 'next/navigation';

export default function Sidebar() {

  const [activeSideBar, setActiveSidebar] = useState<"chats" | "contacts">("chats");
  const { dispatch, state } = useContext(AuthContext);
  const router = useRouter();

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.push('/');
  };

  const { setView } = useView();

  const handleChats = () => {
    setActiveSidebar('chats');
    setView('chats');
    
  };

  const handleContacts = () => {
    setActiveSidebar('contacts');
    setView('contacts')

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
        <button onClick={handleChats} className={ `${activeSideBar === 'chats' ? 'bg-[#612DD1] border-r-4' : 'bg-transparent' } font-bold  h-12 hover:border-r-4 border-amber-300 hover:bg-[#612DD1]`}>Chats</button>
        <button onClick={handleContacts} className={`${activeSideBar === 'contacts' ? 'bg-[#612DD1] border-r-4' : 'bg-transparent' } font-bold  h-12 hover:border-r-4 border-amber-300 hover:bg-[#612DD1]`}>Contatos</button>
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