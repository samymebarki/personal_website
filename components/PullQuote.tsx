'use client';

import React from 'react';
import { Quote } from 'lucide-react';

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
  return (
    <div className="w-full my-8 px-0 py-4 border-t border-b border-[#503822] text-center">
      <Quote className="h-5 w-5 text-[#503822] mx-auto mb-2 opacity-80" />
      <p className="text-xl font-serif italic leading-tight text-[#503822] max-w-2xl mx-auto">
        {quote}
      </p>
      {author && (
        <p className="text-sm font-semibold mt-2 text-[#503822]">
          — {author}
        </p>
      )}
    </div>
  );
};

export default PullQuote;
