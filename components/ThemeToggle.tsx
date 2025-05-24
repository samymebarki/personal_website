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
    ? "flex items-center gap-2 py-1 px-3 rounded-md  text-[#503822] border border-[#503822] hover:bg-[#503822] hover:text-[#f8e1c2] focus:outline-none transition-all duration-300"
    : "flex items-center gap-2 py-1 px-3 rounded-md bg-black/40 backdrop-blur-sm text-[#00ffff] border border-[#00ffff]/40 hover:bg-[#00ffff]/20 focus:outline-none transition-all duration-300 shadow-[0_0_5px_rgba(0,255,255,0.3)]";
  
  if (!mounted) return null;
  
  return (
    <motion.button
      onClick={toggleTheme}
      className={buttonClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.05 }}
      aria-label={`Switch to ${theme === 'newspaper' ? 'futuristic' : 'newspaper'} theme`}
    >
      {theme === 'newspaper' ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M7 12h10" />
            <path d="M12 7v10" />
            <circle cx="7" cy="7" r="1" fill="currentColor" />
            <circle cx="17" cy="7" r="1" fill="currentColor" />
            <circle cx="7" cy="17" r="1" fill="currentColor" />
            <circle cx="17" cy="17" r="1" fill="currentColor" />
          </svg>
          <span className="font-medium text-sm">Go to Future</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
            <path d="M18 14h-8" />
            <path d="M15 18h-5" />
            <path d="M10 6h8v4h-8V6Z" />
          </svg>
          <span className="font-medium text-sm">Go to Past</span>
        </>
      )}
    </motion.button>
  );
}
