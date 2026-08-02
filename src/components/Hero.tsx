'use client';

import { useState } from 'react';
import { ArrowRight, Code2, Sparkles, Terminal, CheckCircle2, Copy, Check } from 'lucide-react';

export default function Hero() {
  const [activeTab, setActiveTab] = useState<'developer' | 'stack' | 'philosophy'>('developer');
  const [copied, setCopied] = useState(false);

  const developerCode = `// ravi.profile.ts
export const developer = {
  name: "Ravi Hadwani",
  role: "Senior Full-Stack Frontend Engineer & UI Designer",
  location: "India (IST)",
  expertise: ["Next.js 16 App Router", "React 19", "Headless WordPress", "TypeScript"],
  availability: "Accepting select client projects & full-time roles",
  performanceGoal: "Lighthouse 95+ & Sub-1s Load Speeds",
  handcrafted: true,
};`;

  const stackCode = `// stack.config.json
{
  "frontend": ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
  "cms": "Headless WordPress (Pantheon REST API / GraphQL)",
  "animations": ["Framer Motion", "Custom CSS Shaders"],
  "designSystem": ["Swiss Grid Rhythms", "Figma Prototyping"],
  "codeQuality": "Strict Type Safety & Zero AI Boilerplate"
}`;

  const philosophyCode = `<!-- philosophy.md -->
# Craftsmanship Over Templates

Every line of code and UI component is manually engineered 
to reflect genuine human thought, conversion strategy, 
and mathematical visual layout. 

- Zero heavy dependencies
- Clean semantic HTML & accessibility
- Built for real clients, real growth, and real speed.`;

  const copyCode = () => {
    const codeMap = {
      developer: developerCode,
      stack: stackCode,
      philosophy: philosophyCode,
    };
    navigator.clipboard.writeText(codeMap[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center pt-28 pb-16 overflow-hidden bg-[#f8f9fb]" id="hero">
      {/* Background Subtle Grid */}
      <div className="grid-bg absolute inset-0 -z-10 opacity-30 pointer-events-none" />

      {/* Top Ambient Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#0051d5]/5 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="px-6 md:px-16 max-w-[1440px] mx-auto text-center z-10">
        {/* Availability Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#0051d5]/20 rounded-full mb-8 bg-white/80 backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#0051d5]">
            Handcrafted Web Architecture & Design
          </span>
        </div>

        {/* Display Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#000000] mb-6 max-w-5xl mx-auto leading-[1.08]">
          Hi, I'm <span className="underline decoration-[#0051d5] decoration-wavy decoration-2 underline-offset-8">Ravi Hadwani</span>.{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#000000] via-[#0051d5] to-[#316bf3]">
            I build fast web applications & custom WordPress platforms.
          </span>
        </h1>

        {/* Subtitle with Personal Voice */}
        <p className="text-lg md:text-xl text-[#444748] max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
          No generic AI templates or bloated themes. I engineer bespoke Next.js 16 frontends and Headless WordPress systems crafted for speed, SEO ranking, and genuine client conversion.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
          <a
            href="#projects"
            className="w-full sm:w-auto bg-[#000000] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-[#0051d5] transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl active:scale-95 group cursor-pointer"
          >
            <span>Explore Handcrafted Projects</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto bg-white border border-[#c4c7c7] text-[#000000] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#0051d5] hover:text-[#0051d5] transition-all active:scale-95 text-center shadow-sm cursor-pointer"
          >
            Start a Custom Project
          </a>
        </div>

        {/* Interactive Developer Code Terminal Widget */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-2xl border border-gray-800 bg-[#0d1117] text-left text-white">
          {/* Terminal Top Window Bar */}
          <div className="bg-[#161b22] px-5 py-3 flex items-center justify-between border-b border-gray-800">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="text-xs font-mono text-gray-400 ml-2">ravi-hadwani-portfolio ~/terminal</span>
            </div>

            {/* Interactive Code Tabs */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTab('developer')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'developer' ? 'bg-[#0051d5] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                ravi.profile.ts
              </button>
              <button
                onClick={() => setActiveTab('stack')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'stack' ? 'bg-[#0051d5] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                stack.config.json
              </button>
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors cursor-pointer ${
                  activeTab === 'philosophy' ? 'bg-[#0051d5] text-white font-bold' : 'text-gray-400 hover:text-white'
                }`}
              >
                philosophy.md
              </button>
              <button
                onClick={copyCode}
                title="Copy code"
                className="p-1.5 text-gray-400 hover:text-white rounded-md hover:bg-white/10 transition-colors ml-2 cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto text-gray-300 bg-[#0d1117]/95">
            <pre className="text-emerald-400 font-semibold mb-2">$ cat {activeTab === 'developer' ? 'ravi.profile.ts' : activeTab === 'stack' ? 'stack.config.json' : 'philosophy.md'}</pre>
            <pre className="text-gray-200">
              {activeTab === 'developer' && developerCode}
              {activeTab === 'stack' && stackCode}
              {activeTab === 'philosophy' && philosophyCode}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
