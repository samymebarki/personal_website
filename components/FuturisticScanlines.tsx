'use client';

import { useEffect } from 'react';
import { useTheme } from '@/context/ThemeContext';

export default function FuturisticScanlines() {
  const { theme } = useTheme();
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Only create scanlines in futuristic theme
    if (theme === 'futuristic') {
      // Check if scanlines already exist
      let scanlines = document.getElementById('futuristic-scanlines');
      
      // Create scanlines if they don't exist
      if (!scanlines) {
        scanlines = document.createElement('div');
        scanlines.id = 'futuristic-scanlines';
        scanlines.style.position = 'fixed';
        scanlines.style.top = '0';
        scanlines.style.left = '0';
        scanlines.style.width = '100%';
        scanlines.style.height = '100%';
        scanlines.style.background = 'linear-gradient(to bottom, rgba(0, 255, 255, 0) 50%, rgba(0, 255, 255, 0.05) 50%)';
        scanlines.style.backgroundSize = '100% 4px';
        scanlines.style.pointerEvents = 'none';
        scanlines.style.zIndex = '9999';
        scanlines.style.opacity = '0.15';
        document.body.appendChild(scanlines);
      }
    } else {
      // Remove scanlines when not in futuristic theme
      const scanlines = document.getElementById('futuristic-scanlines');
      if (scanlines) scanlines.remove();
    }
    
    return () => {
      // Clean up
      const scanlines = document.getElementById('futuristic-scanlines');
      if (scanlines) scanlines.remove();
    };
  }, [theme]);
  
  return null;
}
