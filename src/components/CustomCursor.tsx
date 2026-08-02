'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const cursor = cursorRef.current;
    if (!cursor) return;

    let cursorX = 0,
      cursorY = 0;
    let targetX = 0,
      targetY = 0;
    const lerpSpeed = 0.2;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    const animateCursor = () => {
      cursorX += (targetX - cursorX - 10) * lerpSpeed;
      cursorY += (targetY - cursorY - 10) * lerpSpeed;
      if (cursor) {
        cursor.style.left = `${cursorX}px`;
        cursor.style.top = `${cursorY}px`;
      }
      animId = requestAnimationFrame(animateCursor);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        target.closest('button, a, input, select, textarea, .group, [role="button"]')
      ) {
        cursor.classList.add('active');
      } else {
        cursor.classList.remove('active');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    animId = requestAnimationFrame(animateCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      cancelAnimationFrame(animId);
    };
  }, [mounted]);

  if (!mounted) return null;

  return <div id="custom-cursor" ref={cursorRef} className="pointer-events-none" />;
}
