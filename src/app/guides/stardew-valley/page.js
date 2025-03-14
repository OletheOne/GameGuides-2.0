'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

import IntroAnimation from '@/components/layout/IntroAnimation';
import TableOfContents from '@/components/guides/TableOfContents';
import GuidePart from '@/components/guides/GuidePart';
import VideoSection from '@/components/guides/VideoSection';

// Define the table of contents sections
const tocSections = [
  { id: 'introduction', title: 'Introduction' },
  { 
    id: 'seasons', 
    title: 'Seasons Guide',
    subsections: [
      { id: 'part1', title: 'First Spring' },
      { id: 'part2', title: 'First Summer' },
      { id: 'part3', title: 'First Fall' },
      { id: 'part4', title: 'First Winter' },
      { id: 'part5', title: 'Year 2+' }
    ]
  },
  { id: 'tips', title: 'Tips for Beginners' },
  { id: 'strategies', title: 'Advanced Strategies' },
  { id: 'videos', title: 'Walkthrough Videos' }
];

export default function StardewValleyGuidePage() {
  const [showMainContent, setShowMainContent] = useState(false);
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
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
    
    // Check if we should skip the intro (e.g., returning from another page)
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
        backgroundImage="/images/stardew-valley-bg.jpg"
        title="Stardew Valley Guide"
        subtitle="Your complete companion to farm life and adventures"
        ctaText="Start Reading"
        onComplete={handleIntroComplete}
        targetId="introduction"
      />
      
      <main>
        <div className="container">
          <div className="grid grid--with-sidebar">
            {/* Main Content */}
            <div className="content">
              {/* Introduction Section */}
              <motion.section 
                id="introduction" 
                className="card card--primary"
                initial="hidden"
                animate={showMainContent ? "visible" : "hidden"}
                variants={fadeIn}
              >
                <h2 className="card__title">Welcome to the Stardew Valley Walkthrough!</h2>
                <p>
                  Whether you're just starting your farm or looking to optimize your gameplay, our comprehensive 
                  guide covers everything you need to know about Stardew Valley. Follow our season-by-season 
                  approach to make the most of your farming adventure!
                </p>
              </motion.section>
              
              {/* Seasons Guide Section */}
              <section id="seasons" className="mt-5">
                <h2 className="text-center mb-4">Season-by-Season Guide</h2>
                
                <GuidePart id="part1" title="Part 1: First Spring">
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
                </GuidePart>
                
                <GuidePart id="part2" title="Part 2: First Summer">
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
                </GuidePart>
                
                <GuidePart id="part3" title="Part 3: First Fall">
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
                </GuidePart>
                
                <GuidePart id="part4" title="Part 4: First Winter">
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
                </GuidePart>
                
                <GuidePart id="part5" title="Part 5: Year 2 and Beyond">
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
                </GuidePart>
              </section>
              
              {/* Tips Section */}
              <motion.section 
                id="tips" 
                className="card card--accent mt-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
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
              </motion.section>
              
              {/* Strategies Section */}
              <motion.section 
                id="strategies" 
                className="card card--accent2 mt-5"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeIn}
              >
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
              </motion.section>
              
              {/* Videos Section */}
              <VideoSection
                id="videos"
                title="Walkthrough Videos"
                description="Check out our video guides for visual walkthroughs:"
                videoUrl="/videos/stardew-valley-guide.mp4"
                placeholderText="Video content coming soon!"
              />
            </div>
            
            {/* Sidebar */}
            <aside>
              <TableOfContents sections={tocSections} />
            </aside>
          </div>
        </div>
      </main>
    </>
  );
}