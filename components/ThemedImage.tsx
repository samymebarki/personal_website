'use client';

import Image from 'next/image';
import { useTheme } from '@/context/ThemeContext';
import dynamic from 'next/dynamic';

// Dynamically import ParticleImage with no SSR to avoid hydration issues
const ParticleImage = dynamic(() => import('./ParticleImage'), { ssr: false });

interface ThemedImageProps {
  defaultSrc: string;
  futuristicSrc: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  noBorder?: boolean;
}

export default function ThemedImage({
  defaultSrc,
  futuristicSrc,
  alt,
  width,
  height,
  className = '',
  noBorder = false,
}: ThemedImageProps) {
  const { theme } = useTheme();
  
  // Choose the image source based on the current theme
  const imageSrc = theme === 'futuristic' ? futuristicSrc : defaultSrc;
  
  const imageClasses = noBorder || className.includes('no-futuristic-border') 
    ? `${className} no-futuristic-border no-border-override` 
    : className;

  // Create a style object that will forcefully remove any border
  const inlineStyle = theme === 'futuristic' && (noBorder || className.includes('no-futuristic-border'))
    ? { 
        border: 'none !important', 
        boxShadow: 'none !important', 
        filter: 'none !important',
        outline: 'none !important',
        background: 'transparent !important'
      } 
    : undefined;

  return (
    <div className="ThemedImage" style={noBorder ? { display: 'inline-block' } : undefined}>
      {theme === 'futuristic' ? (
        <div className="relative w-full h-full">
          {/* Scanner and particle effect only for the futuristic theme */}
          <ParticleImage
            imageUrl={imageSrc}
            width={width || 300}
            height={height || 300}
            className={`${imageClasses} w-full h-full object-cover`}
          />
        </div>
      ) : (
        <Image
          src={imageSrc}
          alt={alt}
          width={width}
          height={height}
          className={imageClasses}
          style={inlineStyle}
          data-no-border={noBorder ? 'true' : 'false'}
        />
      )}
    </div>
  );
}
