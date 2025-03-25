'use client';

import { AuthContext } from "@/context/AuthContext";
import { users } from "@/services/fakeUsers";
import { useContext, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
    const { dispatch } = useContext(AuthContext);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = () => {
        const foundUser = users.find(
            (user) => user.name === username && user.password === password
        );
        if (foundUser) {
            dispatch({ type: 'LOGIN', payload: foundUser });
            router.push("/chatPage");
        } else {
            setError('Usuário ou senha inválidos');
        }
    }

    return(
        <div className="min-h-screen w-full flex items-center justify-center bg-purple-700">
            <div className="bg-white p-8 rounded-xl w-[350px] flex flex-col items-center shadow-md">
            <img src="/assets/astronauts.png" alt="astronauts" className="w-24-mb-4"/>            
            <h1 className="text-2xl font-bold text-purple-700 mb-2">L.L.A. App</h1>
            <p className="mb-6 text-center font-bold text-[#2F0D5B]">Por favor, digite seu usuário e sua senha</p>
            <input type="text" 
                placeholder="Seu nome de usuário"
                className="text-[#2F0D5B] border border-purple-700 rounded-full  px-10 py-2 m-2 w-full placeholder:text-purple-400 placeholder:text-sm outline-purple-700"
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
            />
           
            <input type="password"
                placeholder="Digite sua senha"
                className=" text-[#2F0D5B] border border-purple-700 rounded-full  px-10 py-2 m-2 w-full placeholder:text-purple-400 placeholder:text-sm outline-purple-700"
                value={password}
                onChange={(e)=> setPassword(e.target.value)}


            />

            {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

            <button
                onClick={handleLogin}
                className="bg-purple-700 text-white py-2 px-6 m-2 rounded-full hover:bg-purple-800 w-[150px]"
            >Entrar</button>
        </div>
        </div>
        
    )
}