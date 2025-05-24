'use client';

import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/context/ThemeContext';

interface MusicPlayerProps {
  showVolumeControl?: boolean;
  iconOnly?: boolean;
}

const MusicPlayer = ({ showVolumeControl = true, iconOnly = false }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [showPlayer, setShowPlayer] = useState(true);

  // Mechanical keyboard typing sound (royalty-free)
  const ambientTrack = '/sounds/nature.mp3';

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Handle scroll to show/hide the player (synced with the menu behavior)
  useEffect(() => {
    const handleScroll = () => {
      // Only show when scrollY is less than 100px (at the top)
      setShowPlayer(window.scrollY < 100);
    };

    // Set initial state
    handleScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle autoplay restrictions
  useEffect(() => {
    if (audioRef.current) {
      // Set a fixed volume (no volume control)
      audioRef.current.volume = 0.3;
      // Most browsers require user interaction before playing audio
      // We'll start with audio paused and let the user start it
      audioRef.current.pause();
    }
  }, []);

  const { theme } = useTheme();
  
  // Set button styles based on theme
  const buttonClass = theme === 'newspaper'
    ? "flex items-center justify-center w-6 h-6 rounded-sm text-[#503822] hover:bg-[#f8e1c2] focus:outline-none transition-all duration-300"
    : "flex items-center justify-center w-6 h-6 rounded-sm text-[#00ffff] hover:bg-[rgba(0,255,255,0.1)] focus:outline-none transition-all duration-300 music-glow-effect";
    
  return (
    <div className={`transition-opacity duration-300 ${showPlayer ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="flex items-center">
        <button
          onClick={togglePlay}
          className={buttonClass}
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          disabled={!showPlayer}
        >
          {theme === 'newspaper' ? (
            // Newspaper theme icons
            isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )
          ) : (
            // Futuristic theme icons
            isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347c-.75.412-1.667-.13-1.667-.986V5.653Z" />
              </svg>
            )
          )}
        </button>
        
        {showVolumeControl && !iconOnly && (
          <input 
            type="range" 
            min="0" 
            max="1" 
            step="0.01" 
            value="0.3" 
            className="ml-2 w-20"
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.volume = parseFloat(e.target.value);
              }
            }} 
          />
        )}
      </div>
      
      <audio
        ref={audioRef}
        src={ambientTrack}
        loop
        preload="metadata"
      />
    </div>
  );
};

export default MusicPlayer;
