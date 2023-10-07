import { createContext, useState, useContext } from 'react';

export const Context = createContext();

export function ModalProvider({ children }) {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isRegistrModalOpen, setRegistrModalOpen] = useState(false);


  const handleCloseModal = () => {
    setRegistrModalOpen(false);
    setLoginModalOpen(false);
  };

  return (
    <>
      <Context.Provider
        value={{
          isLoginModalOpen,
          isRegistrModalOpen,
          setLoginModalOpen,
          setRegistrModalOpen,
          handleCloseModal,
        }}
      >
        {children}
      </Context.Provider>
    </>
  );
}

export function useModalContext() {
  const value = useContext(Context);

  if (value == null) {
    throw new Error('useModalContext must be used within a Context.Provider');
  }

  return value;
}
