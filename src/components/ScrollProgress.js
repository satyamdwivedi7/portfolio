'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-dark-800/50 z-50 backdrop-blur-sm">
      <div
        className="h-full bg-gradient-to-r from-neon-cyan via-neon-purple to-neon-pink transition-all duration-300 ease-out"
        style={{
          width: `${scrollProgress}%`,
          boxShadow: `0 0 10px rgba(0, 255, 255, 0.5)`,
        }}
      />
    </div>
  );
}
