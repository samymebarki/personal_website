"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import { motion } from 'framer-motion';
import styles from './ThemeToggle.module.css';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  // Only render the toggle after component has mounted to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Handle button appearance based on current theme
  const buttonClass = theme === 'newspaper' 
    ? "flex items-center justify-center w-6 h-6 rounded-sm text-[#503822] hover:bg-[#f8e1c2] focus:outline-none transition-all duration-300"
    : "flex items-center justify-center w-6 h-6 rounded-sm text-[#00ffff] hover:bg-[rgba(0,255,255,0.1)] focus:outline-none transition-all duration-300 glow-effect";
  
  if (!mounted) return null;
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={buttonClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.1 }}
      aria-label={`Switch to ${theme === 'newspaper' ? 'futuristic' : 'newspaper'} theme`}
    >
      {theme === 'newspaper' ? (
        // Enhanced Futuristic/Digital icon with more tech details
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" />
          <path d="M7 12h10" />
          <path d="M12 7v10" />
          <circle cx="7" cy="7" r="1" fill="currentColor" />
          <circle cx="17" cy="7" r="1" fill="currentColor" />
          <circle cx="7" cy="17" r="1" fill="currentColor" />
          <circle cx="17" cy="17" r="1" fill="currentColor" />
          <path d="M3 9h2" />
          <path d="M3 15h2" />
          <path d="M19 9h2" />
          <path d="M19 15h2" />
        </svg>
      ) : (
        // Newspaper/Classic icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
          <path d="M18 14h-8" />
          <path d="M15 18h-5" />
          <path d="M10 6h8v4h-8V6Z" />
        </svg>
      )}
    </motion.button>
  );
}
