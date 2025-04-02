'use client';

import { AuthContext } from "@/context/AuthContext";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { dispatch } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Erro ao fazer login");
        return;
      }

      // Sucesso: simula usuário autenticado
      const user = {
        id: "0", 
        name: data.username,
        avatar: "/assets/icon1.png", 
        password: "", 
      };

      dispatch({ type: "LOGIN", payload: user });
      router.push("/chatPage");
    } catch (err) {
      console.error(err);
      setError("Erro na requisição. Verifique o servidor.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-purple-700">
      <div className="bg-white p-8 rounded-xl w-[350px] flex flex-col items-center shadow-md">
        <img src="/assets/astronauts.png" alt="astronauts" className="w-24 mb-4" />
        <h1 className="text-2xl font-bold text-purple-700 mb-2">L.L.A. App</h1>
        <p className="mb-6 text-center font-bold text-[#2F0D5B]">Por favor, entre com seu email e senha</p>

        <input
          type="email"
          placeholder="Email"
          className="text-[#2F0D5B] border border-purple-700 rounded-full px-10 py-2 m-2 w-full placeholder:text-purple-400 placeholder:text-sm outline-purple-700"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="text-[#2F0D5B] border border-purple-700 rounded-full px-10 py-2 m-2 w-full placeholder:text-purple-400 placeholder:text-sm outline-purple-700"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          onClick={handleLogin}
          className="bg-purple-700 text-white py-2 px-6 m-2 rounded-full hover:bg-purple-800 w-[150px]"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
