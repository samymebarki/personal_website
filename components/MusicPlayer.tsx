'use client';

import { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
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

  return (
    <div className={`fixed top-24 right-8 z-50 transition-opacity duration-300 ${showPlayer ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <button
          onClick={togglePlay}
          className="flex items-center justify-center rounded-full text-[#503822] hover:bg-[#f8e1c2] transition-colors"
          aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          disabled={!showPlayer}
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
          )}
        </button>
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
