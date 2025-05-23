'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, Menu, Home, User, Code, Mail, ChevronRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import Image from 'next/image';

const menuItems = [
  { name: 'Home', href: '#home', icon: <Home className="w-5 h-5 md:w-6 md:h-6" /> },
  { name: 'About', href: '#about', icon: <User className="w-5 h-5 md:w-6 md:h-6" /> },
  { name: 'Projects', href: '#projects', icon: <Code className="w-5 h-5 md:w-6 md:h-6" /> },
  { name: 'Contact', href: '#contact', icon: <Mail className="w-5 h-5 md:w-6 md:h-6" /> },
];

export default function HamburgerMenu() {
  const { isOpen, toggleMenu } = useMenu();
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const textureRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (textureRef.current) {
      setIsLoaded(true);
    }

    // Handle scroll to show/hide header elements
    const handleScroll = () => {
      // Only show when scrollY is less than 100px (essentially at the top)
      setShowHeader(window.scrollY < 100);
    };

    // Set initial state
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = () => {
    toggleMenu();
  };

  const itemVariants = {
    closed: { 
      opacity: 0,
      y: 20,
    },
    open: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: 'spring', 
        stiffness: 300, 
        damping: 24 
      } 
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  const menuVariants = {
    closed: {
      clipPath: 'inset(0 0 100% 0)',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.5
      }
    },
    open: {
      clipPath: 'inset(0 0 0% 0)',
      transition: {
        type: 'spring',
        bounce: 0,
        duration: 0.7,
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  return (
    <div className="relative z-50" ref={textureRef}>
      {/* Logo in the top left - only visible at top of page */}
      <div 
        className={`fixed top-14 left-6 z-50 transition-opacity duration-300 ${showHeader ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
      >
        <Image 
          src="/images/logo.png" 
          alt="Samy Mebarki Logo" 
          width={40} 
          height={40}
          className="object-contain"
        />
      </div>
    </div>
  );
}
