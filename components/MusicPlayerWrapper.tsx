'use client';

import dynamic from 'next/dynamic';

// Dynamically import MusicPlayer with SSR disabled to avoid hydration issues
const MusicPlayer = dynamic(() => import('./MusicPlayer'), {
  ssr: false,
  loading: () => (
    <div className="fixed top-24 right-6 z-50 text-[#503822]" />
  ),
});

export default function MusicPlayerWrapper() {
  return <MusicPlayer />;
}
