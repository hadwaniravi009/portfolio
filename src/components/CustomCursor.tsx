'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    const lerpSpeed = 0.2;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * lerpSpeed;
      ringY += (mouseY - ringY) * lerpSpeed;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      animId = requestAnimationFrame(animateRing);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest('button, a, input, select, textarea, .group, [role="button"], [data-cursor="hover"]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    animId = requestAnimationFrame(animateRing);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[99999] overflow-hidden">
      {/* Outer Magnetic Follower Ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border-[1.5px] border-[#0051d5]/60 bg-[#0051d5]/5 pointer-events-none transition-all duration-200 ease-out will-change-transform ${
          isHovered
            ? 'w-14 h-14 border-[#0051d5] bg-[#0051d5]/15 shadow-[0_0_24px_rgba(0,81,213,0.4)]'
            : 'w-9 h-9'
        } ${isClicked ? 'scale-75' : 'scale-100'}`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
      {/* Inner Glowing Center Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 rounded-full bg-[#0051d5] shadow-[0_0_10px_#0051d5] pointer-events-none transition-all duration-150 ease-out will-change-transform ${
          isHovered ? 'w-3 h-3 bg-[#316bf3] shadow-[0_0_16px_#316bf3]' : 'w-2.5 h-2.5'
        } ${isClicked ? 'scale-50' : 'scale-100'}`}
        style={{ transform: 'translate3d(-100px, -100px, 0) translate(-50%, -50%)' }}
      />
    </div>
  );
}
