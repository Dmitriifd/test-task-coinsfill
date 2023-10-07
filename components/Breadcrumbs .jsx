import Link from 'next/link';
import { useRouter } from 'next/router';

const Breadcrumbs = () => {
  const router = useRouter();
  const { pathname } = router;

  const pathSegments = pathname.split('/').filter((segment) => segment !== '');

  return (
    <ul
      className='mt-[37px] text-[10px] font-medium
    text-grayColorLight mb-5 flex gap-2 absolute'
    >
      <li key='Home'>
        <Link href='/'>Home</Link>
      </li>{' '}
      /
      {pathSegments.map((segment, index) => {
        const path = `/${pathSegments.slice(0, index + 1).join('/')}`;
        const isActive = index === pathSegments.length - 1;

        return (
          <li key={segment} className='capitalize'>
            {isActive ? (
              <span>{segment}</span>
            ) : (
              <Link href={path}>{segment}</Link>
            )}
          </li>
        );
      })}
    </ul>
  );
};

export default Breadcrumbs;
