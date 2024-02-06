import { ServiceProvider } from '@/context/ServiceContext';
import '../styles/global.css'; // Import global CSS
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ServiceProvider>
      <Component {...pageProps} />
    </ServiceProvider>
  );
}

export default MyApp;
