'use client';

import { createContext, useEffect, useReducer } from "react";

export type User = {
    id: string;
    name: string;
    avatar: string;
    password: string;
};

type AuthState = {
    user: User | null;
}

type AuthAction = 
    | {type: 'LOGIN'; payload: User} 
    | {type: 'LOGOUT'};

const initialState: AuthState = {user: null};

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
}>({state: initialState, dispatch: () => null})


export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(authReducer, { user: null });
  
    // Carrega do localStorage ao iniciar
    useEffect(() => {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        dispatch({ type: 'LOGIN', payload: parsedUser });
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
  