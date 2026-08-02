'use client';

import { Service } from '@/lib/wordpress';
import { Palette, Code, Terminal, ArrowUpRight, CheckCircle2, Sparkles, Shield, Cpu, Layout, Zap, Award, Layers } from 'lucide-react';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const getIcon = (iconName: string, index: number) => {
    switch (iconName?.toLowerCase()) {
      case 'draw':
      case 'palette':
      case 'design':
      case 'ui':
      case 'ux':
        return <Palette className="w-6 h-6 text-[#0051d5]" />;
      case 'code':
      case 'dev':
      case 'frontend':
        return <Code className="w-6 h-6 text-[#0051d5]" />;
      case 'terminal':
      case 'headless':
      case 'wordpress':
        return <Terminal className="w-6 h-6 text-[#0051d5]" />;
      default:
        return index % 3 === 0 ? (
          <Palette className="w-6 h-6 text-[#0051d5]" />
        ) : index % 3 === 1 ? (
          <Code className="w-6 h-6 text-[#0051d5]" />
        ) : (
          <Terminal className="w-6 h-6 text-[#0051d5]" />
        );
    }
  };

  const getDeliverables = (title: string, tags: string[], description: string) => {
    const lower = title.toLowerCase();
    if (lower.includes('design') || lower.includes('ui') || lower.includes('graphic')) {
      return [
        'Swiss Grid Hierarchy & Figma Prototypes',
        'Conversion-Focused User Journey Mapping',
        'Bespoke Visual Tokens & Typography System',
      ];
    }
    if (lower.includes('web') || lower.includes('dev') || lower.includes('custom') || lower.includes('frontend')) {
      return [
        'Next.js 16 App Router & SSR Architecture',
        'Sub-1.2s Page Speed & Clean Component Code',
        '100% Mobile & Desktop Responsive Testing',
      ];
    }
    return [
      'Decoupled Headless WP REST / GraphQL Setup',
      'Custom CPTs, Meta Fields & Security Hardening',
      'High-Speed Next.js Frontend Integration',
    ];
  };

  return (
    <section className="py-28 bg-[#f8f9fb] border-b border-[#c4c7c7]/30 relative overflow-hidden" id="services">
      {/* Background Ambient Radial Glow */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-[#0051d5]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-6 md:px-16 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0051d5]/10 border border-[#0051d5]/20 text-[#0051d5] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tailored Digital Engineering</span>
            </div>
            <h2 className="text-3xl md:text-6xl font-black tracking-tight text-[#000000] leading-none">
              Services & Specialized Solutions.
            </h2>
            <p className="text-[#444748] mt-3 text-base max-w-2xl leading-relaxed font-medium">
              Real-time dynamic services managed directly via Pantheon WordPress Admin. Engineered to eliminate technical bottlenecks, boost Google PageSpeed, and convert visitors into paying clients.
            </p>
          </div>

          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#000000] hover:bg-[#0051d5] text-white px-7 py-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all shadow-xl hover:shadow-2xl active:scale-95 group cursor-pointer shrink-0"
          >
            <span>Book a Technical Consultation</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const deliverables = getDeliverables(service.title, service.tags, service.description);
            const serviceNumber = (index + 1).toString().padStart(2, '0');

            return (
              <div
                key={service.id}
                className="bg-white rounded-[32px] p-8 border border-[#c4c7c7]/40 hover:border-[#0051d5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between relative overflow-hidden"
              >
                {/* Top Accent Blue Hover Bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-transparent group-hover:bg-[#0051d5] transition-colors duration-300" />

                {/* Large Background Watermark Number */}
                <div className="absolute top-6 right-8 font-black text-5xl text-gray-100 group-hover:text-[#0051d5]/10 transition-colors select-none">
                  {serviceNumber}
                </div>

                <div>
                  {/* Icon & Category Header */}
                  <div className="w-14 h-14 rounded-2xl bg-[#f8f9fb] border border-gray-200 flex items-center justify-center mb-6 group-hover:bg-[#0051d5] group-hover:border-[#0051d5] transition-all duration-300 shadow-xs">
                    <div className="group-hover:text-white group-hover:scale-110 transition-transform duration-300">
                      {getIcon(service.icon, index)}
                    </div>
                  </div>

                  <h3 className="text-2xl font-black text-[#000000] mb-3 group-hover:text-[#0051d5] transition-colors leading-snug">
                    {service.title}
                  </h3>

                  <p className="text-[#444748] text-sm leading-relaxed mb-6 font-normal">
                    {service.description ||
                      'High-performance bespoke solution engineered with modern web frameworks for speed, responsiveness, and conversion.'}
                  </p>

                  {/* Client Deliverables List */}
                  <div className="space-y-2.5 mb-6 pt-5 border-t border-gray-100">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0051d5] block mb-3">
                      Included Deliverables
                    </span>
                    {deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs font-semibold text-gray-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack Chips & Action Link */}
                <div className="pt-5 border-t border-gray-100">
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-[#f8f9fb] text-[#191c1e] rounded-full text-[10px] font-extrabold uppercase tracking-wider border border-gray-200 shadow-2xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href="#contact"
                    className="w-full bg-[#f8f9fb] group-hover:bg-[#0051d5] group-hover:text-white text-[#000000] border border-gray-200 group-hover:border-[#0051d5] py-3 px-4 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all duration-300 flex items-center justify-between group/btn cursor-pointer"
                  >
                    <span>Hire For {service.title.split(' ')[0]}</span>
                    <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* UI/UX Designer Quality Comparison Banner */}
        <div className="mt-16 p-8 md:p-12 rounded-[32px] bg-gradient-to-r from-[#000000] via-[#161b22] to-[#000000] text-white border border-white/10 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div className="flex items-center gap-5 relative z-10">
            <div className="w-14 h-14 rounded-2xl bg-[#0051d5] flex items-center justify-center text-white shrink-0 shadow-xl shadow-[#0051d5]/40">
              <Shield className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-widest text-[#316bf3] mb-1">
                <Award className="w-4 h-4" />
                <span>Senior UI/UX Designer Guarantee</span>
              </div>
              <h4 className="text-xl md:text-2xl font-black text-white">Handcrafted Custom Code vs Pre-Made Templates</h4>
              <p className="text-xs text-gray-400 max-w-xl mt-1 leading-relaxed">
                Pre-made themes introduce heavy plugin bloat and slow load times. My custom Next.js & Headless WordPress setups guarantee sub-1.2s page loads and 100% mobile perfection.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 shrink-0 relative z-10">
            <div className="text-center lg:text-left">
              <span className="text-2xl font-black text-[#316bf3] block">Sub-1.2s</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">Page Speed</span>
            </div>
            <div className="text-center lg:text-left">
              <span className="text-2xl font-black text-white block">100% Custom</span>
              <span className="text-[10px] uppercase font-bold text-gray-400">No Theme Bloat</span>
            </div>
            <a
              href="#contact"
              className="bg-white text-black hover:bg-[#316bf3] hover:text-white px-6 py-3 rounded-xl text-xs font-extrabold uppercase tracking-widest transition-all cursor-pointer"
            >
              Get Started
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
