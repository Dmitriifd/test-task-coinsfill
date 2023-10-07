import Card from '@/icons/Card';
import Fundraising from '@/icons/Fundraising';
import Home from '@/icons/Home';
import Transfer from '@/icons/Transfer';
import { cn } from '@/utils/tail';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const Footer = () => {
  const path = usePathname();

  return (
    <footer className='footer'>
      <ul className='container footer-nav flex items-end'>
        <Link
          href='/'
          className={cn('flex flex-col gap-2 justify-center items-center', {
            active: path == '/',
          })}
        >
          <Home />
          <span>Home</span>
        </Link>
        <Link
          href='/cards'
          className={cn('flex flex-col gap-2 justify-center items-center', {
            active: path == '/cards',
          })}
        >
          <Card />
          <span>Cards</span>
        </Link>
        <Link
          href='/account'
          className={cn('flex flex-col gap-2 justify-center items-center', {
            active: path == '/account',
          })}
        >
          <Transfer />
          <span>Account</span>
        </Link>
        <Link
          href='/profile'
          className={cn('flex flex-col gap-2 justify-center items-center', {
            active: path == '/profile',
          })}
        >
          <Fundraising />
          <span>Profile</span>
        </Link>
      </ul>
    </footer>
  );
};

export default Footer;
