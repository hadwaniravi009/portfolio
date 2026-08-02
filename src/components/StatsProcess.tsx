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
    <section className="py-24 bg-[#000000] text-white">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20 text-center border-b border-white/10 pb-16">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center">
              <div className="text-4xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-[#858383] font-semibold">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Project Process Steps */}
        <div className="pt-4">
          <span className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-2 block text-center">
            Methodology
          </span>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-16 text-center">
            The Project Journey
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {steps.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-[#0051d5] transition-all hover:bg-white/10 group"
              >
                <span className="text-[#0051d5] font-bold text-xs uppercase tracking-widest">
                  {item.step}
                </span>
                <h4 className="font-bold text-lg text-white group-hover:text-[#b4c5ff] transition-colors">
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
