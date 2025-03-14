'use client';

import { useEffect, useRef } from 'react';

export default function BackToTop() {
  const buttonRef = useRef(null);
  
  useEffect(() => {
    const backToTopButton = buttonRef.current;
    
    // Handle scroll events to show/hide the button
    const handleScroll = () => {
      if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
      } else {
        backToTopButton.classList.remove('visible');
      }
    };
    
    // Handle click to scroll to top
    const scrollToTop = (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    };
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    backToTopButton.addEventListener('click', scrollToTop);
    
    // Initial check
    handleScroll();
    
    // Cleanup event listeners on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      backToTopButton.removeEventListener('click', scrollToTop);
    };
  }, []);
  
  return (
    <a 
      href="#" 
      id="back-to-top" 
      className="back-to-top" 
      aria-label="Back to top"
      ref={buttonRef}
    >
      ↑
    </a>
  );
}