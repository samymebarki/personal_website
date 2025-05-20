'use client';

import { useEffect, useState } from 'react';

export default function Loading() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Hide loading screen after 1.5 seconds
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-[#f8e1c2] z-50 flex items-center justify-center flex-col">
      <div className="relative w-24 h-24 mb-4">
        <div className="absolute inset-0 border-4 border-[#503822] border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-4 border-4 border-[#503822] border-b-transparent rounded-full animate-spin-reverse"></div>
      </div>
      <p className="text-[#503822] font-serif text-lg">Printing Journal...</p>
    </div>
  );
}
