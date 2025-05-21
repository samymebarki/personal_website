'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import useMousePosition from '../utils/useMousePosition';

interface CursorEffectProps {
  children: React.ReactNode;
  className?: string;
}

export default function CursorEffect({ children, className = '' }: CursorEffectProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { x, y } = useMousePosition();
  const size = isHovered ? 400 : 40;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          WebkitMaskPosition: x && y ? `${x - size / 2}px ${y - size / 2}px` : '0 0',
          WebkitMaskSize: `${size}px`,
          WebkitMaskRepeat: 'no-repeat',
          maskImage: 'url(/mask.svg)',
          backgroundColor: '#503822',
        }}
        animate={{
          WebkitMaskPosition: x && y ? `${x - size / 2}px ${y - size / 2}px` : '0 0',
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: 'tween', ease: 'backOut', duration: 0.5 }}
      />
      
      <div 
        className="relative z-0"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {children}
      </div>
    </div>
  );
}
