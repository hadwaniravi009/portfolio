'use client';

import { Service } from '@/lib/wordpress';
import { Palette, Code, Terminal, Layers } from 'lucide-react';

interface ServicesProps {
  services: Service[];
}

export default function Services({ services }: ServicesProps) {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'draw':
        return <Palette className="w-8 h-8 text-[#0051d5]" />;
      case 'code':
        return <Code className="w-8 h-8 text-[#0051d5]" />;
      case 'terminal':
        return <Terminal className="w-8 h-8 text-[#0051d5]" />;
      default:
        return <Layers className="w-8 h-8 text-[#0051d5]" />;
    }
  };

  return (
    <section className="py-24 bg-[#f8f9fb] border-b border-[#c4c7c7]/20" id="services">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-2 block">
            Capabilities
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000000] mb-4">
            Expertise & Tech Stack
          </h2>
          <div className="w-16 h-1 bg-[#0051d5] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="p-8 bg-white rounded-3xl border border-[#c4c7c7]/40 hover:border-[#0051d5] hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group flex flex-col justify-between"
            >
              <div>
                <div className="mb-6 group-hover:scale-110 transition-transform inline-block">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-2xl font-bold text-[#000000] mb-3">{service.title}</h3>
                <p className="text-[#444748] text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 pt-4 border-t border-[#edeef0]">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-[#edeef0] text-[#191c1e] rounded-full text-[11px] font-semibold uppercase tracking-wider"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
