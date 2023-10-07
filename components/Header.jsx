import Burger from '@/icons/Burger';
import Logo from '@/icons/Logo';
import Link from 'next/link';
import React from 'react';
import { usePathname } from 'next/navigation';
import Search from '@/icons/Search';
import Profile from '@/icons/Profile';
import { useModalContext } from '@/context/modal';
import { useAuthContext } from '@/context/authContext';
import useSWR from 'swr';
import Image from 'next/image';
import { baseApi } from '@/services/authServise';

const fetcher = async (...args) => {
  try {
    const response = await baseApi.get(...args, {
      headers: {
        'Content-Type': 'application/json',
        'token-tt': localStorage.getItem('token'),
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const Header = () => {
  const path = usePathname();
  const isHomePage = path === '/';
  const { setLoginModalOpen } = useModalContext();
  const { logout, isTokenValid } = useAuthContext();

  const { data, error, isLoading } = useSWR('/account/image', fetcher, {
    refreshInterval: 5000,
  });

  const handleAuth = () => {
    if (isTokenValid) {
      logout();
    } else {
      setLoginModalOpen(true);
    }
  };

  return (
    <header className='container absolute left-0 right-0'>
      <nav className='flex items-center justify-between pt-3'>
        <Link href='/' className='flex gap-4 items-center'>
          <Logo />
          <span
            className={`font-bold text-lg ${
              isHomePage ? 'text-white' : 'text-blue-600'
            }`}
          >
            CoinsFill
          </span>
        </Link>

        {isHomePage ? (
          <div className='flex gap-5 items-center'>
            <button
              className={`border border-blue-500 rounded-full px-3 py-[2px] text-sm ${
                isHomePage ? 'text-white' : 'text-blue-600'
              } `}
              onClick={handleAuth}
            >
              {isTokenValid ? <span>выйти</span> : <span>войти</span>}
            </button>
            <button className='px-1 py-1'>
              <Burger />
            </button>
          </div>
        ) : (
          <div className='flex gap-4 items-center'>
            <button>
              <Search />
            </button>
            <Link href={isTokenValid ? '/profile' : '/login'}>
              {data?.ok ? (
                <Image
                  width={25}
                  height={25}
                  src={data.image}
                  className='w-[25px] h-[25px] border-2 border-blue-500 rounded-full object-cover'
                  alt='avatar'
                />
              ) : (
                <Profile />
              )}
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
