'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Info, Briefcase, Wrench, Newspaper, Trophy, ArrowUpRight } from 'lucide-react';

export default function FloatingDock() {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      const element = document.getElementById(targetId);
      if (element) {
        e.preventDefault();
        window.history.pushState(null, '', `/#${targetId}`);
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const dockIcons = [
    { label: 'About', icon: Info, href: '/#about' },
    { label: 'Work', icon: Briefcase, href: '/#projects' },
    { label: 'Services', icon: Wrench, href: '/#services' },
    { label: 'Blog', icon: Newspaper, href: '/blog' },
    { label: 'Proof', icon: Trophy, href: '/#testimonials' },
  ];

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto">
      <div className="bg-white/90 backdrop-blur-2xl p-2 rounded-full border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.2)] flex items-center gap-2 transition-all duration-300 hover:scale-105 hover:border-[#0051d5]/50">
        
        {/* Quick Call Action (Left Orange/Red Icon Badge) */}
        <a
          href="mailto:hadwaniravi009@gmail.com"
          title="Direct Mail"
          className="w-11 h-11 rounded-full bg-gradient-to-tr from-[#ea580c] to-[#f97316] text-white flex items-center justify-center shadow-lg hover:rotate-12 transition-transform shrink-0"
        >
          <Phone className="w-4 h-4 fill-white" />
        </a>

        {/* Middle Quick Navigation Icons */}
        <div className="bg-[#edeef0] px-3 py-1.5 rounded-full flex items-center gap-3 border border-[#c4c7c7]/30">
          {dockIcons.map((item) => {
            const IconComponent = item.icon;
            return (
              <div key={item.label} className="relative group">
                <Link
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  onMouseEnter={() => setActiveTooltip(item.label)}
                  onMouseLeave={() => setActiveTooltip(null)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#444748] hover:text-[#0051d5] hover:bg-white transition-all duration-200"
                >
                  <IconComponent className="w-4 h-4" />
                </Link>

                {/* Tooltip */}
                {activeTooltip === item.label && (
                  <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-[#191c1e] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-md pointer-events-none whitespace-nowrap animate-fade-in">
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Inquiry Quick CTA Button (Right Action Pill) */}
        <Link
          href="/#contact"
          onClick={(e) => handleNavClick(e, '/#contact')}
          className="bg-[#191c1e] hover:bg-[#0051d5] text-white px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-xl flex items-center gap-1.5 shrink-0 group"
        >
          <span>Inquiry</span>
          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
