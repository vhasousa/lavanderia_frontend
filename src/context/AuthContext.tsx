// AuthContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, AuthContextType } from '../@types/AuthContextTypes'; // Adjust the import path accordingly

const defaultContextData: AuthContextType = {
  isLoggedIn: false,
  userID: null,
  role: null,
  setAuthInfo: () => {},
  logout: () => {},
};

export const AuthContext = createContext<AuthContextType>(defaultContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false, userID: null, role: null });

  useEffect(() => {
    const storedAuthInfo = localStorage.getItem('authInfo');
    if (storedAuthInfo) {
      try {
        const { userID, role } = JSON.parse(storedAuthInfo);
        setAuthState({ isLoggedIn: true, userID, role });
      } catch (error) {
        console.error('Failed to parse stored authentication info', error);
      }
    }
  }, []);

  const setAuthInfo = ({ userID, role }: Omit<AuthState, 'isLoggedIn'>) => {
    setAuthState({ isLoggedIn: true, userID, role });
    localStorage.setItem('authInfo', JSON.stringify({ userID, role }));
  };

  const logout = () => {
    setAuthState({ isLoggedIn: false, userID: null, role: null });
    localStorage.removeItem('authInfo');
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
