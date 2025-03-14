'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function IntroAnimation({ 
  backgroundImage, 
  title, 
  subtitle, 
  ctaText, 
  onComplete, 
  targetId 
}) {
  const [animationPhase, setAnimationPhase] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const animationRef = useRef(null);
  
  // Start the animation sequence on component mount
  useEffect(() => {
    // Check for returning visitors using sessionStorage
    const fromGuide = sessionStorage.getItem('fromGuide');
    
    if (fromGuide) {
      // Skip animation if returning from a guide
      setIsComplete(true);
      onComplete();
      sessionStorage.removeItem('fromGuide');
      return;
    }
    
    // Phase 1: Show background with gradient overlay
    const timer1 = setTimeout(() => {
      setAnimationPhase(1);
    }, 500);
    
    // Phase 2: Show content
    const timer2 = setTimeout(() => {
      setAnimationPhase(2);
    }, 1500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [onComplete]);
  
  // Function to complete the intro animation
  const completeAnimation = () => {
    setAnimationPhase(3);
    setIsComplete(true);
    
    // Scroll to target section after animation completes
    setTimeout(() => {
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
      
      // Call onComplete callback to show main content
      setTimeout(() => {
        onComplete();
        
        // Remove the element after transition completes
        setTimeout(() => {
          if (animationRef.current) {
            animationRef.current.style.display = 'none';
          }
        }, 1000);
      }, 500);
    }, 500);
  };
  
  // If already completed, don't render
  if (isComplete && !animationRef.current) {
    return null;
  }
  
  return (
    <div 
      ref={animationRef}
      className={`intro-animation ${
        animationPhase >= 1 ? 'animate' : ''
      } ${animationPhase === 3 ? 'complete' : ''}`}
    >
      <div 
        className="intro-background"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      />
      
      <div className="intro-content">
        <h1 className="intro-title">{title}</h1>
        <p className="intro-subtitle">{subtitle}</p>
        <button 
          className="intro-cta" 
          onClick={completeAnimation}
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}