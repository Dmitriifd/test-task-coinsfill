import { useAuthContext } from '@/context/authContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const Fundraising = () => {
  const router = useRouter();
  const { user } = useAuthContext();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, []);

  return <div className='container pt-[56px] min-h-[500px]'>Fundraising</div>;
};

export default Fundraising;
