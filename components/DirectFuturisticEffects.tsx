'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function DirectFuturisticEffects() {
  const { theme } = useTheme();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only apply effects when using futuristic theme
    const isFuturistic = theme === 'futuristic';
    const html = document.documentElement;
    
    if (isFuturistic) {
      // Create particle field
      const particleField = document.createElement('div');
      particleField.id = 'particle-field';
      particleField.style.position = 'fixed';
      particleField.style.top = '0';
      particleField.style.left = '0';
      particleField.style.width = '100%';
      particleField.style.height = '100%';
      particleField.style.pointerEvents = 'none';
      particleField.style.zIndex = '1';
      document.body.appendChild(particleField);
      
      // Create particles
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 3 + 1;
        
        particle.className = 'futuristic-particle';
        particle.style.position = 'absolute';
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.backgroundColor = 'rgba(0, 255, 255, 0.3)';
        particle.style.borderRadius = '50%';
        particle.style.boxShadow = '0 0 8px rgba(0, 255, 255, 0.6)';
        
        // Add float animation
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 10;
        particle.style.animation = `float ${duration}s infinite ease-in-out`;
        particle.style.animationDelay = `${delay}s`;
        
        particleField.appendChild(particle);
      }
      
      // Create grid overlay
      const gridOverlay = document.createElement('div');
      gridOverlay.id = 'grid-overlay';
      gridOverlay.style.position = 'fixed';
      gridOverlay.style.top = '0';
      gridOverlay.style.left = '0';
      gridOverlay.style.width = '100%';
      gridOverlay.style.height = '100%';
      gridOverlay.style.pointerEvents = 'none';
      gridOverlay.style.zIndex = '0';
      gridOverlay.style.backgroundImage = 'linear-gradient(rgba(0, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 255, 255, 0.05) 1px, transparent 1px)';
      gridOverlay.style.backgroundSize = '50px 50px';
      gridOverlay.style.opacity = '0.3';
      document.body.appendChild(gridOverlay);
      
      // Create data stream
      const dataStream = document.createElement('div');
      dataStream.id = 'data-stream';
      dataStream.style.position = 'fixed';
      dataStream.style.top = '0';
      dataStream.style.left = '0';
      dataStream.style.width = '100%';
      dataStream.style.height = '100%';
      dataStream.style.pointerEvents = 'none';
      dataStream.style.zIndex = '1';
      document.body.appendChild(dataStream);
      
      // Create data bits
      for (let i = 0; i < 20; i++) {
        const bit = document.createElement('div');
        bit.className = 'data-bit';
        bit.style.position = 'absolute';
        bit.style.left = `${Math.random() * 100}vw`;
        bit.style.top = '0';
        bit.style.height = `${Math.random() * 100 + 30}px`;
        bit.style.width = '1px';
        bit.style.backgroundColor = 'rgba(0, 255, 255, 0.7)';
        bit.style.boxShadow = '0 0 4px rgba(0, 255, 255, 0.8)';
        
        // Add fall animation
        const duration = Math.random() * 5 + 3;
        bit.style.animation = `dataFall ${duration}s infinite linear`;
        bit.style.animationDelay = `${Math.random() * 3}s`;
        
        dataStream.appendChild(bit);
      }
      
      // Add scanlines
      const scanlines = document.createElement('div');
      scanlines.id = 'scanlines';
      scanlines.style.position = 'fixed';
      scanlines.style.top = '0';
      scanlines.style.left = '0';
      scanlines.style.width = '100%';
      scanlines.style.height = '100%';
      scanlines.style.pointerEvents = 'none';
      scanlines.style.zIndex = '999';
      scanlines.style.opacity = '0.05';
      scanlines.style.background = 'linear-gradient(to bottom, rgba(0, 255, 255, 0) 50%, rgba(0, 255, 255, 0.1) 50%)';
      scanlines.style.backgroundSize = '100% 4px';
      scanlines.style.animation = 'scanlineAnimation 10s linear infinite';
      document.body.appendChild(scanlines);
      
      // Add CSS for animations
      const style = document.createElement('style');
      style.textContent = `
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          25% { transform: translateY(-20px) rotate(5deg); }
          50% { transform: translateY(0) rotate(0deg); }
          75% { transform: translateY(20px) rotate(-5deg); }
        }
        
        @keyframes dataFall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes scanlineAnimation {
          0% { background-position: 0 0; }
          100% { background-position: 0 100%; }
        }
      `;
      document.head.appendChild(style);
      
      // 3D effects for sections and articles
      const sections = document.querySelectorAll('section, article');
      sections.forEach(section => {
        (section as HTMLElement).style.transition = 'all 0.3s ease';
        (section as HTMLElement).style.transformStyle = 'preserve-3d';
        (section as HTMLElement).style.perspective = '1000px';
      });
    } else {
      // Clean up futuristic effects when theme changes
      const elementsToRemove = ['#particle-field', '#grid-overlay', '#data-stream', '#scanlines'];
      elementsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.remove();
      });
    }
    
    return () => {
      // Clean up when component unmounts
      const elementsToRemove = ['#particle-field', '#grid-overlay', '#data-stream', '#scanlines'];
      elementsToRemove.forEach(selector => {
        const element = document.querySelector(selector);
        if (element) element.remove();
      });
    };
  }, [theme]);
  
  return null;
}
