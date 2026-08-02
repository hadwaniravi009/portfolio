'use client';

import { Testimonial } from '@/lib/wordpress';
import { Quote } from 'lucide-react';

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-16 sm:py-24 bg-[#f8f9fb]/50 backdrop-blur-sm border-b border-[#c4c7c7]/20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#0051d5] mb-2 block">
            Endorsements
          </span>
          <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold tracking-tight text-[#000000]">
            What Clients Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-[#c4c7c7]/40 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative group"
            >
              <div className="mb-6">
                <Quote className="w-7 h-7 sm:w-8 sm:h-8 text-[#0051d5]/30 mb-3 sm:mb-4 group-hover:text-[#0051d5] transition-colors" />
                <p className="text-[#444748] italic text-sm sm:text-base leading-relaxed">
                  "{t.quote}"
                </p>
              </div>

              <div className="pt-4 border-t border-[#edeef0]">
                <p className="font-bold text-[#000000] text-sm sm:text-base">{t.name}</p>
                <p className="text-[10px] sm:text-xs text-[#747878] uppercase tracking-wider sm:tracking-widest font-medium mt-0.5">
                  {t.role}, {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
