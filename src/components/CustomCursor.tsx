'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotWrapperRef = useRef<HTMLDivElement>(null);
  const ringWrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const dotWrapper = dotWrapperRef.current;
    const ringWrapper = ringWrapperRef.current;
    if (!dotWrapper || !ringWrapper) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    const lerpSpeed = 0.22;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotWrapper.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const animateRing = () => {
      ringX += (mouseX - ringX) * lerpSpeed;
      ringY += (mouseY - ringY) * lerpSpeed;
      ringWrapper.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
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
      {/* Outer Magnetic Ring Position Wrapper (NO CSS TRANSITIONS!) */}
      <div
        ref={ringWrapperRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {/* Inner Ring Visual (CSS transitions for size/hover/click only) */}
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-[#0051d5]/60 bg-[#0051d5]/5 pointer-events-none transition-all duration-200 ease-out ${
            isHovered
              ? 'w-14 h-14 border-[#0051d5] bg-[#0051d5]/15 shadow-[0_0_24px_rgba(0,81,213,0.4)]'
              : 'w-9 h-9'
          } ${isClicked ? 'scale-75' : 'scale-100'}`}
        />
      </div>

      {/* Inner Dot Position Wrapper (NO CSS TRANSITIONS!) */}
      <div
        ref={dotWrapperRef}
        className="fixed top-0 left-0 pointer-events-none will-change-transform"
        style={{ transform: 'translate3d(-100px, -100px, 0)' }}
      >
        {/* Inner Dot Visual */}
        <div
          className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0051d5] shadow-[0_0_10px_#0051d5] pointer-events-none transition-all duration-150 ease-out ${
            isHovered ? 'w-3 h-3 bg-[#316bf3] shadow-[0_0_16px_#316bf3]' : 'w-2.5 h-2.5'
          } ${isClicked ? 'scale-50' : 'scale-100'}`}
        />
      </div>
    </div>
  );
}
