'use client';

import { useState } from 'react';
import NewChatModal from './NewChatModal';

export default function NewChatButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className='bg-purple-700 text-white rounded-md p-3 cursor-pointer hover:bg-purple-500'>
        + Novo Chat
      </button>

      {showModal && <NewChatModal onClose={() => setShowModal(false)} />}
    </>
  );
}
