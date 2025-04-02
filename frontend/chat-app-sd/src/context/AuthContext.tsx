'use client';

import { createContext, useEffect, useReducer } from "react";

export type User = {
  id: number;               // era string, agora número (consistente com backend)
  name: string;
  email?: string;           // opcional, caso use no login
  avatar?: string;          // opcional
  password?: string;        // opcional (em produção, evite armazenar isso)
};

type AuthState = {
  user: User | null;
};

type AuthAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' };

const initialState: AuthState = { user: null };

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN':
      return { user: action.payload };
    case 'LOGOUT':
      return { user: null };
    default:
      return state;
  }
}

export const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
}>({ state: initialState, dispatch: () => null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Carrega do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN', payload: parsedUser });
      } catch (e) {
        console.error("❌ Erro ao parsear usuário do localStorage:", e);
      }
    }
  }, []);

  // Salva no localStorage sempre que o user mudar
  useEffect(() => {
    if (state.user) {
      localStorage.setItem('user', JSON.stringify(state.user));
    } else {
      localStorage.removeItem('user');
    }
  }, [state.user]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
