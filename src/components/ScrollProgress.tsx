'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollPercentage(Math.min(100, Math.max(0, currentProgress)));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Floating Glow Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-black/5">
        <div
          className="h-full bg-gradient-to-r from-[#0051d5] via-[#316bf3] to-[#0051d5] transition-all duration-150 ease-out shadow-[0_0_12px_rgba(0,81,213,0.8)] relative"
          style={{ width: `${scrollPercentage}%` }}
        >
          {/* Glowing tip dot */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_8px_#316bf3] animate-pulse"></div>
        </div>
      </div>
    </>
  );
}
