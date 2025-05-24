"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'newspaper' | 'futuristic';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('newspaper');
  const [mounted, setMounted] = useState(false);
  
  // Toggle between themes
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'newspaper' ? 'futuristic' : 'newspaper');
  };

  // Mark component as mounted to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Apply theme class to both html and body elements
  useEffect(() => {
    if (!mounted) return;
    
    const root = document.documentElement;
    const body = document.body;
    
    // Remove existing theme classes
    root.classList.remove('newspaper-theme', 'futuristic-theme');
    body.classList.remove('newspaper-theme', 'futuristic-theme');
    
    // Add new theme class
    root.classList.add(`${theme}-theme`);
    body.classList.add(`${theme}-theme`);
    
    // Store theme preference in localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Load theme preference from localStorage on initial render
  useEffect(() => {
    if (!mounted) return;
    
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    if (savedTheme && (savedTheme === 'newspaper' || savedTheme === 'futuristic')) {
      setTheme(savedTheme);
    }
  }, [mounted]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
