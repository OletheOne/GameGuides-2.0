'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function TableOfContents({ sections }) {
  const [activeSection, setActiveSection] = useState('');
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100;
      
      // Find the current section based on scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial check
    handleScroll();
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);
  
  return (
    <div className="toc" id="toc">
      <h3 className="toc__title">In This Guide</h3>
      <ul className="toc__list">
        {sections.map((section) => (
          <li key={section.id} className="toc__item">
            <Link
              href={`#${section.id}`}
              className={`toc__link ${activeSection === section.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                
                const targetElement = document.getElementById(section.id);
                if (targetElement) {
                  window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              {section.title}
            </Link>
            
            {section.subsections && section.subsections.length > 0 && (
              <ul>
                {section.subsections.map((subsection) => (
                  <li key={subsection.id}>
                    <Link
                      href={`#${subsection.id}`}
                      className={`toc__link ${activeSection === subsection.id ? 'active' : ''}`}
                      onClick={(e) => {
                        e.preventDefault();
                        
                        const targetElement = document.getElementById(subsection.id);
                        if (targetElement) {
                          window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                          });
                        }
                      }}
                    >
                      {subsection.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}