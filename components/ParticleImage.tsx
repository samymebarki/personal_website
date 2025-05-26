'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

// Define Image constructor for TypeScript
declare global {
  interface Window {
    Image: {
      new(width?: number, height?: number): HTMLImageElement;
    }
  }
}

interface Particle {
  x: number;
  y: number;
  size: number;
  color: string;
  vx: number;
  vy: number;
  originalX: number;
  originalY: number;
}

interface ParticleImageProps {
  imageUrl: string;
  width: number;
  height: number;
  className?: string;
}

export default function ParticleImage({ imageUrl, width, height, className = '' }: ParticleImageProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);
  const mouseRef = useRef({ x: 0, y: 0, isOver: false });
  const scannerRef = useRef({
    position: 0,
    direction: 1, // 1 for down, -1 for up
    speed: 0.6, // Very slow scanner movement
  });
  
  // Initialize component on client-side only
  useEffect(() => {
    if (typeof window === 'undefined' || !imageUrl) return;
    
    // Load the image
    const img = new window.Image();
    img.crossOrigin = 'Anonymous';
    img.src = imageUrl;
    
    img.onload = () => {
      setIsLoaded(true);
      initCanvas(img);
    };
    
    img.onerror = () => {
      console.error('Error loading image');
    };
    
    // Mouse interaction handlers
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        mouseRef.current.x = e.clientX - rect.left;
        mouseRef.current.y = e.clientY - rect.top;
        mouseRef.current.isOver = true;
      }
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.isOver = false;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [imageUrl, width, height]);
  
  // Initialize canvas and start animation
  const initCanvas = (img: HTMLImageElement) => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Create temporary canvas for pixel data
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    if (!tempCtx) return;
    
    // Draw the image on temp canvas
    tempCtx.drawImage(img, 0, 0, width, height);
    
    // Get pixel data
    const imageData = tempCtx.getImageData(0, 0, width, height);
    
    // Create particles from image pixels
    const particles: Particle[] = [];
    const spacing = 4; // Lower number = more particles
    
    for (let y = 0; y < height; y += spacing) {
      for (let x = 0; x < width; x += spacing) {
        const i = (y * width + x) * 4;
        
        // Skip transparent or very dark pixels
        if (imageData.data[i+3] < 128 || 
            (imageData.data[i] + imageData.data[i+1] + imageData.data[i+2]) < 30) {
          continue;
        }
        
        particles.push({
          x, 
          y,
          originalX: x,
          originalY: y,
          size: 1.5,
          color: `rgba(${imageData.data[i]},${imageData.data[i+1]},${imageData.data[i+2]},${imageData.data[i+3]/255})`,
          vx: 0,
          vy: 0
        });
      }
    }
    
    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Update scanner position
      scannerRef.current.position += scannerRef.current.direction * scannerRef.current.speed;
      
      // Reverse direction when scanner hits edge
      if (scannerRef.current.position <= 0) {
        scannerRef.current.direction = 1; // Move down
        scannerRef.current.position = 0;
      } else if (scannerRef.current.position >= height) {
        scannerRef.current.direction = -1; // Move up
        scannerRef.current.position = height;
      }
      
      // First, draw the full original image
      ctx.drawImage(img, 0, 0, width, height);
      // Add a clip region for parts below scanner line
      ctx.save();
      ctx.beginPath();
      ctx.rect(0, scannerRef.current.position, width, height - scannerRef.current.position);
      ctx.clip();
      
      // Clear the area below scanner line
      ctx.clearRect(0, scannerRef.current.position, width, height);
      
      // Draw particles below scanner line
      particles.forEach(particle => {
        // Skip particles above scanner line
        if (particle.originalY < scannerRef.current.position) return;
        
        // Mouse interaction
        let dx = particle.x - mouseRef.current.x;
        let dy = particle.y - mouseRef.current.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (mouseRef.current.isOver && distance < 50) {
          // Repel particles from mouse
          const force = (50 - distance) / 50;
          particle.vx += dx * force * 0.01;
          particle.vy += dy * force * 0.01;
        } else {
          // Move toward original position
          dx = particle.originalX - particle.x;
          dy = particle.originalY - particle.y;
          particle.vx += dx * 0.05;
          particle.vy += dy * 0.05;
        }
        
        // Apply damping
        particle.vx *= 0.95;
        particle.vy *= 0.95;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        
        // Draw particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.restore();
      
      // Draw scanner line on top of everything
      ctx.fillStyle = 'rgba(0, 255, 255, 0.7)';
      ctx.fillRect(0, scannerRef.current.position - 1, width, 2);
      
      // Add glow effect to scanner line
      const gradient = ctx.createLinearGradient(
        0, scannerRef.current.position - 10,
        0, scannerRef.current.position + 10
      );
      gradient.addColorStop(0, 'rgba(0, 255, 255, 0)');
      gradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.4)');
      gradient.addColorStop(1, 'rgba(0, 255, 255, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, scannerRef.current.position - 10, width, 20);
      
      // Continue animation
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Start animation
    animationRef.current = requestAnimationFrame(animate);
  };
  
  return (
    <div className={`relative ${className}`} style={{ width, height, overflow: 'hidden' }}>
      
      {/* Canvas for particle animation */}
      <canvas 
        ref={canvasRef} 
        className="absolute top-0 left-0 w-full h-full"
      />
      
      {/* Show original image while loading */}
      {!isLoaded && (
        <div className="absolute top-0 left-0 w-full h-full">
          <Image 
            src={imageUrl}
            alt="Loading particle effect"
            width={width}
            height={height}
            className="w-full h-full object-cover"
            priority
          />
        </div>
      )}
    </div>
  );
}
