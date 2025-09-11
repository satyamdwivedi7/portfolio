'use client';

import { useEffect, useState } from 'react';

export default function CursorEffect() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    const mouseEnterHoverable = () => setCursorVariant('hover');
    const mouseLeaveHoverable = () => setCursorVariant('default');

    window.addEventListener('mousemove', mouseMove);

    // Add hover effects to interactive elements
    const hoverableElements = document.querySelectorAll('a, button, [role="button"], .hoverable');
    hoverableElements.forEach(el => {
      el.addEventListener('mouseenter', mouseEnterHoverable);
      el.addEventListener('mouseleave', mouseLeaveHoverable);
    });

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      hoverableElements.forEach(el => {
        el.removeEventListener('mouseenter', mouseEnterHoverable);
        el.removeEventListener('mouseleave', mouseLeaveHoverable);
      });
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 8,
      y: mousePosition.y - 8,
      scale: 1,
    },
    hover: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      scale: 2,
    },
  };

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed w-4 h-4 bg-neon-cyan rounded-full pointer-events-none z-50 mix-blend-difference transition-transform duration-200 ease-out hidden lg:block"
        style={{
          left: variants[cursorVariant].x,
          top: variants[cursorVariant].y,
          transform: `scale(${variants[cursorVariant].scale})`,
        }}
      />
      
      {/* Cursor trail */}
      <div
        className="fixed w-8 h-8 border border-neon-cyan/50 rounded-full pointer-events-none z-40 transition-all duration-500 ease-out hidden lg:block"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
          transform: cursorVariant === 'hover' ? 'scale(1.5)' : 'scale(1)',
        }}
      />
    </>
  );
}
