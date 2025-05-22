'use client';

import dynamic from 'next/dynamic';

// Dynamically import the LoadingAnimation component with SSR disabled
const LoadingAnimation = dynamic(() => import('./LoadingAnimation'), {
  ssr: false
});

const LoadingAnimationWrapper = () => {
  return <LoadingAnimation />;
};

export default LoadingAnimationWrapper;
