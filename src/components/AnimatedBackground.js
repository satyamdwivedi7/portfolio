'use client';

import { useEffect, useRef } from 'react';

export default function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Create a static code-like pattern background
    const drawStaticBackground = () => {
      // Set black background
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Add subtle grid pattern
      ctx.strokeStyle = '#0a0a0a';
      ctx.lineWidth = 1;
      
      // Draw vertical lines
      for (let x = 0; x < canvas.width; x += 100) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Draw horizontal lines  
      for (let y = 0; y < canvas.height; y += 100) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Add some code-like dots pattern
      ctx.fillStyle = '#0d1117';
      for (let x = 20; x < canvas.width; x += 40) {
        for (let y = 20; y < canvas.height; y += 40) {
          if (Math.random() > 0.7) {
            ctx.beginPath();
            ctx.arc(x, y, 1, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Add some random code brackets and symbols
      ctx.fillStyle = '#161b22';
      ctx.font = '12px "Fira Code", monospace';
      
      const symbols = ['{', '}', '<', '>', '/', '*', '+', '-', '=', ';', ':', '.', ','];
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const symbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        if (Math.random() > 0.8) {
          ctx.fillText(symbol, x, y);
        }
      }
    };

    // Initialize and draw static background
    resizeCanvas();
    drawStaticBackground();

    // Redraw on resize
    const handleResize = () => {
      resizeCanvas();
      drawStaticBackground();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      style={{ background: '#000000' }}
    />
  );
}
