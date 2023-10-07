import { useModalContext } from '@/context/modal';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Login = () => {
  const { setLoginModalOpen, setRegistrModalOpen } = useModalContext();
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      router.push('/');
    }
  }, []);

  return (
    <div className='container pt-[56px] min-h-[500px]'>
      <h2 className='pt-[50px] mb-[80px] font-bold text-2xl'>
        Выберите действие
      </h2>
      <div className='flex flex-col gap-5'>
        <button
          className='bg-primaryBg rounded-full text-white text-sm font-bold py-5 shadow-loginBtn'
          onClick={() => setLoginModalOpen(true)}
        >
          Login
        </button>
        <button
          className='bg-secondaryBg rounded-full text-white text-sm font-bold py-5 '
          onClick={() => setRegistrModalOpen(true)}
        >
          Registration
        </button>
      </div>
    </div>
  );
};

export default Login;
