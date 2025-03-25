"use client";

import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import LoginForm from '../components/Login/LoginForm';
import ChatPage from '../components/Chat/ChatPage';
import { useRouter } from 'next/navigation';


const AuthPage = () => {
  const { state } = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      router.push("/chatPage");
    }
  }, [state.user]);

  return (
    <div className="min-h-screen w-full bg-purple-700">
     <LoginForm /> 
    </div>
  );
};

export default AuthPage;