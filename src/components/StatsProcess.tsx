'use client';

export default function StatsProcess() {
  const stats = [
    { value: '150+', label: 'Projects Completed' },
    { value: '10+', label: 'Years Experience' },
    { value: '100%', label: 'Happy Clients' },
    { value: '200+', label: 'Websites Built' },
  ];

  const steps = [
    {
      step: 'Step 01',
      title: 'Discovery & Research',
      desc: 'Understanding business goals, target audience, and competitive market landscape.',
    },
    {
      step: 'Step 02',
      title: 'Wireframes & UI',
      desc: 'Architecting user flows, typography hierarchy, and pixel-perfect design systems.',
    },
    {
      step: 'Step 03',
      title: 'Development',
      desc: 'Building responsive Next.js/React applications with clean, modular TypeScript code.',
    },
    {
      step: 'Step 04',
      title: 'WordPress Integration',
      desc: 'Connecting frontends to headless WordPress CMS or custom themes for easy management.',
    },
    {
      step: 'Step 05',
      title: 'Launch & Support',
      desc: 'Cross-device testing, speed performance tuning, SEO checks, and ongoing maintenance.',
    },
  ];

  return (
    <section className="py-16 sm:py-24 bg-[#000000] text-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-12 sm:mb-20 text-center border-b border-white/10 pb-12 sm:pb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-3xl xs:text-4xl md:text-6xl font-extrabold text-white mb-1.5 sm:mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-[10px] sm:text-xs uppercase tracking-wider sm:tracking-widest text-[#858383] font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Project Process Steps */}
        <div className="pt-2 sm:pt-4">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest text-[#0051d5] mb-2 block text-center">
            Methodology
          </span>
          <h2 className="text-2xl xs:text-3xl md:text-5xl font-bold tracking-tight text-white mb-10 sm:mb-16 text-center">
            The Project Journey
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-2.5 sm:gap-3 p-5 sm:p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0051d5] transition-all hover:bg-white/10 group"
              >
                <span className="text-[#0051d5] font-bold text-[10px] sm:text-xs uppercase tracking-widest">
                  {item.step}
                </span>
                <h4 className="font-bold text-base sm:text-lg text-white group-hover:text-[#b4c5ff] transition-colors">
                  {item.title}
                </h4>
                <p className="text-white/60 text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
