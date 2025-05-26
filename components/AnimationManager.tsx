'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Add window augmentation for TypeScript
declare global {
  interface Window {
    gsap: any;
  }
}

const AnimationManager = () => {
  const { theme } = useTheme();
  const isFuturistic = theme === 'futuristic';
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const dataBitsRef = useRef<HTMLDivElement[]>([]);
  
  // Handle the creation of futuristic particles
  useEffect(() => {
    if (!isFuturistic || typeof window === 'undefined') return;
    
    // Wait for the DOM to be fully loaded before adding elements
    setTimeout(() => {
      // Clean up any previous particles
      particlesRef.current.forEach(particle => {
        particle.remove();
      });
      particlesRef.current = [];
      
      // Create particle field container if it doesn't exist
      let particleField = document.querySelector('.particle-field');
      if (!particleField) {
        particleField = document.createElement('div');
        particleField.className = 'particle-field';
        (particleField as HTMLElement).style.position = 'fixed';
        (particleField as HTMLElement).style.top = '0';
        (particleField as HTMLElement).style.left = '0';
        (particleField as HTMLElement).style.width = '100%';
        (particleField as HTMLElement).style.height = '100%';
        (particleField as HTMLElement).style.pointerEvents = 'none';
        (particleField as HTMLElement).style.zIndex = '0';
        document.body.appendChild(particleField);
      }
      
      // Create particles
      const particleCount = 30;
      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.opacity = `${Math.random() * 0.5 + 0.1}`;
        particle.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.6)';
        particle.style.animationName = 'float, pulse';
        particle.style.animationDuration = `${Math.random() * 20 + 10}s, 8s`;
        particle.style.animationTimingFunction = 'ease-in-out, ease-in-out';
        particle.style.animationIterationCount = 'infinite, infinite';
        particle.style.animationDelay = `${Math.random() * 10}s, ${Math.random() * 2}s`;
        particleField.appendChild(particle);
        particlesRef.current.push(particle);
      }
      
      // Create circuit patterns
      if (!document.querySelector('.circuit-patterns')) {
        const circuitPatterns = document.createElement('div');
        circuitPatterns.className = 'circuit-patterns';
        (circuitPatterns as HTMLElement).style.position = 'fixed';
        (circuitPatterns as HTMLElement).style.top = '0';
        (circuitPatterns as HTMLElement).style.left = '0';
        (circuitPatterns as HTMLElement).style.width = '100%';
        (circuitPatterns as HTMLElement).style.height = '100%';
        (circuitPatterns as HTMLElement).style.pointerEvents = 'none';
        (circuitPatterns as HTMLElement).style.zIndex = '0';
        (circuitPatterns as HTMLElement).style.opacity = '0.07';
        (circuitPatterns as HTMLElement).style.background = 'linear-gradient(90deg, transparent 97%, rgba(0, 255, 255, 0.2) 3%), linear-gradient(rgba(0, 255, 255, 0.2) 3%, transparent 97%)';
        (circuitPatterns as HTMLElement).style.backgroundSize = '40px 40px';
        (circuitPatterns as HTMLElement).style.animation = 'circuitPulse 10s infinite linear';
        document.body.appendChild(circuitPatterns);
      }
      
      // Create scanlines effect
      if (!document.querySelector('.scanlines')) {
        const scanlines = document.createElement('div');
        scanlines.className = 'scanlines';
        (scanlines as HTMLElement).style.position = 'fixed';
        (scanlines as HTMLElement).style.top = '0';
        (scanlines as HTMLElement).style.left = '0';
        (scanlines as HTMLElement).style.width = '100%';
        (scanlines as HTMLElement).style.height = '100%';
        (scanlines as HTMLElement).style.pointerEvents = 'none';
        (scanlines as HTMLElement).style.zIndex = '9999';
        (scanlines as HTMLElement).style.opacity = '0.05';
        (scanlines as HTMLElement).style.background = 'linear-gradient(to bottom, rgba(0, 255, 255, 0) 50%, rgba(0, 255, 255, 0.1) 50%)';
        (scanlines as HTMLElement).style.backgroundSize = '100% 4px';
        (scanlines as HTMLElement).style.animation = 'scanlineAnimation 10s linear infinite';
        document.body.appendChild(scanlines);
      }
      
      // Create data stream elements
      let dataStream = document.querySelector('.data-stream');
      if (!dataStream) {
        dataStream = document.createElement('div');
        dataStream.className = 'data-stream';
        (dataStream as HTMLElement).style.position = 'fixed';
        (dataStream as HTMLElement).style.top = '0';
        (dataStream as HTMLElement).style.left = '0';
        (dataStream as HTMLElement).style.width = '100%';
        (dataStream as HTMLElement).style.height = '100%';
        (dataStream as HTMLElement).style.pointerEvents = 'none';
        (dataStream as HTMLElement).style.zIndex = '1';
        (dataStream as HTMLElement).style.opacity = '0.1';
        document.body.appendChild(dataStream);
      }
      
      // Create data bits
      const dataBitCount = 20;
      for (let i = 0; i < dataBitCount; i++) {
        const bit = document.createElement('div');
        bit.className = 'data-bit';
        bit.style.position = 'absolute';
        bit.style.left = `${Math.random() * 100}vw`;
        bit.style.height = `${Math.random() * 100 + 30}px`;
        bit.style.width = '1px';
        bit.style.backgroundColor = 'rgba(0, 255, 255, 0.7)';
        bit.style.boxShadow = '0 0 4px rgba(0, 255, 255, 0.8)';
        bit.style.opacity = `${Math.random() * 0.4 + 0.2}`;
        bit.style.animationName = 'dataFall';
        bit.style.animationDuration = `${Math.random() * 5 + 3}s`;
        bit.style.animationTimingFunction = 'linear';
        bit.style.animationIterationCount = 'infinite';
        bit.style.animationDelay = `${Math.random() * 3}s`;
        dataStream.appendChild(bit);
        dataBitsRef.current.push(bit);
      }
    }, 500); // Small delay to ensure DOM is ready
    
    return () => {
      // Clean up particles and effects when component unmounts or theme changes
      particlesRef.current.forEach(particle => particle.remove());
      dataBitsRef.current.forEach(bit => bit.remove());
      particlesRef.current = [];
      dataBitsRef.current = [];
      
      const elementsToRemove = [
        '.particle-field',
        '.circuit-patterns',
        '.scanlines',
        '.data-stream'
      ];
      
      elementsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.remove();
      });
    };
  }, [isFuturistic]);

  // GSAP animations for all themes
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
          
          // Add glitch effect only to h1 headings in futuristic theme
          if (isFuturistic && heading.tagName.toLowerCase() === 'h1') {
            heading.classList.add('glitch-text');
            heading.setAttribute('data-text', heading.textContent || '');
          }
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

        // Add basic card effects to sections
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
        
        // Header elements fade on scroll
        const fadeHeader = () => {
          const headerElements = document.querySelector('.header-elements');
          if (headerElements) {
            const scrollY = window.scrollY;
            const opacity = Math.max(0, 1 - scrollY / 200);
            (headerElements as HTMLElement).style.opacity = opacity.toString();
          }
        };
        
        window.addEventListener('scroll', fadeHeader);
        fadeHeader(); // Initialize on load
        
      } catch (error) {
        console.error('Error loading GSAP:', error);
      }
    };

    gsapSetup();

    // Clean up function
    return () => {
      if (typeof window !== 'undefined') {
        if (window.gsap && window.gsap.ScrollTrigger) {
          window.gsap.ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
        }
        window.removeEventListener('scroll', () => {});
      }
    };
  }, [isFuturistic]);

  // This component doesn't render anything visible
  return null;
};

export default AnimationManager;
