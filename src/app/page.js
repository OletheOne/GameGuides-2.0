'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import IntroAnimation from '@/components/layout/IntroAnimation';
import GuideCard from '@/components/ui/GuideCard';

export default function HomePage() {
  const [showMainContent, setShowMainContent] = useState(false);
  const { ref: introRef, inView: introInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const { ref: guidesRef, inView: guidesInView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };
  
  // Handle intro animation completion
  const handleIntroComplete = () => {
    setShowMainContent(true);
    document.body.classList.remove('no-scroll');
  };
  
  // Add no-scroll class to body on initial load
  useEffect(() => {
    document.body.classList.add('no-scroll');
    
    // Check if we should skip the intro (e.g., returning from a guide page)
    const fromGuide = sessionStorage.getItem('fromGuide');
    if (fromGuide) {
      handleIntroComplete();
      sessionStorage.removeItem('fromGuide');
    }
  }, []);
  
  return (
    <>
      {/* Intro Animation */}
      <IntroAnimation
        backgroundImage="/images/intro-bg.jpg"
        title="GameGuides"
        subtitle="Your ultimate guide to mastering your favorite games"
        ctaText="Explore Guides"
        onComplete={handleIntroComplete}
        targetId="guides"
      />
      
      <main>
        {/* Introduction Section */}
        <section id="about" className="container">
          <motion.div
            ref={introRef}
            className="intro-section"
            initial="hidden"
            animate={introInView || showMainContent ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <h2 className="intro-section__title">Welcome to GameGuides</h2>
            <p className="intro-section__text">
              Explore our comprehensive video game walkthroughs designed to help you conquer your favorite games with ease. 
              Whether you're a beginner or a seasoned player, our guides provide tips, strategies, and insights to enhance your gaming experience.
            </p>
          </motion.div>
        </section>
        
        {/* Guide Cards */}
        <section id="guides" className="container">
          <motion.div
            ref={guidesRef}
            initial="hidden"
            animate={guidesInView || showMainContent ? "visible" : "hidden"}
            variants={fadeInVariants}
          >
            <h2 className="text-center mb-4">Featured Guides</h2>
            <div className="guide-cards">
              <GuideCard
                title="Stardew Valley"
                description="Master farm life with our comprehensive guide to Stardew Valley. Learn essential tips for each season, optimize your farm layout, and build the perfect relationships with villagers."
                imageUrl="/images/stardew-valley-card.jpg"
                slug="stardew-valley"
              />
              
              <GuideCard
                title="Coming Soon"
                description="We're working on more comprehensive guides for your favorite games. Stay tuned for upcoming walkthroughs and strategy guides."
                isComingSoon={true}
              />
            </div>
          </motion.div>
        </section>
      </main>
    </>
  );
}