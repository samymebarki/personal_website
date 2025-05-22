'use client';

import dynamic from 'next/dynamic';

// Dynamically import the AnimationManager with SSR disabled
const AnimationManager = dynamic(() => import('./AnimationManager'), {
  ssr: false,
});

export default function AnimationManagerWrapper() {
  return <AnimationManager />;
}
