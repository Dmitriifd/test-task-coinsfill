import Layout from '@/components/Layout';
import { ModalProvider } from '@/context/modal';
import { AuthProvider } from '@/context/authContext';
import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <ModalProvider>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ModalProvider>
  );
}
