'use client';

import dynamic from 'next/dynamic';
import { useRef, useEffect, useState } from 'react';
import { useMenu } from '../context/MenuContext';

const AnimatedCursor = dynamic(() => import('react-animated-cursor'), { ssr: false });

export default function CustomAnimatedCursor() {
  const { isOpen } = useMenu();
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
          backgroundColor: isOpen ? '#f8e1c2' : '#503822',
        }}
        outerStyle={{
          border: `3px solid ${isOpen ? '#f8e1c2' : '#503822'}`,
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