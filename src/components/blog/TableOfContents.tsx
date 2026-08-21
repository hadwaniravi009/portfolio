'use client';

import { useEffect, useState } from 'react';
import { ListOrdered } from 'lucide-react';

export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    if (!headings.length) return;

    if (!activeId && headings.length > 0) {
      setActiveId(headings[0].id);
    }

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 140;

      for (let i = headings.length - 1; i >= 0; i--) {
        const el = document.getElementById(headings[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            setActiveId(headings[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings, activeId]);

  if (!headings || headings.length === 0) {
    return null;
  }

  const scrollToHeading = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 110;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
      setActiveId(id);
    }
  };

  return (
    <div className="bg-[#0f1218]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl transition-all">
      <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-white/10">
        <div className="w-7 h-7 rounded-lg bg-[#0051d5]/20 border border-[#0051d5]/40 flex items-center justify-center text-[#0051d5]">
          <ListOrdered className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
          Table Of Contents
        </h3>
      </div>

      <nav className="space-y-1 max-h-[380px] overflow-y-auto pr-1">
        {headings.map((heading, index) => {
          const isActive = activeId === heading.id;
          return (
            <button
              key={`${heading.id}-${index}`}
              onClick={() => scrollToHeading(heading.id)}
              className={`w-full text-left flex items-start gap-2.5 py-2 px-3 rounded-xl text-xs font-medium transition-all duration-200 group ${
                heading.level === 3 ? 'pl-6 text-[11px]' : ''
              } ${
                isActive
                  ? 'bg-[#0051d5]/20 text-white font-bold border border-[#0051d5]/40 shadow-sm'
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 border border-transparent'
              }`}
            >
              <span
                className={`mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0 transition-colors ${
                  isActive ? 'bg-[#0051d5] ring-4 ring-[#0051d5]/20' : 'bg-gray-600 group-hover:bg-gray-400'
                }`}
              />
              <span className="leading-relaxed line-clamp-2">{heading.text}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}
