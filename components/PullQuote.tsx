'use client';

import React from 'react';
import { Quote } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface PullQuoteProps {
  quote: string;
  author?: string;
  align?: 'left' | 'right';
}

const PullQuote: React.FC<PullQuoteProps> = ({ 
  quote, 
  author, 
  align = 'left' 
}) => {
  const { theme } = useTheme();
  const isFuturistic = theme === 'futuristic';
  
  return (
    <div className={`w-full my-8 px-0 py-4 text-center relative ${
      isFuturistic 
        ? 'border-none bg-[rgba(0,20,40,0.3)] backdrop-blur-sm rounded'
        : 'border-t border-b border-[#503822]'
    }`}>
      {isFuturistic && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-[rgba(0,255,255,0.3)]"></div>
          <div className="absolute bottom-0 left-0 w-full h-[1px] bg-[rgba(0,255,255,0.3)]"></div>
          <div className="absolute top-0 left-0 w-[20px] h-[20px] border-t border-l border-[rgba(0,255,255,0.5)]"></div>
          <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t border-r border-[rgba(0,255,255,0.5)]"></div>
          <div className="absolute bottom-0 left-0 w-[20px] h-[20px] border-b border-l border-[rgba(0,255,255,0.5)]"></div>
          <div className="absolute bottom-0 right-0 w-[20px] h-[20px] border-b border-r border-[rgba(0,255,255,0.5)]"></div>
        </div>
      )}
      
      <Quote className={`h-5 w-5 mx-auto mb-2 opacity-80 ${
        isFuturistic ? 'text-[#00ffff]' : 'text-[#503822]'
      }`} />
      
      <p className={`text-xl italic leading-tight max-w-2xl mx-auto ${
        isFuturistic 
          ? 'font-mono text-[#00ffff] text-shadow-cyan tracking-wider'
          : 'font-serif text-[#503822]'
      }`}>
        {isFuturistic ? `"${quote}"` : quote}
      </p>
      
      {author && (
        <p className={`text-sm font-semibold mt-3 ${
          isFuturistic 
            ? 'text-[rgba(0,255,255,0.8)] tracking-wide'
            : 'text-[#503822]'
        }`}>
          {isFuturistic ? `// ${author}` : `— ${author}`}
        </p>
      )}
      
      {isFuturistic && (
        <div className="absolute bottom-[-1px] left-0 w-full h-[2px] overflow-hidden">
          <div className="h-full bg-[#00ffff] opacity-50" 
               style={{
                 width: '100%',
                 animation: 'scanline 4s ease-in-out infinite',
               }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default PullQuote;
