'use client';

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';

interface ThemedImageProps {
  defaultSrc: string;
  futuristicSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
}

export default function ThemedImage({
  defaultSrc,
  futuristicSrc,
  alt,
  width,
  height,
  className = '',
}: ThemedImageProps) {
  const { theme } = useTheme();
  
  // Choose the image source based on the current theme
  const imageSrc = theme === 'futuristic' ? futuristicSrc : defaultSrc;
  
  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
    />
  );
}
