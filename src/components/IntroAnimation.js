'use client';

import { useEffect, useRef } from 'react';

export default function IntroAnimation({ 
  backgroundImage,
  title,
  subtitle,
  ctaText,
  targetId,
  onComplete 
}) {
  // Refs for DOM elements
  const introAnimationRef = useRef(null);
  const introBackgroundRef = useRef(null);
  const introContentRef = useRef(null);
  const exploreButtonRef = useRef(null);
  
  useEffect(() => {
    // Store DOM elements
    const introAnimation = introAnimationRef.current;
    const introBackground = introBackgroundRef.current;
    const introContent = introContentRef.current;
    const exploreButton = exploreButtonRef.current;
    
    // Check for returning visitors using sessionStorage
    const fromGuide = sessionStorage.getItem('fromGuide');
    
    if (fromGuide) {
      // Skip animation if returning from a guide
      introAnimation.style.display = 'none';
      if (onComplete) onComplete();
      sessionStorage.removeItem('fromGuide');
      return;
    }
    
    // Start the animation immediately but keep the transitions
    introAnimation.classList.add('phase1');
    
    // Phase 2: After background transition, show the content
    setTimeout(function() {
      introAnimation.classList.add('phase2');
    }, 1500);
    
    // Function to complete the intro animation
    function completeIntroAnimation() {
      // Remove listener to prevent multiple calls
      exploreButton.removeEventListener('click', handleExploreButtonClick);
      
      // Add the complete class to trigger animation
      introAnimation.classList.add('complete');
      
      // Call onComplete callback
      if (onComplete) {
        setTimeout(() => {
          onComplete();
          
          // Scroll to target section after animation completes
          setTimeout(() => {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
              });
            }
          }, 500);
          
          // IMPORTANT: Completely remove the intro animation element after transition
          setTimeout(() => {
            introAnimation.style.display = 'none';
            introAnimation.remove();
          }, 2000);
        }, 500);
      }
    }
    
    // Handle explore button click
    const handleExploreButtonClick = (e) => {
      e.preventDefault();
      completeIntroAnimation();
    };
    
    // Add click listener
    exploreButton.addEventListener('click', handleExploreButtonClick);
    
    // Handle missing background image
    const testBg = new Image();
    testBg.onerror = function() {
      introBackground.style.backgroundImage = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)';
    };
    testBg.src = backgroundImage;
    
    // Cleanup on unmount
    return () => {
      exploreButton.removeEventListener('click', handleExploreButtonClick);
    };
  }, [backgroundImage, onComplete, targetId]);
  
  return (
    <div className="intro-animation" id="intro-animation" ref={introAnimationRef}>
      <div 
        className="intro-background" 
        id="intro-background" 
        ref={introBackgroundRef} 
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="intro-content" id="intro-content" ref={introContentRef}>
        <h1 className="intro-title">{title}</h1>
        <p className="intro-subtitle">{subtitle}</p>
        <a 
          href={`#${targetId}`} 
          className="intro-cta" 
          id="explore-button" 
          ref={exploreButtonRef}
        >
          {ctaText}
        </a>
      </div>
    </div>
  );
}