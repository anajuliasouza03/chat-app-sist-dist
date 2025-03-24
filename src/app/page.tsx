"use client";

import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/Login/LoginForm';
import ChatPage from '../components/Chat/ChatPage';


const Page = () => {
  const { state } = useContext(AuthContext);

  return (
    <div className="min-h-screen w-full bg-purple-700">
      {!state.user ? <LoginForm /> : <ChatPage />}
    </div>
  );
};

export default Page;