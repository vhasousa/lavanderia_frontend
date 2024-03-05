import { ServiceProvider } from '@/context/ServiceContext';
import '../styles/global.css'; // Import global CSS
import type { AppProps } from 'next/app';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider>
      <ToastContainer />
      <Component {...pageProps} />
    </ServiceProvider>
  );
}

export default MyApp;
