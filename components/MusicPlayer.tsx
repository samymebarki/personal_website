'use client';

import { useState, useEffect, useRef } from 'react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState(0.5);

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

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  // Set initial volume and handle autoplay restrictions
  useEffect(() => {
    if (audioRef.current) {
      // Start with lower volume for keyboard sounds
      audioRef.current.volume = 0.3;
      setVolume(0.2);
      // Most browsers require user interaction before playing audio
      // We'll start with audio paused and let the user start it
      audioRef.current.pause();
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-[#503822] bg-opacity-80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <div className="flex items-center space-x-3">
          <button
            onClick={togglePlay}
            className="w-10 h-10 rounded-full bg-[#f8e1c2] flex items-center justify-center text-[#503822] hover:bg-white transition-colors"
            aria-label={isPlaying ? 'Pause ambient music' : 'Play ambient music'}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </button>
          <div className="w-24">
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full h-1.5 bg-[#f8e1c2] rounded-lg appearance-none cursor-pointer"
              aria-label="Volume control"
            />
          </div>
        </div>
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
