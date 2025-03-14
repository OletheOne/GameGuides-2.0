'use client';

import { useState, useEffect } from 'react';

export default function ProgressBar() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const calculateScrollProgress = () => {
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPosition = window.scrollY;
      
      if (windowHeight > 0) {
        setProgress((scrollPosition / windowHeight) * 100);
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', calculateScrollProgress, { passive: true });
    
    // Initial calculation
    calculateScrollProgress();
    
    // Clean up on unmount
    return () => {
      window.removeEventListener('scroll', calculateScrollProgress);
    };
  }, []);
  
  return (
    <div 
      className="progress-bar" 
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    ></div>
  );
}