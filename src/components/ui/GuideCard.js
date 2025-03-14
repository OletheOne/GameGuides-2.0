import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export default function GuideCard({ 
  title, 
  description, 
  imageUrl, 
  slug, 
  isComingSoon = false 
}) {
  return (
    <article className="guide-card">
      <div 
        className="guide-card__image"
        style={{ 
          backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
          backgroundColor: !imageUrl ? 'var(--color-primary-light)' : undefined 
        }}
      >
        {imageUrl && (
          <div className="guide-card__image-overlay"></div>
        )}
      </div>
      
      <div className="guide-card__content">
        <h3 className="guide-card__title">{title}</h3>
        
        <p className="guide-card__text">
          {description}
        </p>
        
        {isComingSoon ? (
          <span 
            className="guide-card__link" 
            style={{ backgroundColor: 'var(--color-text-lighter)' }}
          >
            Coming Soon
          </span>
        ) : (
          <Link 
            href={`/guides/${slug}`} 
            className="guide-card__link"
            onClick={() => {
              // Set flag when navigating to a guide
              sessionStorage.setItem('fromGuide', 'true');
            }}
          >
            Read Guide
          </Link>
        )}
      </div>
    </article>
  );
}