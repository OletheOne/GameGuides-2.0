'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathname = usePathname();

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Apply scrolled class when scrolled down
      if (currentScrollY > 100) {
        setIsScrolled(true);
        
        // Hide header when scrolling down, show when scrolling up
        if (currentScrollY > lastScrollY) {
          setIsHidden(true);
        } else {
          setIsHidden(false);
        }
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // Toggle mobile navigation
  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <header 
      className={`header ${isScrolled ? 'scrolled' : ''} ${isHidden ? 'hidden' : ''}`}
      id="main-header"
    >
      <div className="container">
        <div className="header__inner">
          <Link href="/" className="header__logo">
            GameGuides
          </Link>
          
          <nav className="nav" aria-label="Main Navigation">
            <ul className={`nav__list ${isNavOpen ? 'active' : ''}`}>
              <li className="nav__item">
                <Link 
                  href="/" 
                  className={`nav__link ${pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li className="nav__item">
                <Link 
                  href="/#guides" 
                  className={`nav__link ${pathname === '/#guides' ? 'active' : ''}`}
                  onClick={() => setIsNavOpen(false)}
                >
                  Guides
                </Link>
              </li>
              <li className="nav__item">
                <Link 
                  href="/guides/stardew-valley" 
                  className={`nav__link ${pathname === '/guides/stardew-valley' ? 'active' : ''}`}
                  onClick={() => setIsNavOpen(false)}
                >
                  Stardew Valley
                </Link>
              </li>
              <li className="nav__item">
                <Link 
                  href="/#about" 
                  className={`nav__link ${pathname === '/#about' ? 'active' : ''}`}
                  onClick={() => setIsNavOpen(false)}
                >
                  About
                </Link>
              </li>
            </ul>
            
            <button 
              className="nav__toggle" 
              id="nav-toggle" 
              aria-label="Toggle navigation"
              onClick={toggleNav}
            >
              <span>☰</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}