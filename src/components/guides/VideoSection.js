'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function VideoSection({ 
  id, 
  title, 
  description, 
  videoUrl,
  placeholderText = 'Video content coming soon!'
}) {
  const [videoError, setVideoError] = useState(false);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
  // Check if the video URL is valid
  useEffect(() => {
    if (!videoUrl) {
      setVideoError(true);
    }
  }, [videoUrl]);
  
  // Animation variants
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  };
  
  return (
    <motion.section
      id={id}
      ref={ref}
      className="video-section"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <h2 className="video-section__title">{title}</h2>
      {description && <p>{description}</p>}
      
      <div className="video-container">
        {!videoError ? (
          <video 
            controls
            onError={() => setVideoError(true)}
          >
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="video-placeholder">
            <div className="video-placeholder__icon">🎮</div>
            <p className="video-placeholder__text">{placeholderText}</p>
            {videoUrl && (
              <p className="video-placeholder__path">{videoUrl}</p>
            )}
          </div>
        )}
      </div>
    </motion.section>
  );
}