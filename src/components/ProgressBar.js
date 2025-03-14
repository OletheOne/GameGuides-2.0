'use client';

import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const progressBarRef = useRef(null);
  
  useEffect(() => {
    const progressBar = progressBarRef.current;
    
    // Calculate and update scroll progress
    const handleScroll = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      
      progressBar.style.width = scrolled + "%";
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Initial calculation
    handleScroll();
    
    // Cleanup on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <div 
      className="progress-bar" 
      id="progress-bar" 
      ref={progressBarRef}
      role="progressbar"
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  );
}