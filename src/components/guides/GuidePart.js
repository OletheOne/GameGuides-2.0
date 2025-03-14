'use client';

import { useState, useEffect, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';

export default function GuidePart({ id, title, children }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });
  
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
    <motion.div
      id={id}
      ref={ref}
      className="guide-part"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
    >
      <h3 className="guide-part__title">{title}</h3>
      <div className="guide-part__content">
        {children}
      </div>
    </motion.div>
  );
}