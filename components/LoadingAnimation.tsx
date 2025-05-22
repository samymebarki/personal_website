'use client';

import { useEffect, useState, useRef } from 'react';

const LoadingAnimation = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const nameRef = useRef<HTMLDivElement>(null);
  
  // Exact 5-second ink filling animation
  useEffect(() => {
    const TOTAL_DURATION = 5000; // Exactly 5 seconds
    const startTime = Date.now();
    let animationFrameId: number;
    
    // Automatically hide the loading screen after animation completes
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, TOTAL_DURATION + 100); // Add a tiny buffer after animation
    
    // Animation frame function - uses a linear progression for perfect synchronization
    const updateProgress = () => {
      const elapsedTime = Date.now() - startTime;
      const linearProgress = Math.min(elapsedTime / TOTAL_DURATION, 1);
      
      // Simple linear progress to ensure perfect synchronization
      const progressValue = linearProgress * 100;
      
      // Update progress state
      setProgress(progressValue);
      
      // Continue animation until complete
      if (linearProgress < 1) {
        animationFrameId = requestAnimationFrame(updateProgress);
      }
    };
    
    // Start the animation
    animationFrameId = requestAnimationFrame(updateProgress);
    
    return () => {
      clearTimeout(loadingTimer);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  // Effect to animate the name filling
  useEffect(() => {
    if (nameRef.current) {
      const nameElement = nameRef.current;
      // Apply the fill style based on progress
      nameElement.style.setProperty('--fill-percentage', `${progress}%`);
    }
  }, [progress]);

  // Hide the loading animation after it's done
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[999] bg-[#f8e1c2] flex flex-col items-center justify-center">
      {/* Vintage texture overlay - using CSS instead of image */}
      <div className="absolute inset-0 opacity-10" style={{ 
        backgroundImage: `radial-gradient(#503822 0.5px, transparent 0.5px), radial-gradient(#503822 0.5px, #f8e1c2 0.5px)`,
        backgroundSize: `20px 20px`,
        backgroundPosition: `0 0, 10px 10px`
      }}></div>
      
      {/* Animated newspaper fold corners */}
      {/* <div className="absolute top-0 right-0 w-0 h-0 border-t-[100px] border-r-[100px] border-t-[#503822] border-r-transparent animate-fold-corner"></div>
      <div className="absolute bottom-0 left-0 w-0 h-0 border-b-[100px] border-l-[100px] border-b-[#503822] border-l-transparent animate-fold-corner-reverse"></div> */}
      
      {/* Main content container */}
      <div className="relative p-8 max-w-lg w-full">
        {/* Name with outline that fills with ink */}
        <div 
          ref={nameRef} 
          className="relative py-6 text-center" 
          style={{
            '--fill-percentage': '0%'
          } as React.CSSProperties}
        >
          <style jsx>{`
            .name-outline {
              color: transparent;
              -webkit-text-stroke: 2px #503822;
              position: relative;
              z-index: 2;
            }
            
            .name-fill {
              position: absolute;
              top: 0;
              left: 0;
              width: 100%;
              height: 100%;
              color: #503822;
              clip-path: inset(0 0 0 calc(100% - var(--fill-percentage)));
              z-index: 3;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            
            .name-container {
              position: relative;
              display: inline-block;
            }
          `}</style>
          
          <div className="name-container">
            <h1 className="name-outline text-7xl font-['Chomsky'] tracking-tight">
              Samy Mebarki
            </h1>
            <h1 className="name-fill text-7xl font-['Chomsky'] tracking-tight">
              Samy Mebarki
            </h1>
          </div>
          
          <div className="mt-4 text-sm font-serif text-[#503822] opacity-70">
            Printing the journal...
          </div>
        </div>
                {/* Progress bar - synchronized with name filling */}
        <div className="max-w-md mx-auto mt-8">
          <div className="h-1 w-full bg-[#f0e6d2] mb-2">
            <div 
              className="h-full bg-[#503822] transition-none"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Ink splatters - synchronized with progress */}
          <div className="relative h-8">
            {Array.from({ length: 10 }).map((_, i) => {
              // Calculate when this splatter should appear based on progress
              const appearAtProgress = (i * 10); // Evenly distribute across progress
              const isVisible = progress >= appearAtProgress;
              
              return (
                <div 
                  key={i}
                  className={`absolute w-2 h-2 rounded-full bg-[#503822] ${isVisible ? 'opacity-40' : 'opacity-0'}`}
                  style={{ 
                    left: `${(i * 10) % 100}%`, 
                    top: `${(i % 3) * 30 + 10}%`,
                    transform: `scale(${0.5 + (i % 3) * 0.5})`,
                    transition: 'opacity 0.2s ease-out'
                  }}
                />
              );
            })}
            <div className="text-right font-mono text-[#503822]">{Math.floor(progress)}%</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
