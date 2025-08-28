'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLoading } from '../contexts/LoadingContext';

const NavigationLink = ({ href, children, className, ...props }) => {
  const { startLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = () => {
    if (pathname !== href) {
      startLoading();
    }
  };

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </Link>
  );
};

export default NavigationLink;
