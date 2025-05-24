'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { useMenu } from '../context/MenuContext';
import { useTheme } from '../context/ThemeContext';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

export default function CustomAnimatedCursor() {
  const { isOpen } = useMenu();
  const { theme } = useTheme();
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window !== 'undefined') {
      // Initial check
      setIsMobile(window.innerWidth <= 768);

      // Add event listener for window resize
      const handleResize = () => {
        setIsMobile(window.innerWidth <= 768);
      };

      window.addEventListener('resize', handleResize);
      
      // Clean up event listener
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null;
  }

  return (
    <div ref={cursorRef}>
      <AnimatedCursor
        innerSize={8}
        outerSize={35}
        innerScale={1}
        outerScale={1.7}
        outerAlpha={0}
        innerStyle={{
          backgroundColor: theme === 'futuristic' 
            ? (isOpen ? '#64ffda' : '#00ffff') 
            : (isOpen ? '#f8e1c2' : '#503822'),
          boxShadow: theme === 'futuristic' 
            ? '0 0 10px #00ffff, 0 0 20px rgba(0, 255, 255, 0.3)' 
            : 'none'
        }}
        outerStyle={{
          border: theme === 'futuristic'
            ? `3px solid ${isOpen ? '#64ffda' : '#00ffff'}`
            : `3px solid ${isOpen ? '#f8e1c2' : '#503822'}`,
          boxShadow: theme === 'futuristic' 
            ? '0 0 15px rgba(0, 255, 255, 0.3)' 
            : 'none'
        }}
        clickables={[
          'a',
          'button',
          '.link',
          {
            target: '.custom-cursor-target',
            outerScale: 2,
            innerScale: 0.7
          }
        ]}
      />
    </div>
  );
}