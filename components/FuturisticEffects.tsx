'use client';

import { useEffect, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';

// Generate particle data on the client side only
function generateParticles(count: number) {
  return Array.from({ length: count }).map(() => ({
    size: 1 + Math.random() * 3,
    left: Math.random() * 100,
    top: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.5,
    duration: 10 + Math.random() * 20,
    delay: Math.random() * 10,
    pulseDelay: Math.random() * 2
  }));
}

// Generate data bits for the data stream effect
function generateDataBits(count: number) {
  return Array.from({ length: count }).map(() => ({
    left: Math.random() * 100,
    height: 30 + Math.random() * 100,
    opacity: 0.2 + Math.random() * 0.4,
    duration: 3 + Math.random() * 5,
    delay: Math.random() * 3
  }));
}

export default function FuturisticEffects() {
  const { theme } = useTheme();
  const isFuturistic = theme === 'futuristic';
  const [mounted, setMounted] = useState(false);
  const [particles, setParticles] = useState<any[]>([]);
  const [dataBits, setDataBits] = useState<any[]>([]);
  
  // Only run on client-side and only when using futuristic theme
  useEffect(() => {
    if (isFuturistic) {
      setMounted(true);
      setParticles(generateParticles(30));
      setDataBits(generateDataBits(20));
    }
    
    return () => {
      setMounted(false);
      setParticles([]);
      setDataBits([]);
    };
  }, [isFuturistic]);
  
  if (!mounted || !isFuturistic) return null;
  
  return (
    <>
      {/* Particle field with improved visibility */}
      <div className="particle-field" style={{ zIndex: 1 }}>
        {particles.map((particle, i) => (
          <div 
            key={i}
            className="particle"
            style={{
              position: 'absolute',
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              left: `${particle.left}vw`,
              top: `${particle.top}vh`,
              backgroundColor: 'rgba(0, 255, 255, 0.3)',
              borderRadius: '50%',
              opacity: particle.opacity,
              boxShadow: '0 0 8px rgba(0, 255, 255, 0.6)',
              animation: `float ${particle.duration}s infinite ease-in-out, pulse 8s infinite ease-in-out`,
              animationDelay: `${particle.delay}s, ${particle.pulseDelay}s`,
            }}
          />
        ))}
      </div>
      
      {/* Circuit grid pattern with improved visibility */}
      <div 
        className="circuit-patterns" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 0,
          opacity: 0.07,
          background: 'linear-gradient(90deg, transparent 97%, rgba(0, 255, 255, 0.2) 3%), linear-gradient(rgba(0, 255, 255, 0.2) 3%, transparent 97%)',
          backgroundSize: '40px 40px',
          animation: 'circuitPulse 10s infinite linear'
        }}
      />
      
      <div className="scanlines" 
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: 0.05,
          background: 'linear-gradient(to bottom, rgba(0, 255, 255, 0) 50%, rgba(0, 255, 255, 0.1) 50%)',
          backgroundSize: '100% 4px',
          animation: 'scanlineAnimation 10s linear infinite'
        }}
      />
      
      {/* Data stream with improved visibility */}
      <div 
        className="data-stream"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0.1
        }}
      >
        {dataBits.map((bit, i) => (
          <div 
            key={i}
            className="data-bit"
            style={{
              position: 'absolute',
              left: `${bit.left}vw`,
              height: `${bit.height}px`,
              width: '1px',
              backgroundColor: 'rgba(0, 255, 255, 0.7)',
              boxShadow: '0 0 4px rgba(0, 255, 255, 0.8)',
              opacity: bit.opacity,
              animation: `dataFall ${bit.duration}s linear infinite`,
              animationDelay: `${bit.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
