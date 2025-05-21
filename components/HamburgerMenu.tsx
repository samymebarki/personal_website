'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { X, Menu, Home, User, Code, Mail, ChevronRight } from 'lucide-react';
import { useMenu } from '../context/MenuContext';

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
  const textureRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    if (textureRef.current) {
      setIsLoaded(true);
    }
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
      <button 
        onClick={toggleMenu}
        className="fixed top-14 right-6 z-50 p-2 rounded-full  text-[#503822] hover:bg-[#f8e1c2] transition-colors"
        aria-label={isOpen ? 'Close menu' : 'Open menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6 rounded-full text-[#f8e1c2] hover:bg-[#3a2a19] transition-colors" />
        ) : (
          <Menu className="w-6 h-6" />
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 flex items-center justify-center paper-overlay"
            style={{
              backgroundColor: isOpen ? '#503822' : 'transparent',
              opacity: isLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-in-out',
            }}
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
          >

            <motion.ul className="text-center space-y-8 relative z-10">
              {menuItems.map((item, index) => (
                <motion.li 
                  key={item.name}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="exit"
                  className="overflow-hidden relative group"
                >
                  <a 
                    href={item.href}
                    onClick={() => {
                      toggleMenu();
                    }}
                    className="text-4xl md:text-9xl font-['Chomsky'] text-[#efe0b4] hover:text-[#3a2a19] transition-all duration-300 block py-2 relative inline-block group relative overflow-hidden"
                  >
                    <span className="relative z-10">{item.name}</span>
                    <span className="absolute inset-0 h-0.5 bg-[#f8e1c2] top-1/2 transform -translate-y-1/2 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
