'use client';

import { useState } from 'react';
import NewGroupModal from './NewGroupModal';

export default function NewGroupButton() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}
        className='bg-purple-700 text-white rounded-md p-3 cursor-pointer hover:bg-purple-500'>
        + Novo Grupo
      </button>

      {showModal && <NewGroupModal onClose={() => setShowModal(false)} />}
    </>
  );
}
