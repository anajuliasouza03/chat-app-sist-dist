'use client';

import { AuthContext } from "@/context/AuthContext";
import { useContext } from "react";

export default function ChatPage() {
    const { dispatch } = useContext(AuthContext);

    const handleOut = () => {
      dispatch({ type: 'LOGOUT'});
    }

  return (
    <div className="text-black h-screen w-screen flex flex-col justify-center items-center bg-purple-100">
      <h2 className="text-2xl">Você está logado!</h2>
      <button
          onClick={handleOut}
          className="bg-purple-700 text-white py-2 px-6 m-2 rounded-full hover:bg-purple-800 w-[150px]"
      >Sair</button>
    </div>
  );
}
