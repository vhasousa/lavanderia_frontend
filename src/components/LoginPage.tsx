import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { JwtPayload, jwtDecode } from "jwt-decode";
import styles from './LoginPage.module.css';
import { AuthContext } from '@/context/AuthContext';

const NEXT_PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
const NEXT_PUBLIC_APP_PORT = process.env.NEXT_PUBLIC_APP_PORT;

interface CustomJwtPayload extends JwtPayload {
  id: string;
  role: string;
}

const LoginPage = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setAuthInfo } = useContext(AuthContext);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseUrl = `${NEXT_PUBLIC_APP_URL}${NEXT_PUBLIC_APP_PORT ? `:${NEXT_PUBLIC_APP_PORT}` : ''}`;

    try {
      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include', // Include cookies to ensure the HTTP-Only cookie is sent
      });

      if (!response.ok) {
        toast.error('Login failed');
        return;
      }

      const userDetailsResponse = await fetch(`${baseUrl}/api/auth/status`, {
        credentials: 'include', // Include cookies to ensure the HTTP-Only cookie is sent
      });

      if (!userDetailsResponse.ok) {
        throw new Error('Failed to fetch user details');
      }

      
      const { userID, role } = await userDetailsResponse.json();

      setAuthInfo({ role, userID, username });

      role === 'Admin' ? router.push('/servicos') : router.push('/cliente/servicos');
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred while trying to log in.');
    }
  };


  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginForm}>
        <h1>Acessar a plataforma</h1>
        <form onSubmit={handleLogin}>
          <div className={styles.formField}>
            <label htmlFor="username">Usuário</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={styles.input}
            />
          </div>
          <div className={styles.formField}>
            <label htmlFor="password">Senha</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
            />
          </div>
          <button type="submit" className={styles.loginButton}>ENTRAR</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
