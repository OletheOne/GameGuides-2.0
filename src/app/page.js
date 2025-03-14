'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import '../styles/main.css';

export default function HomePage() {
  // Refs for DOM elements we'll need to manipulate
  const introAnimationRef = useRef(null);
  const introBackgroundRef = useRef(null);
  const introContentRef = useRef(null);
  const exploreButtonRef = useRef(null);
  const mainContentRef = useRef(null);
  const bodyRef = useRef(null);
  const headerRef = useRef(null);
  const backToTopButtonRef = useRef(null);
  const progressBarRef = useRef(null);
  const navToggleRef = useRef(null);
  const navListRef = useRef(null);

  useEffect(() => {
    // Store the actual DOM elements once the component mounts
    const introAnimation = introAnimationRef.current;
    const introBackground = introBackgroundRef.current;
    const introContent = introContentRef.current;
    const exploreButton = exploreButtonRef.current;
    const mainContent = mainContentRef.current;
    const header = headerRef.current;
    const backToTopButton = backToTopButtonRef.current;
    const progressBar = progressBarRef.current;
    const navToggle = navToggleRef.current;
    const navList = navListRef.current;
    const body = document.body; // We can access body directly

    // Save reference to body for no-scroll class
    bodyRef.current = body;

    // Add no-scroll class to body initially
    body.classList.add('no-scroll');

    // Store last scroll position for header hide/show logic
    let lastScrollY = window.scrollY;

    // Start the animation immediately but keep the transitions
    introAnimation.classList.add('phase1');
    
    // Phase 2: After background transition, show the content
    setTimeout(function() {
        introAnimation.classList.add('phase2');
    }, 1500);
    
    // Button click completes the animation
    const handleExploreButtonClick = function(e) {
        e.preventDefault();
        completeIntroAnimation();
        
        // Scroll to guides section after animation completes
        setTimeout(function() {
            const guidesSection = document.getElementById('guides');
            if (guidesSection) {
                window.scrollTo({
                    top: guidesSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        }, 1000);
    };
    
    // Function to complete the intro animation
    function completeIntroAnimation() {
        // Remove listener to prevent multiple calls
        exploreButton.removeEventListener('click', handleExploreButtonClick);
        
        // Add the complete class to trigger animation
        introAnimation.classList.add('complete');
        
        // Show main content after animation completes
        setTimeout(function() {
            mainContent.classList.add('visible');
            body.classList.remove('no-scroll');
            
            // IMPORTANT: Completely remove the intro animation element after transition
            setTimeout(() => {
                introAnimation.style.display = 'none';
                introAnimation.remove();
            }, 2000); // Wait for the animation to complete before removing
        }, 500);
    }
    
    // Add explore button click handler
    exploreButton.addEventListener('click', handleExploreButtonClick);
    
    // Set flag when navigating to a guide
    document.querySelectorAll('a[href*="guides/"]').forEach(link => {
        link.addEventListener('click', function() {
            sessionStorage.setItem('fromGuide', 'true');
        });
    });
    
    // Check if we should show the intro (skip if returning from a guide)
    const fromGuide = sessionStorage.getItem('fromGuide');
    if (fromGuide) {
        // Skip animation if returning from a guide
        introAnimation.style.display = 'none';
        mainContent.classList.add('visible');
        body.classList.remove('no-scroll');
        sessionStorage.removeItem('fromGuide');
    }
    
    // Handle missing background image
    const testBg = new Image();
    testBg.onerror = function() {
        introBackground.style.backgroundImage = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)';
    };
    testBg.src = 'assets/images/intro-bg.jpg';
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if(this.getAttribute('href') !== '#') {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Handle scroll events
    function handleScroll() {
        // Progress bar
        const winScroll = body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
        
        // Back to top button visibility
        if(window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
        
        // Header appearance/disappearance on scroll
        if(window.scrollY > 100) {
            header.classList.add('scrolled');
            
            if(window.scrollY > lastScrollY) {
                header.classList.add('hidden');
            } else {
                header.classList.remove('hidden');
            }
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScrollY = window.scrollY;
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Back to top functionality
    const handleBackToTopClick = function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };
    
    backToTopButton.addEventListener('click', handleBackToTopClick);
    
    // Mobile navigation toggle
    if(navToggle) {
        navToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
        });
    }
    
    // Add active class to current section in navigation
    function setActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 200;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav__link').forEach(link => {
                    link.classList.remove('active');
                    if(link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavLink);
    
    // Check for missing images and apply fallbacks
    function handleMissingImages() {
        const images = document.querySelectorAll('[style*="background-image"]');
        
        images.forEach(img => {
            const style = getComputedStyle(img);
            const url = style.backgroundImage.match(/url\(['"]?([^'"]+)['"]?\)/);
            
            if (url) {
                const imageUrl = url[1];
                const tempImg = new Image();
                
                tempImg.onerror = function() {
                    // Apply a fallback gradient if image fails to load
                    const elementId = img.id;
                    if (elementId === 'hero') {
                        img.style.backgroundImage = 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)';
                    } else {
                        img.style.backgroundImage = 'none';
                        img.style.backgroundColor = 'var(--color-primary-light)';
                    }
                };
                
                tempImg.src = imageUrl;
            }
        });
    }
    
    handleMissingImages();
    
    // Reveal animations for normal page content
    document.querySelectorAll('.fade-in').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    const revealOnScroll = function() {
        const elements = document.querySelectorAll('.fade-in');
        const windowHeight = window.innerHeight;
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if(elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for animations (after intro animation phases complete)
    setTimeout(revealOnScroll, 2000);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', setActiveNavLink);
      window.removeEventListener('scroll', revealOnScroll);
      exploreButton.removeEventListener('click', handleExploreButtonClick);
      backToTopButton.removeEventListener('click', handleBackToTopClick);
      
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function(e) {});
      });
      
      document.querySelectorAll('a[href*="guides/"]').forEach(link => {
        link.removeEventListener('click', function() {});
      });
      
      if(navToggle) {
        navToggle.removeEventListener('click', function() {});
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <>
      <Head>
        <meta name="description" content="Comprehensive video game walkthroughs to help you master your favorite games with expert tips and strategies." />
        <title>Video Game Walkthroughs | Expert Gaming Guides</title>
        <link rel="icon" href="assets/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Intro Animation */}
      <div className="intro-animation" id="intro-animation" ref={introAnimationRef}>
        <div 
          className="intro-background" 
          id="intro-background" 
          ref={introBackgroundRef} 
          style={{backgroundImage: "url('assets/images/intro-bg.jpg')"}}
        ></div>
        <div className="intro-content" id="intro-content" ref={introContentRef}>
          <h1 className="intro-title">GameGuides</h1>
          <p className="intro-subtitle">Your ultimate guide to mastering your favorite games</p>
          <a href="#guides" className="intro-cta" id="explore-button" ref={exploreButtonRef}>Explore Guides</a>
        </div>
      </div>

      {/* Main Content */}
      <div className="main-content" id="main-content" ref={mainContentRef}>
        {/* Progress Bar */}
        <div className="progress-bar" id="progress-bar" ref={progressBarRef}></div>
        
        {/* Header */}
        <header className="header" id="main-header" ref={headerRef}>
          <div className="container">
            <div className="header__inner">
              <Link href="index.html" className="header__logo">GameGuides</Link>
              <nav className="nav" aria-label="Main Navigation">
                <ul className="nav__list" ref={navListRef}>
                  <li className="nav__item">
                    <Link href="index.html" className="nav__link active">Home</Link>
                  </li>
                  <li className="nav__item">
                    <a href="#guides" className="nav__link">Guides</a>
                  </li>
                  <li className="nav__item">
                    <a href="#about" className="nav__link">About</a>
                  </li>
                </ul>
                <button className="nav__toggle" id="nav-toggle" aria-label="Toggle navigation" ref={navToggleRef}>
                  <span>☰</span>
                </button>
              </nav>
            </div>
          </div>
        </header>
        
        <main>
          {/* Introduction Section */}
          <section id="about" className="container">
            <div className="intro-section fade-in">
              <h2 className="intro-section__title">Welcome to GameGuides</h2>
              <p className="intro-section__text">
                Explore our comprehensive video game walkthroughs designed to help you conquer your favorite games with ease. 
                Whether you're a beginner or a seasoned player, our guides provide tips, strategies, and insights to enhance your gaming experience.
              </p>
            </div>
          </section>
          
          {/* Guide Cards */}
          <section id="guides" className="container">
            <h2 className="text-center mb-4">Featured Guides</h2>
            <div className="guide-cards">
              <article className="guide-card">
                <div className="guide-card__image" style={{backgroundImage: "url('assets/images/stardew-valley-card.jpg')"}}></div>
                <div className="guide-card__content">
                  <h3 className="guide-card__title">Stardew Valley</h3>
                  <p className="guide-card__text">
                    Master farm life with our comprehensive guide to Stardew Valley. Learn essential tips for each season,
                    optimize your farm layout, and build the perfect relationships with villagers.
                  </p>
                  <Link href="guides/stardew-valley" className="guide-card__link">Read Guide</Link>
                </div>
              </article>
              
              <article className="guide-card">
                <div className="guide-card__image" style={{backgroundColor: "var(--color-primary-light)"}}></div>
                <div className="guide-card__content">
                  <h3 className="guide-card__title">Coming Soon</h3>
                  <p className="guide-card__text">
                    We're working on more comprehensive guides for your favorite games. 
                    Stay tuned for upcoming walkthroughs and strategy guides.
                  </p>
                  <a href="#" className="guide-card__link" style={{backgroundColor: "var(--color-text-lighter)"}}>Stay Tuned</a>
                </div>
              </article>
            </div>
          </section>
        </main>
        
        {/* Footer */}
        <footer className="footer">
          <div className="container">
            <p className="footer__text">&copy; {new Date().getFullYear()} Video Game Walkthroughs. All rights reserved.</p>
          </div>
        </footer>
        
        {/* Back to Top Button */}
        <a href="#" id="back-to-top" className="back-to-top" aria-label="Back to top" ref={backToTopButtonRef}>↑</a>
      </div>
    </>
  );
}