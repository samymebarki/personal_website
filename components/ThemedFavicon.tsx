'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function ThemedFavicon() {
  const { theme } = useTheme();

  useEffect(() => {
    // Change favicon based on current theme
    const faviconLink = document.querySelector('link[rel="icon"]') as HTMLLinkElement;
    const appleTouchIcon = document.querySelector('link[rel="apple-touch-icon"]') as HTMLLinkElement;

    if (faviconLink) {
      faviconLink.href = theme === 'futuristic' 
        ? '/images/logo-futuristic.png' 
        : '/images/logo.png';
    }
    
    if (appleTouchIcon) {
      appleTouchIcon.href = theme === 'futuristic' 
        ? '/images/logo-futuristic.png' 
        : '/images/logo.png';
    }
  }, [theme]);

  // This component doesn't render anything visually
  return null;
}
