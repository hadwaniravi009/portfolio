'use client';

import { CheckCircle2, Code2, Layout, Zap } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      title: 'Swiss Grid Precision',
      desc: 'Mathematical approaches to layout, grid alignment, and harmonious visual whitespace.',
      icon: Layout,
    },
    {
      title: 'Full-Stack Performance',
      desc: 'Sub-second page loads using Next.js App Router, SSR caching, and asset optimization.',
      icon: Zap,
    },
    {
      title: 'Headless WordPress Mastery',
      desc: 'Seamless combination of WP REST API backend with modern React/Next.js frontends.',
      icon: Code2,
    },
  ];

  return (
    <section className="py-24 bg-white/50 backdrop-blur-sm border-y border-[#c4c7c7]/30" id="about">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start mb-16">
          <div className="md:col-span-5">
            <span className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-3 block">
              About Me
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000000] leading-tight">
              Crafting digital excellence with precision and purpose.
            </h2>
          </div>

          <div className="md:col-span-7 flex flex-col gap-6">
            <p className="text-lg text-[#444748] leading-relaxed">
              As a Senior Frontend Developer and UI/UX Designer, I bridge the gap between human-centered design and modern technology. My approach is rooted in Swiss design principles—prioritizing clarity, readability, and functional beauty.
            </p>
            <p className="text-base text-[#444748]/90 border-l-4 border-[#0051d5] pl-6 py-2 italic bg-[#f8f9fb] rounded-r-lg">
              I specialize in creating high-performance WordPress solutions and custom Next.js frontend architectures. My focus extends beyond aesthetics; I build for accessibility, SEO, speed, and real-world conversion.
            </p>
          </div>
        </div>

        {/* Highlights Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <div
                key={idx}
                className="p-8 rounded-2xl bg-[#f8f9fb] border border-[#c4c7c7]/40 hover:border-[#0051d5] transition-all hover:shadow-lg group"
              >
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#0051d5] shadow-sm mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-[#000000] mb-2">{item.title}</h3>
                <p className="text-sm text-[#444748] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
