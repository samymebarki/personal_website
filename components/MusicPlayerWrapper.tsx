'use client';

import dynamic from 'next/dynamic';

interface MusicPlayerWrapperProps {
  showVolumeControl?: boolean;
  iconOnly?: boolean;
}

// Dynamically import MusicPlayer with SSR disabled to avoid hydration issues
const MusicPlayer = dynamic(() => import('./MusicPlayer'), {
  ssr: false,
  loading: () => (
    <div className="fixed text-[#503822]" />
  ),
});

export default function MusicPlayerWrapper({ showVolumeControl = true, iconOnly = false }: MusicPlayerWrapperProps) {
  return <MusicPlayer showVolumeControl={showVolumeControl} iconOnly={iconOnly} />;
}
