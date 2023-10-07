import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Transfer = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return <div className='container pt-[56px] min-h-[500px]'>Transfer</div>;
};

export default Transfer;
