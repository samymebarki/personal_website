'use client';

import { useState, useEffect } from 'react';

const PageNumbers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 4; // Total number of virtual "pages"
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      
      // Calculate which "page" we're on based on scroll position
      const scrollPercentage = scrollPosition / totalHeight;
      const newPage = Math.min(
        totalPages,
        Math.max(1, Math.ceil(scrollPercentage * totalPages))
      );
      
      setCurrentPage(newPage);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <div className="flex gap-1 items-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <span 
            key={i} 
            className={`inline-block h-6 w-6 text-center leading-6 border border-[#503822] text-xs
              ${currentPage === i + 1 
                ? 'bg-[#503822] text-[#f8e1c2]' 
                : 'bg-[#f8e1c2] text-[#503822]'
              }`}
          >
            {i + 1}
          </span>
        ))}
      </div>
      <span className="text-xs text-[#503822]">Page {currentPage} of {totalPages}</span>
    </div>
  );
};

export default PageNumbers;
