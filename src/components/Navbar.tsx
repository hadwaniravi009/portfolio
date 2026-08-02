'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Projects', href: '/#projects' },
    { label: 'Services', href: '/#services' },
    { label: 'About', href: '/#about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/#contact' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 backdrop-blur-xl py-3 border-b border-[#c4c7c7]/30 shadow-sm'
          : 'bg-[#f8f9fb]/80 backdrop-blur-md py-5 border-b border-[#c4c7c7]/20'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="font-bold text-xl md:text-2xl tracking-tighter text-[#000000] group-hover:text-[#0051d5] transition-colors">
            Ravi Hadwani
          </span>
          <span className="w-2 h-2 rounded-full bg-[#0051d5] inline-block animate-pulse"></span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-xs font-semibold uppercase tracking-widest text-[#444748] hover:text-[#000000] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#000000] hover:after:w-full after:transition-all"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTA Button */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="/#contact"
            className="bg-[#000000] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0051d5] transition-all active:scale-95 shadow-md hover:shadow-lg flex items-center gap-1 group"
          >
            <span>Let's Build Together</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className="flex lg:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#000000] focus:outline-none"
            aria-label="Toggle Navigation Menu"
            suppressHydrationWarning
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-2xl border-b border-[#c4c7c7]/30 px-6 py-6 transition-all animate-fade-in-up">
          <div className="flex flex-col gap-4">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-bold uppercase tracking-widest text-[#191c1e] hover:text-[#0051d5] py-2 border-b border-gray-100"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 bg-[#000000] text-white text-center py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#0051d5] transition-all"
            >
              Let's Build Together
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
