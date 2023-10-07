import Breadcrumbs from '@/components/Breadcrumbs ';
import { baseApi } from '@/services/authServise';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const [avatar, setAvatar] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, []);

  useEffect(() => {
    const getAvatar = async () => {
      const token = localStorage.getItem('token');
      if (!token || avatar) return;
      try {
        const response = await baseApi.get('/account/image', {
          headers: {
            'Content-Type': 'application/json',
            'token-tt': localStorage.getItem('token'),
          },
        });
        const { image } = response.data;
        setAvatar(image);
      } catch (error) {
        console.error(error?.response?.data);
      }
    };

    getAvatar();
  }, [avatar]);

  return (
    <>
      <div className='container pt-[50px]'>
        <Breadcrumbs />
      </div>
      <div className='container pt-[56px] min-h-[500px] flex justify-center items-center flex-col gap-5'>
        <div className='w-[170px] h-[170px]'>
          {avatar && (
            <Image
              src={avatar}
              width={170}
              height={170}
              alt=''
              className='w-[170px] h-[170px] rounded-full overflow-hidden object-cover border-2 border-blue-500'
            />
          )}
        </div>
        <p className='font-medium text-lg text-blue-500  mt-4'>
          <Link href='/account'>Edit</Link>
        </p>
      </div>
    </>
  );
};

export default Profile;
