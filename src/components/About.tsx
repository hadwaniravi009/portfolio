'use client';

import { Code2, Layout, Zap, Cpu, Sparkles, Layers, ShieldCheck, Terminal, Award } from 'lucide-react';

export default function About() {
  const techPills = [
    'Next.js 16',
    'React 19',
    'TypeScript',
    'Tailwind CSS v4',
    'Headless WP',
    'REST API',
    'Framer Motion',
    'UI/UX Design',
    'PostgreSQL',
    'GraphQL',
  ];

  const highlights = [
    {
      title: 'Swiss Grid Precision',
      desc: 'Mathematical layout rhythm, strict visual hierarchy, and generous breathing space for maximum focus.',
      icon: Layout,
      color: 'from-blue-500/10 to-indigo-500/10',
    },
    {
      title: 'Sub-Second Speeds',
      desc: 'Architecting Next.js SSG & ISR caching pipelines to deliver lightning-fast load times globally.',
      icon: Zap,
      color: 'from-amber-500/10 to-orange-500/10',
    },
    {
      title: 'Headless WP Power',
      desc: 'Decoupling WordPress backend content management with modern React frontends for peak performance.',
      icon: Cpu,
      color: 'from-emerald-500/10 to-teal-500/10',
    },
  ];

  return (
    <section className="py-16 sm:py-24 md:py-28 bg-[#f8f9fb] border-y border-[#c4c7c7]/30 relative overflow-hidden" id="about">
      {/* Background Subtle Accent Orb */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-64 sm:w-96 h-64 sm:h-96 bg-[#0051d5]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0051d5]/10 border border-[#0051d5]/20 text-[#0051d5] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Engineer & Designer</span>
          </div>
          <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-6xl font-extrabold tracking-tight text-[#000000] max-w-4xl leading-tight">
            Crafting digital excellence through design precision & clean architecture.
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-[#444748] max-w-2xl mt-4 leading-relaxed font-normal">
            Bridging the gap between aesthetic visual design and production-ready full-stack frontend engineering.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          {/* Main Bio Card (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-3xl border border-[#c4c7c7]/40 shadow-sm hover:border-[#0051d5] transition-all duration-500 flex flex-col justify-between group">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#0051d5] text-white flex items-center justify-center shadow-lg shadow-[#0051d5]/25 shrink-0">
                  <Terminal className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-extrabold text-[#000000]">Ravi Hadwani</h3>
                  <p className="text-[10px] sm:text-xs uppercase font-bold tracking-widest text-[#0051d5]">Senior Developer & Designer</p>
                </div>
              </div>

              <p className="text-base sm:text-lg text-[#191c1e] font-medium leading-relaxed mb-6">
                I specialize in designing and engineering high-impact web applications, bespoke UI design systems, and headless WordPress solutions. My design philosophy is rooted in Swiss grid systems—prioritizing functional minimalism, typographic hierarchy, and sub-second execution.
              </p>

              <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#f8f9fb] border-l-4 border-[#0051d5] text-[#444748] text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8">
                "Code isn't just about functionality; it's an art of structure, performance, and seamless user interaction that elevates brand authority."
              </div>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 pt-6 border-t border-[#edeef0]">
              <div className="text-center sm:text-left">
                <span className="text-xl xs:text-2xl md:text-4xl font-extrabold text-[#000000] block">5+</span>
                <span className="text-[9px] xs:text-[11px] uppercase font-bold tracking-wider text-gray-500">Years Experience</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xl xs:text-2xl md:text-4xl font-extrabold text-[#0051d5] block">40+</span>
                <span className="text-[9px] xs:text-[11px] uppercase font-bold tracking-wider text-gray-500">Projects Delivered</span>
              </div>
              <div className="text-center sm:text-left">
                <span className="text-xl xs:text-2xl md:text-4xl font-extrabold text-[#000000] block">&lt;1.2s</span>
                <span className="text-[9px] xs:text-[11px] uppercase font-bold tracking-wider text-gray-500">Load Time Goal</span>
              </div>
            </div>
          </div>

          {/* Right Column Stack (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6 sm:gap-8">
            {/* Tech Stack Matrix Card */}
            <div className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#c4c7c7]/40 shadow-sm hover:border-[#0051d5] transition-all duration-500">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Layers className="w-5 h-5 text-[#0051d5]" />
                <h4 className="text-sm sm:text-base font-bold uppercase tracking-wider text-[#000000]">Core Tech Stack</h4>
              </div>
              <p className="text-xs text-[#444748] mb-5 sm:mb-6">
                Engineered with bleeding-edge web frameworks & design software:
              </p>

              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {techPills.map((pill) => (
                  <span
                    key={pill}
                    className="px-3 py-1 sm:px-3.5 sm:py-1.5 bg-[#f8f9fb] text-[#191c1e] rounded-full text-[11px] sm:text-xs font-semibold uppercase tracking-wider border border-[#c4c7c7]/30 hover:border-[#0051d5] hover:bg-[#0051d5] hover:text-white transition-all cursor-default"
                  >
                    {pill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quality Promise Card */}
            <div className="bg-gradient-to-br from-[#000000] to-[#1c1b1b] text-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl shadow-xl flex flex-col justify-between border border-white/10 relative overflow-hidden group">
              <div className="absolute right-[-20px] bottom-[-20px] w-40 h-40 bg-[#0051d5]/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 pointer-events-none" />

              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#316bf3] mb-4">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold mb-2 text-white">Production Quality Standard</h4>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Every application is handcrafted with strict TypeScript type safety, responsive mobile-first layouts, SEO best practices, and accessible semantic HTML.
                </p>
              </div>

              <div className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-bold uppercase tracking-widest text-[#316bf3]">
                <Award className="w-4 h-4" />
                <span>Zero Technical Debt Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mt-6 sm:mt-8">
          {highlights.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white border border-[#c4c7c7]/40 hover:border-[#0051d5] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 group"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-[#f8f9fb] border border-[#c4c7c7]/30 flex items-center justify-center text-[#0051d5] mb-5 sm:mb-6 group-hover:bg-[#0051d5] group-hover:text-white transition-all">
                  <IconComp className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#000000] mb-2">{item.title}</h3>
                <p className="text-xs sm:text-sm text-[#444748] leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
