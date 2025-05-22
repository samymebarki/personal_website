'use client';

import { useState, useEffect } from 'react';

const NewspaperFold = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Fold styles with subtle shadows
  const getHorizontalFoldStyle = (position: number) => {
    const baseOpacity = 0.1; // Base opacity
    const maxOpacity = 0.25; // Max opacity when scrolled
    
    // Calculate opacity based on scroll position
    const percentComplete = Math.min(1, scrollPosition / 1000);
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * percentComplete;
    
    return {
      position: 'fixed' as const,
      left: 0,
      top: `${position}vh`,
      width: '100%',
      height: '1px',
      background: '#503822',
      opacity,
      boxShadow: `0 1px 3px rgba(80, 56, 34, ${opacity / 2})`,
      zIndex: 5,
      pointerEvents: 'none' as const
    };
  };
  
  // Vertical fold style
  const getVerticalFoldStyle = () => {
    const baseOpacity = 0.1; // Base opacity
    const maxOpacity = 0.25; // Max opacity when scrolled
    
    // Calculate opacity based on scroll position
    const percentComplete = Math.min(1, scrollPosition / 1000);
    const opacity = baseOpacity + (maxOpacity - baseOpacity) * percentComplete;
    
    return {
      position: 'fixed' as const,
      left: '50%',
      top: 0,
      width: '1px',
      height: '100vh',
      background: '#503822',
      opacity,
      boxShadow: `1px 0 3px rgba(80, 56, 34, ${opacity / 2})`,
      zIndex: 5,
      pointerEvents: 'none' as const
    };
  };
  
  return (
    <>
      {/* Horizontal fold lines - positioned to not interfere with header elements */}
      <div style={getHorizontalFoldStyle(40)} />
      <div style={getHorizontalFoldStyle(70)} />
      
      {/* Vertical fold line - z-index adjusted to not interfere with header elements */}
      <div style={{...getVerticalFoldStyle(), zIndex: 5}} />
    </>
  );
};

export default NewspaperFold;
