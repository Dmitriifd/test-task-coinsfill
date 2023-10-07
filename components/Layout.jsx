import React from 'react';
import Header from './Header';
import { Montserrat } from 'next/font/google';
import Footer from './Footer';
import { useModalContext } from '@/context/modal';
import Modal from './Modal';
import LoginForm from './LoginForm';
import RegistrForm from './RegistrForm';

const mont = Montserrat({ subsets: ['latin'], display: 'swap' });

export default function Layout({ children }) {
  const { isLoginModalOpen, isRegistrModalOpen, handleCloseModal } =
    useModalContext();

  return (
    <div className={mont.className}>
      <Header />
      <main>{children}</main>
      <Footer />

      <Modal open={isLoginModalOpen} onClose={handleCloseModal}>
        <LoginForm />
      </Modal>

      <Modal open={isRegistrModalOpen} onClose={handleCloseModal}>
        <RegistrForm />
      </Modal>
    </div>
  );
}
