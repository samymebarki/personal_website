'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Function to create cyber particles
const createParticles = (count: number) => {
  return Array.from({ length: count }).map(() => ({
    size: 2 + Math.random() * 3, // Size between 2-5px for better visibility
    left: Math.random() * 100, // Position across screen
    top: Math.random() * 100,
    delay: Math.random() * 10, // Random animation delay
    duration: 15 + Math.random() * 10 // Animation duration
  }));
};

export default function NewFuturisticEffects() {
  const { theme } = useTheme();
  const isFuturistic = theme === 'futuristic';
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  
  // Handle direct DOM manipulation for particles
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only run in futuristic theme
    if (isFuturistic) {
      setMounted(true);
      
      // Direct DOM approach for particles
      const particleContainer = document.createElement('div');
      particleContainer.id = 'cyber-particles-container';
      particleContainer.style.position = 'fixed';
      particleContainer.style.top = '0';
      particleContainer.style.left = '0';
      particleContainer.style.width = '100%';
      particleContainer.style.height = '100%';
      particleContainer.style.pointerEvents = 'none';
      particleContainer.style.zIndex = '1';
      document.body.appendChild(particleContainer);
      
      // Create particles directly in DOM
      const particleCount = 20;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        const size = 2 + Math.random() * 3;
        
        particle.className = 'cyber-particle';
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.backgroundColor = '#00d8ff';
        particle.style.borderRadius = '50%';
        particle.style.opacity = '0.4';
        particle.style.boxShadow = '0 0 6px #00d8ff';
        particle.style.zIndex = '10'; // Set as string for DOM style property
        
        // Animation styles
        const duration = (15 + Math.random() * 10).toFixed(2);
        const delay = (Math.random() * 10).toFixed(2);
        particle.style.animation = `particleDrift ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        particleContainer.appendChild(particle);
      }
      
      // Setup header fading
      const handleScroll = () => {
        const scrollY = window.scrollY;
        const headerElements = document.querySelector('.header-elements');
        if (headerElements) {
          (headerElements as HTMLElement).style.opacity = String(Math.max(0, 1 - scrollY / 200));
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      handleScroll(); // Initialize opacity on load
      
      return () => {
        // Clean up
        const container = document.getElementById('cyber-particles-container');
        if (container) container.remove();
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isFuturistic]);
  
  // This component doesn't render UI directly anymore
  return null;
}
