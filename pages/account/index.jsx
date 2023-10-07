import React, { useEffect } from 'react';
import CustomFileInput from '@/components/CustomFileInput';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs ';

const Profile = () => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  return (
    <>
      <div className='container pt-[60px]'>
        <Breadcrumbs />
        <CustomFileInput />
      </div>
    </>
  );
};

export default Profile;
