'use client';

import { useEffect } from 'react';

// Add window augmentation for TypeScript
declare global {
  interface Window {
    gsap: any;
  }
}

const AnimationManager = () => {
  useEffect(() => {
    // Only run animations on the client side
    if (typeof window === 'undefined') return;

    // Make sure GSAP is available
    const gsapSetup = async () => {
      try {
        // Dynamic import of GSAP
        const gsapModule = await import('gsap');
        const gsap = gsapModule.default;
        
        // Dynamic import of ScrollTrigger
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        // Add animation classes to elements
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        headings.forEach((heading, index) => {
          heading.classList.add('animate-fade-in');
          (heading as HTMLElement).style.animationDelay = `${index * 100 + 100}ms`;
          (heading as HTMLElement).style.opacity = '0';
        });

        // Add hover effects to links
        const links = document.querySelectorAll('a:not(.no-animation)');
        links.forEach(link => {
          link.classList.add('animated-underline');
        });

        // Add hover effects to list items
        const listItems = document.querySelectorAll('li:not(.no-animation)');
        listItems.forEach(item => {
          item.classList.add('hover-slide-right');
        });

        // Add card effects to sections
        const cards = document.querySelectorAll('.border:not(.no-animation)');
        cards.forEach(card => {
          card.classList.add('card-interactive');
        });

        // Animate paragraphs on scroll
        const paragraphs = document.querySelectorAll('p:not(.no-animation)');
        paragraphs.forEach((paragraph, index) => {
          gsap.fromTo(
            paragraph,
            { 
              y: 30, 
              opacity: 0 
            },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              scrollTrigger: {
                trigger: paragraph,
                start: 'top bottom-=100',
                toggleActions: 'play none none none',
              },
              delay: 0.1 * index
            }
          );
        });

        // Image hover effects
        const images = document.querySelectorAll('img:not(.no-animation)');
        images.forEach(image => {
          image.classList.add('hover-brighten');
          
          // Parent container needs relative positioning for hover effects
          if (image.parentElement) {
            (image.parentElement as HTMLElement).style.overflow = 'hidden';
          }
        });
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    gsapSetup();

    // Clean up function
    return () => {
      if (typeof window !== 'undefined' && window.gsap && window.gsap.ScrollTrigger) {
        window.gsap.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
      }
    };
  }, []);

  // This component doesn't render anything visible
  return null;
};

export default AnimationManager;
