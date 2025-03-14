'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import '../../../styles/main.css';
import BackToTop from '../../../components/BackToTop';
import ProgressBar from '../../../components/ProgressBar';
import IntroAnimation from '../../../components/IntroAnimation';

export default function StardewValleyPage() {
  // State to control main content visibility
  const [showMainContent, setShowMainContent] = useState(false);
  
  // Refs for DOM elements that are still directly manipulated
  const mainContentRef = useRef(null);
  const headerRef = useRef(null);
  const navToggleRef = useRef(null);
  const navListRef = useRef(null);
  const videoElementRef = useRef(null);
  const videoPlaceholderRef = useRef(null);

  useEffect(() => {
    // Store DOM elements
    const mainContent = mainContentRef.current;
    const header = headerRef.current;
    const navToggle = navToggleRef.current;
    const navList = navListRef.current;
    const videoElement = videoElementRef.current;
    const videoPlaceholder = videoPlaceholderRef.current;
    const body = document.body;

    // Add no-scroll class to body initially
    body.classList.add('no-scroll');
    
    // Check if we should show the intro (skip if returning from another page)
    const fromGuide = sessionStorage.getItem('fromGuide');
    if (fromGuide) {
      setShowMainContent(true);
      body.classList.remove('no-scroll');
      sessionStorage.removeItem('fromGuide');
    }

    // Variables for main site functionality
    let lastScrollY = window.scrollY;
    
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
    
    // Mobile navigation toggle
    if(navToggle) {
      navToggle.addEventListener('click', function() {
        navList.classList.toggle('active');
      });
    }
    
    // TOC highlighting based on scroll position
    function highlightTocItem() {
      const sections = document.querySelectorAll('section[id], div[id^="part"]');
      const scrollPosition = window.scrollY + 100;
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if(scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          document.querySelectorAll('.toc__link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
          
          document.querySelectorAll('.nav__link').forEach(link => {
            link.classList.remove('active');
            if(link.getAttribute('href') === '#' + sectionId) {
              link.classList.add('active');
            }
          });
        }
      });
    }
    
    window.addEventListener('scroll', highlightTocItem);
    
    // Handle video placeholder
    if(videoElement && videoPlaceholder) {
      // Initially hide the placeholder
      videoPlaceholder.style.display = 'none';
      
      // Show placeholder if video fails to load
      videoElement.addEventListener('error', function() {
        videoElement.style.display = 'none';
        videoPlaceholder.style.display = 'flex';
      });
      
      // Check if the source is accessible
      const videoSource = videoElement.querySelector('source');
      if(videoSource) {
        const testImage = new Image();
        testImage.onerror = function() {
          videoElement.style.display = 'none';
          videoPlaceholder.style.display = 'flex';
        };
        testImage.src = videoSource.src.replace('.mp4', '.jpg');
      }
    }
    
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
            if (elementId === 'hero' || elementId === 'intro-background') {
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
    
    // Reveal animations on scroll
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
    
    // Set initial state for fade-in elements
    document.querySelectorAll('.fade-in').forEach(element => {
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    window.addEventListener('scroll', revealOnScroll);
    
    // Initial check for animations (after intro animation completes)
    setTimeout(revealOnScroll, 2000);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', highlightTocItem);
      window.removeEventListener('scroll', revealOnScroll);
      
      if (videoElement) {
        videoElement.removeEventListener('error', function() {});
      }

      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', function() {});
      });
      
      if(navToggle) {
        navToggle.removeEventListener('click', function() {});
      }
    };
  }, []); // Empty dependency array means this runs once on mount

  // Handle intro animation completion
  const handleIntroComplete = () => {
    setShowMainContent(true);
    document.body.classList.remove('no-scroll');
  };

  return (
    <>
      <Head>
        <meta name="description" content="Complete Stardew Valley guide with strategies for all seasons, tips for beginners, and advanced farming techniques." />
        <title>Stardew Valley Guide | Complete Walkthrough</title>
        <link rel="icon" href="../assets/images/favicon.ico" type="image/x-icon" />
      </Head>

      {/* Intro Animation - Now using component */}
      <IntroAnimation 
        backgroundImage="../assets/images/stardew-valley-bg.jpg"
        title="Stardew Valley Guide"
        subtitle="Your complete companion to farm life and adventures"
        ctaText="Start Reading"
        targetId="introduction"
        onComplete={handleIntroComplete}
      />

      {/* Main Content */}
      <div className={`main-content ${showMainContent ? 'visible' : ''}`} id="main-content" ref={mainContentRef}>
        {/* Progress Bar - Now using component */}
        <ProgressBar />
        
        {/* Header */}
        <header className="header" id="main-header" ref={headerRef}>
          <div className="container">
            <div className="header__inner">
              <Link href="/" className="header__logo">GameGuides</Link>
              <nav className="nav" aria-label="Main Navigation">
                <ul className="nav__list" ref={navListRef}>
                  <li className="nav__item">
                    <Link href="/" className="nav__link">Home</Link>
                  </li>
                  <li className="nav__item">
                    <a href="#introduction" className="nav__link">Overview</a>
                  </li>
                  <li className="nav__item">
                    <a href="#seasons" className="nav__link">Seasons</a>
                  </li>
                  <li className="nav__item">
                    <a href="#tips" className="nav__link">Tips</a>
                  </li>
                  <li className="nav__item">
                    <a href="#strategies" className="nav__link">Strategies</a>
                  </li>
                  <li className="nav__item">
                    <a href="#videos" className="nav__link">Videos</a>
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
            <div className="container">
                <div className="grid grid--with-sidebar">
                    {/* Main Content */}
                    <div className="content">
                        {/* Introduction Section */}
                        <section id="introduction" className="card card--primary fade-in">
                            <h2 className="card__title">Welcome to the Stardew Valley Walkthrough!</h2>
                            <p>
                                Whether you're just starting your farm or looking to optimize your gameplay, our comprehensive 
                                guide covers everything you need to know about Stardew Valley. Follow our season-by-season 
                                approach to make the most of your farming adventure!
                            </p>
                        </section>
                        
                        {/* Seasons Guide Section */}
                        <section id="seasons" className="mt-5">
                            <h2 className="text-center mb-4">Season-by-Season Guide</h2>
                            
                            <div id="part1" className="guide-part fade-in">
                                <h3 className="guide-part__title">Part 1: First Spring</h3>
                                <p>
                                    Establishing optimal strategies for your first spring, focusing on maximum profitability, 
                                    early farm setup, early friendships, mining, fishing, and community center bundle preparation.
                                </p>
                                <ul className="mt-3">
                                    <li>Plant parsnips, potatoes, and cauliflower early</li>
                                    <li>Focus on reaching mining level 40 by end of month</li>
                                    <li>Begin building relationships with Sebastian, Robin, and Linus</li>
                                    <li>Save at least one of each spring crop for bundles</li>
                                </ul>
                            </div>
                            
                            <div id="part2" className="guide-part fade-in">
                                <h3 className="guide-part__title">Part 2: First Summer</h3>
                                <p>
                                    Detailing strategies for first summer, further enhancing your profitability, transitioning to 
                                    upgraded crops, deeper mining, advanced fishing, and community center bundle progression.
                                </p>
                                <ul className="mt-3">
                                    <li>Focus on blueberries for maximum profit</li>
                                    <li>Craft quality sprinklers to automate watering</li>
                                    <li>Reach the bottom of the mines</li>
                                    <li>Begin focusing on artisan production</li>
                                </ul>
                            </div>
                            
                            <div id="part3" className="guide-part fade-in">
                                <h3 className="guide-part__title">Part 3: First Fall</h3>
                                <p>
                                    Covering the critical first fall, optimizing farm layout, key high-value crops, completing 
                                    important bundles, upgrading tools, and establishing deeper relationship progressions.
                                </p>
                                <ul className="mt-3">
                                    <li>Plant cranberries and pumpkins for high profit</li>
                                    <li>Focus on completing the pantry bundles</li>
                                    <li>Begin planning your ideal farm layout</li>
                                    <li>Prepare for winter by stockpiling resources</li>
                                </ul>
                            </div>
                            
                            <div id="part4" className="guide-part fade-in">
                                <h3 className="guide-part__title">Part 4: First Winter</h3>
                                <p>
                                    Explaining your approach for the first winter, turning downtime into major progress with mining, 
                                    fishing, community bundles, and maximizing friendships.
                                </p>
                                <ul className="mt-3">
                                    <li>Redesign and upgrade your farm</li>
                                    <li>Focus on the mines and skull cavern</li>
                                    <li>Build relationships to unlock heart events</li>
                                    <li>Stock up on resources for spring planting</li>
                                </ul>
                            </div>
                            
                            <div id="part5" className="guide-part fade-in">
                                <h3 className="guide-part__title">Part 5: Year 2 and Beyond</h3>
                                <p>
                                    Laying out strategies for Year 2 and beyond, transitioning to large-scale farming setups, 
                                    Ginger Island content, automation, animal husbandry, and sustainable, massive profits 
                                    alongside advanced relationship building.
                                </p>
                                <ul className="mt-3">
                                    <li>Focus on ancient fruit in the greenhouse</li>
                                    <li>Develop a wine and jam production pipeline</li>
                                    <li>Unlock and explore Ginger Island</li>
                                    <li>Complete all remaining achievements</li>
                                </ul>
                            </div>
                        </section>
                        
                        {/* Tips Section */}
                        <section id="tips" className="card card--accent mt-5 fade-in">
                            <h2 className="card__title">Tips for Beginners</h2>
                            <ul className="feature-list feature-list--tips">
                                <li>Start by focusing on farming and gathering resources to build capital quickly.</li>
                                <li>Build relationships with the townsfolk to unlock new recipes, events, and gifts.</li>
                                <li>Plan your farm layout for optimal efficiency, especially with sprinkler placement.</li>
                                <li>Save one of each crop for the community center bundles to avoid missing seasonal items.</li>
                                <li>Upgrade your watering can before a rainy day so you don't miss watering crops.</li>
                                <li>Check the TV every morning for weather forecasts, luck, and cooking recipes.</li>
                                <li>The mine elevator saves every five levels, making deeper exploration more manageable.</li>
                            </ul>
                        </section>
                        
                        {/* Strategies Section */}
                        <section id="strategies" className="card card--accent2 mt-5 fade-in">
                            <h2 className="card__title">Advanced Strategies</h2>
                            <ul className="feature-list feature-list--strategies">
                                <li>Utilize the greenhouse for year-round farming of high-value crops like ancient fruit.</li>
                                <li>Invest in artisan goods for higher profits - especially kegs for wine production.</li>
                                <li>Explore the mines for valuable resources and combat experience, focusing on iridium in Skull Cavern.</li>
                                <li>Focus on ancient fruit and starfruit for maximum profit, processed into wine.</li>
                                <li>Build relationships strategically for helpful gifts and recipes, particularly with Caroline for tea saplings.</li>
                                <li>Use crystal paths and junimo huts for late-game automation of your farm.</li>
                                <li>Master the fishing mini-game with the trap bobber for difficult catches.</li>
                            </ul>
                        </section>
                        
                        {/* Videos Section */}
                        <section id="videos" className="video-section mt-5 fade-in">
                            <h2 className="video-section__title">Walkthrough Videos</h2>
                            <p>Check out our video guides for visual walkthroughs:</p>
                            
                            <div className="video-container">
                                {/* Original video element */}
                                <video controls ref={videoElementRef}>
                                    <source src="../assets/videos/stardew-valley-guide.mp4" type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                                
                                {/* Video placeholder */}
                                <div className="video-placeholder" ref={videoPlaceholderRef}>
                                    <div className="video-placeholder__icon">🎮</div>
                                    <p className="video-placeholder__text">Video content coming soon!</p>
                                    <p className="video-placeholder__path">../assets/videos/stardew-valley-guide.mp4</p>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                    {/* Sidebar */}
                    <aside>
                        {/* Table of Contents */}
                        <div className="toc" id="toc">
                            <h3 className="toc__title">In This Guide</h3>
                            <ul className="toc__list">
                                <li className="toc__item">
                                    <a href="#introduction" className="toc__link">Introduction</a>
                                </li>
                                <li className="toc__item">
                                    <a href="#seasons" className="toc__link">Seasons Guide</a>
                                    <ul>
                                        <li><a href="#part1" className="toc__link">First Spring</a></li>
                                        <li><a href="#part2" className="toc__link">First Summer</a></li>
                                        <li><a href="#part3" className="toc__link">First Fall</a></li>
                                        <li><a href="#part4" className="toc__link">First Winter</a></li>
                                        <li><a href="#part5" className="toc__link">Year 2+</a></li>
                                    </ul>
                                </li>
                                <li className="toc__item">
                                    <a href="#tips" className="toc__link">Tips for Beginners</a>
                                </li>
                                <li className="toc__item">
                                    <a href="#strategies" className="toc__link">Advanced Strategies</a>
                                </li>
                                <li className="toc__item">
                                    <a href="#videos" className="toc__link">Walkthrough Videos</a>
                                </li>
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
        
        {/* Footer */}
        <footer className="footer">
            <div className="container">
                <p className="footer__text">&copy; {new Date().getFullYear()} Video Game Walkthroughs. All rights reserved.</p>
            </div>
        </footer>
        
        {/* Back to Top Button - Now using component */}
        <BackToTop />
      </div>
    </>
  );
}