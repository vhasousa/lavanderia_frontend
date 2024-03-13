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

    console.log(NEXT_PUBLIC_APP_URL)
    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_PORT
        ? `${process.env.NEXT_PUBLIC_APP_URL}:${process.env.NEXT_PUBLIC_APP_PORT}`
        : process.env.NEXT_PUBLIC_APP_URL;

      const response = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json(); // Parse JSON body

      if (!response.ok) {
        // Display a toast with the error message
        toast.error(data.details.message || 'Login failed', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const { token } = data;
      localStorage.setItem('token', token);
      const decodedToken: CustomJwtPayload = jwtDecode<CustomJwtPayload>(data.token);
      console.log(decodedToken)
      const { role, id } = decodedToken;

      setAuthInfo({ userID: id, role: role });

      if (role === 'Admin') {
        router.push('/servicos');
      } else if (role === 'Client') {
        router.push({
          pathname: '/cliente/servicos',
        });
      } else {
        toast.error('Unauthorized role');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('An error occurred while trying to log in.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
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
