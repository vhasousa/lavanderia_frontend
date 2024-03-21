import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { AuthState, AuthContextType } from '../@types/AuthContextTypes'; // Adjust the import path accordingly
import { useRouter } from 'next/router';

const defaultContextData: AuthContextType = {
  isLoggedIn: false,
  userID: null,
  username: null, // Added username to the context
  role: null,
  setAuthInfo: () => { },
  setRole: (role: string | null) => { },
  logout: () => { },
};

export const AuthContext = createContext<AuthContextType>(defaultContextData);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authState, setAuthState] = useState<AuthState>({ isLoggedIn: false, userID: null, username: null, role: null });
  const router = useRouter();

  const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
    ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
    : process.env.NEXT_PUBLIC_APP_URL;

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/auth/status`, {
          credentials: 'include', // Needed to include HTTP-only cookies with the request
        });
        if (response.ok) {
          const data = await response.json();
          setAuthState({
            isLoggedIn: data.isAuthenticated,
            userID: data.userID,
            username: data.username,
            role: data.role,
          });
        } else {
          throw new Error('Failed to fetch auth status');
        }
      } catch (error) {
        console.error('Error checking authentication status', error);
      }
    };

    checkAuthStatus();
  }, []);

  const setAuthInfo = ({ userID, username, role }: Omit<AuthState, 'isLoggedIn'>) => {
    setAuthState({ isLoggedIn: true, userID, username, role });
  };

  const setRole = (role: string | null) => {
    setAuthState((prevState) => ({ ...prevState, role }));
  };

  const logout = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include', // Needed to include HTTP-only cookies with the request
      });
      if (response.ok) {
        setAuthState({ isLoggedIn: false, userID: null, username: null, role: null });
        router.push('/');
      } else {
        throw new Error('Failed to logout');
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };

  return (
    <AuthContext.Provider value={{ ...authState, setAuthInfo, logout, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};
