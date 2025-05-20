'use client';

import dynamic from 'next/dynamic';

// Dynamically import MusicPlayer with SSR disabled to avoid hydration issues
const MusicPlayer = dynamic(() => import('./MusicPlayer'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-4 right-4 z-50 w-10 h-10 bg-[#503822] bg-opacity-80 backdrop-blur-sm rounded-full p-2 shadow-lg" />
  ),
});

export default function MusicPlayerWrapper() {
  return <MusicPlayer />;
}
