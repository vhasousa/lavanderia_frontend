import { ServiceProvider } from '@/context/ServiceContext';
import { ThemeProvider } from 'styled-components'
import '../styles/global.css'; // Import global CSS
import type { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { defaultTheme } from '../styles/themes/default'
import { AuthProvider } from '@/context/AuthContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthProvider>
        <ServiceProvider>
          <ToastContainer />
          <Component {...pageProps} />
        </ServiceProvider>
      </AuthProvider>
    </ThemeProvider>

  );
}

export default MyApp;
