'use client';

import { ArrowRight, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden">
      {/* Grid Pattern overlay */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-30"></div>

      <div className="px-6 md:px-16 max-w-[1440px] mx-auto text-center z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#c4c7c7] rounded-full mb-8 bg-white/70 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[#444748]">
            Available for new projects & full-time roles
          </span>
        </div>

        {/* Display Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-[#000000] mb-6 max-w-5xl mx-auto leading-[1.1]">
          Designing Beautiful Experiences.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-[#0051d5] to-[#316bf3]">
            Developing Powerful Websites.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-[#444748] max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          I help businesses and startups transform ideas into fast, responsive, SEO-friendly websites using modern UI/UX design, Next.js frontend development, and Headless WordPress.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#projects"
            className="w-full sm:w-auto bg-[#000000] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0051d5] transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl shadow-black/10 active:scale-95 group"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto bg-white/90 backdrop-blur-md border border-[#c4c7c7] text-[#000000] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#edeef0] transition-all active:scale-95 text-center"
          >
            Start a Project
          </a>
        </div>

        {/* Hero Banner Showcase Frame */}
        <div className="relative max-w-5xl mx-auto group perspective-1000">
          <div className="transform-style-3d group-hover:rotate-x-1 transition-transform duration-700 rounded-3xl overflow-hidden shadow-2xl border border-[#c4c7c7]/40 bg-white">
            <img
              src="https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80"
              alt="Ravi Hadwani - Portfolio Showcase Preview"
              className="w-full object-cover max-h-[560px] group-hover:scale-[1.02] transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
              <div className="text-white text-left">
                <span className="text-xs uppercase font-bold tracking-widest text-[#b4c5ff]">Featured Showcase</span>
                <h3 className="text-2xl font-bold mt-1">High Performance Web Architecture</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
