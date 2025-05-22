'use client';

import { useState, useEffect } from 'react';

const InkSmudge = () => {
  const [smudges, setSmudges] = useState<Array<{id: number, x: number, y: number, size: number}>>([]);
  const [nextId, setNextId] = useState(1);
  
  const handleClick = (e: MouseEvent) => {
    // Don't add smudges when clicking on interactive elements
    if ((e.target as HTMLElement).tagName === 'BUTTON' || 
        (e.target as HTMLElement).tagName === 'A' ||
        (e.target as HTMLElement).closest('button') || 
        (e.target as HTMLElement).closest('a')) {
      return;
    }
    
    const size = Math.random() * 30 + 10; // Random size between 10-40px
    
    setSmudges(prev => [...prev, {
      id: nextId,
      x: e.pageX - size/2,
      y: e.pageY - size/2,
      size
    }]);
    
    setNextId(prev => prev + 1);
    
    // Limit to 10 smudges maximum
    if (smudges.length > 9) {
      setSmudges(prev => prev.slice(1));
    }
  };
  
  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [smudges.length]); // Re-add listener when smudges length changes
  
  return (
    <>
      {smudges.map(smudge => (
        <div 
          key={smudge.id}
          className="fixed pointer-events-none z-10 opacity-70 ink-smudge"
          style={{
            left: `${smudge.x}px`,
            top: `${smudge.y}px`,
            width: `${smudge.size}px`,
            height: `${smudge.size}px`,
            borderRadius: '50%',
            background: '#2a2a2a',
            transform: `rotate(${Math.random() * 360}deg) scale(${0.8 + Math.random() * 0.5})`,
            filter: 'blur(1px)',
            animation: 'fadeInOut 5s forwards'
          }}
        />
      ))}
      
      <style jsx>{`
        @keyframes fadeInOut {
          0% { opacity: 0; transform: scale(0.8); }
          10% { opacity: 0.7; transform: scale(1); }
          90% { opacity: 0.7; transform: scale(1); }
          100% { opacity: 0; transform: scale(0.9); }
        }
      `}</style>
    </>
  );
};

export default InkSmudge;
