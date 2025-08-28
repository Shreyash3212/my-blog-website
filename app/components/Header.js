'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationLink from './NavigationLink';
export default function Header() {
  const pathname = usePathname();
  
  return (
    <header className="header">
      <div className="container">
        <h1 className="header-brand">My Blog</h1>
        <nav className="header-nav">
          <NavigationLink 
            href="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            Home
          </NavigationLink>
          <NavigationLink 
            href="/admin/dashboard" 
            className={`nav-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}
          >
            Admin
          </NavigationLink>
          <NavigationLink 
            href="/about" 
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
          >
            About
          </NavigationLink>
        </nav>
      </div>
    </header>
  );
}