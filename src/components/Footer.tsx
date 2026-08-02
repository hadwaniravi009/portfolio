'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowUpRight, ArrowUp, Mail, Sparkles, MapPin, Clock, Globe, Code2 } from 'lucide-react';

export default function Footer() {
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      });
      setLocalTime(timeStr);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/#about' },
    { label: 'Services', href: '/#services' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  const services = [
    'Next.js 16 Web Applications',
    'Headless WordPress Architecture',
    'UI/UX Design Systems',
    'Full-Stack Performance Optimization',
    'Custom WP Theme & Plugin Dev',
  ];

  return (
    <footer className="bg-[#000000] text-white pt-16 sm:pt-24 pb-8 sm:pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Background Radial Glow */}
      <div className="absolute top-0 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-[#0051d5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        {/* Top Giant Callout Banner */}
        <div className="pb-12 sm:pb-16 mb-12 sm:mb-16 border-b border-white/10 flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block shrink-0" />
              <span>Available For New Projects & Roles</span>
            </div>
            <h2 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white max-w-2xl leading-tight">
              LET'S BUILD SOMETHING <span className="text-[#316bf3]">EXTRAORDINARY.</span>
            </h2>
          </div>

          <a
            href="mailto:hadwaniravi009@gmail.com"
            className="w-full sm:w-auto group relative inline-flex items-center justify-center gap-3 bg-[#0051d5] hover:bg-[#316bf3] text-white px-6 sm:px-8 py-4 sm:py-5 rounded-full font-extrabold uppercase tracking-widest text-xs transition-all shadow-[0_0_25px_rgba(0,81,213,0.4)] hover:shadow-[0_0_35px_rgba(49,107,243,0.7)] active:scale-95 shrink-0 text-center"
          >
            <Mail className="w-4 h-4" />
            <span>START A CONVERSATION</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </a>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
          {/* Col 1: Identity & Clock (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="font-black text-xl sm:text-2xl tracking-tighter text-white">Ravi Hadwani</span>
                <span className="w-2 h-2 rounded-full bg-[#0051d5]" />
              </div>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-sm">
                Senior Frontend Developer & UI/UX Designer crafting high-speed Next.js web applications and Headless WordPress solutions.
              </p>
            </div>

            {/* Live Location & Local Clock Badge */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-row items-center justify-between gap-2 sm:gap-4 max-w-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-gray-300">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#316bf3] shrink-0" />
                <span>India (IST)</span>
              </div>
              <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs font-mono text-[#316bf3] font-bold bg-white/5 px-2.5 py-1 rounded-lg border border-white/5">
                <Clock className="w-3 h-3 sm:w-3.5 sm:h-3.5 animate-spin-slow" />
                <span>{localTime || 'GMT+5:30'}</span>
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 sm:mb-6 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-[#316bf3]" />
              <span>Navigation</span>
            </h4>
            <ul className="grid grid-cols-2 sm:grid-cols-1 gap-2.5 sm:gap-3">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm font-semibold text-gray-300 hover:text-white hover:translate-x-1.5 transition-all inline-flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] opacity-0 group-hover:opacity-100 transition-opacity" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Capabilities (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 sm:mb-6">
              Services
            </h4>
            <ul className="space-y-2.5 sm:space-y-3">
              {services.map((item) => (
                <li key={item} className="text-xs font-medium text-gray-400 leading-relaxed">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Social Connections (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4 sm:mb-6">
              Connect
            </h4>
            <div className="grid grid-cols-1 xs:grid-cols-3 sm:grid-cols-1 gap-2.5 sm:gap-3">
              <a
                href="https://github.com/hadwaniravi009"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 hover:border-[#0051d5] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span>GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 hover:border-[#0051d5] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span>LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </a>

              <a
                href="mailto:hadwaniravi009@gmail.com"
                className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/10 hover:border-[#0051d5] transition-all group"
              >
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                  <span>Email</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-white transition-colors" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Back To Top Row */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider sm:tracking-widest font-medium text-center sm:text-left">
            © {new Date().getFullYear()} RAVI HADWANI — ENGINEERED WITH NEXT.JS 16 & HEADLESS WORDPRESS
          </div>

          <button
            onClick={scrollToTop}
            suppressHydrationWarning
            className="flex items-center gap-3 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors group cursor-pointer"
          >
            <span>Back To Top</span>
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-[#0051d5] group-hover:border-[#0051d5] transition-all shadow-md group-hover:shadow-[0_0_15px_rgba(0,81,213,0.6)]">
              <ArrowUp className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
