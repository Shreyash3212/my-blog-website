'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavigationLink from './NavigationLink';
import { useState } from 'react';
import "../styles/header.css"

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on link click (mobile)
  const handleLinkClick = () => {
    setMenuOpen(false);
  };
  
  return (
    <header className="header header-transparent">
      <div className="container">
        <h1 className="header-brand">My Blog</h1>

        {/* Mobile burger button */}
        <button 
          aria-label={menuOpen ? 'Close menu' : 'Open menu'} 
          aria-expanded={menuOpen} 
          onClick={() => setMenuOpen(!menuOpen)} 
          className="mobile-menu-button"
          type="button"
        >
          {/* Burger icon (3 lines) when closed */}
          {!menuOpen && (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" >
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          )}
          {/* X icon when open */}
          {menuOpen && (
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          )}
        </button>

        {/* Navigation */}
        <nav 
          className={`header-nav ${menuOpen ? 'nav-open' : ''}`} 
          aria-label="Primary"
        >
          <NavigationLink 
            href="/" 
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            Home
          </NavigationLink>
          <NavigationLink 
            href="/admin/dashboard" 
            className={`nav-link ${pathname === '/admin/dashboard' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            Admin
          </NavigationLink>
          <NavigationLink 
            href="/about" 
            className={`nav-link ${pathname === '/about' ? 'active' : ''}`}
            onClick={handleLinkClick}
          >
            About
          </NavigationLink>
        </nav>
      </div>
    </header>
  );
}