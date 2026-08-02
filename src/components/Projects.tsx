'use client';

import { useState, useEffect } from 'react';
import { Project } from '@/lib/wordpress';
import { ExternalLink, Code2, X, Eye, Sparkles, CheckCircle2, ShieldCheck, Zap, Layers, Globe } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'WordPress', 'Next.js', 'React'];

  // ESC Key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
        );

  return (
    <section className="py-16 sm:py-24 md:py-28 bg-white border-b border-[#c4c7c7]/30" id="projects">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-16">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 sm:mb-16 gap-6 sm:gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0051d5]/10 border border-[#0051d5]/20 text-[#0051d5] text-[10px] sm:text-xs font-bold uppercase tracking-wider sm:tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Handcrafted Portfolio Case Studies</span>
            </div>
            <h2 className="text-2xl xs:text-3xl md:text-6xl font-black tracking-tight text-[#000000] leading-none">
              Selected Work & Projects.
            </h2>
            <p className="text-[#444748] mt-3 text-sm sm:text-base max-w-xl leading-relaxed">
              Explore real-world client architectures, headless setups, and production web applications engineered by Ravi Hadwani.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 bg-[#f8f9fb] p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border border-[#c4c7c7]/40 w-full sm:w-auto overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                suppressHydrationWarning
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-extrabold uppercase tracking-wider sm:tracking-widest transition-all cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#000000] text-white shadow-lg shadow-black/20'
                    : 'text-[#444748] hover:text-[#000000] hover:bg-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group flex flex-col bg-[#f8f9fb] rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-[#c4c7c7]/40 hover:border-[#0051d5] hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Container with Touch-Accessible & Hover Overlay */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:rounded-2xl border border-gray-200 bg-[#edeef0] shadow-sm">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image w-full h-full object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-700"
                />

                {/* Glass Hover / Active Overlay */}
                <div className="absolute inset-0 bg-[#000000]/65 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col sm:flex-row items-center justify-center gap-2.5 sm:gap-3 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 text-center">
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveModalProject(project)}
                    className="w-full sm:w-auto bg-[#0051d5] text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-[#316bf3] transition-all flex items-center justify-center gap-2 shadow-xl active:scale-95 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View Case Study</span>
                  </button>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto bg-white/20 border border-white/50 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center justify-center gap-2 active:scale-95"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Live Site</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-5 sm:mt-6 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between gap-2 sm:gap-4 mb-2">
                    <span className="px-2.5 py-1 bg-[#0051d5]/10 text-[#0051d5] text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider sm:tracking-widest rounded-full border border-[#0051d5]/20">
                      {project.category}
                    </span>
                    <span className="text-[10px] sm:text-[11px] font-bold text-emerald-600 uppercase tracking-wider sm:tracking-widest flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      Production Ready
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-black text-[#000000] mb-2 sm:mb-3 group-hover:text-[#0051d5] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-[#444748] text-xs sm:text-sm leading-relaxed line-clamp-2 mb-4 sm:mb-6">
                    {project.challenge || 'Custom web application engineered for maximum conversion and speed.'}
                  </p>
                </div>

                {/* Footer Tags & Case Study Trigger */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200 gap-2">
                  <div className="flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-white text-[#191c1e] text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-md border border-gray-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="text-[11px] sm:text-xs font-extrabold uppercase tracking-widest text-[#0051d5] hover:text-[#000000] flex items-center gap-1 group/btn cursor-pointer shrink-0"
                  >
                    <span>Details</span>
                    <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Modal Popup */}
      {activeModalProject && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 xs:p-4 sm:p-6 bg-black/80 backdrop-blur-xl animate-fade-in-up">
          <div className="bg-white rounded-2xl sm:rounded-[32px] max-w-5xl w-full max-h-[92vh] overflow-y-auto relative shadow-2xl border border-gray-200 flex flex-col">
            {/* Browser Header Bar */}
            <div className="sticky top-0 z-20 bg-[#161b22] px-4 sm:px-6 py-3.5 sm:py-4 flex items-center justify-between border-b border-gray-800 rounded-t-2xl sm:rounded-t-[32px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-rose-500 inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500 inline-block" />
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 inline-block" />
                <div className="hidden sm:flex items-center gap-2 bg-[#0d1117] text-gray-400 text-xs font-mono px-4 py-1 rounded-full ml-4 border border-gray-800">
                  <Globe className="w-3 h-3 text-[#316bf3]" />
                  <span>https://hadwaniravi.vercel.app/case-study/{activeModalProject.id}</span>
                </div>
              </div>

              <button
                suppressHydrationWarning
                onClick={() => setActiveModalProject(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-rose-500 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="Close Modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body Content Grid */}
            <div className="p-4 sm:p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-start">
              {/* Left Column: Visual Showcase & Direct Links */}
              <div className="lg:col-span-5 flex flex-col gap-4 sm:gap-6">
                <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-gray-200 shadow-lg relative group">
                  <img
                    src={activeModalProject.image}
                    alt={activeModalProject.title}
                    className="w-full aspect-[16/10] object-cover"
                  />
                  <div className="absolute top-3 left-3 bg-[#0051d5] text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-md">
                    {activeModalProject.category}
                  </div>
                </div>

                {/* Performance Metrics Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#f8f9fb] border border-gray-200 text-center">
                    <Zap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-500 mx-auto mb-1" />
                    <span className="text-[11px] sm:text-xs font-black text-black block">99/100</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-500">Speed</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#f8f9fb] border border-gray-200 text-center">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#0051d5] mx-auto mb-1" />
                    <span className="text-[11px] sm:text-xs font-black text-black block">Secure</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-500">WP REST</span>
                  </div>
                  <div className="p-2.5 sm:p-3 rounded-xl bg-[#f8f9fb] border border-gray-200 text-center">
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-500 mx-auto mb-1" />
                    <span className="text-[11px] sm:text-xs font-black text-black block">100%</span>
                    <span className="text-[8px] sm:text-[9px] uppercase font-bold text-gray-500">Mobile</span>
                  </div>
                </div>

                {/* Tech Stack Badges */}
                <div className="p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-[#f8f9fb] border border-gray-200">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2 block">
                    Technologies Used
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {activeModalProject.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-white text-gray-900 text-[11px] sm:text-xs font-bold rounded-lg border border-gray-200 shadow-2xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action CTA Buttons */}
                <div className="flex flex-col gap-2.5 sm:gap-3">
                  {activeModalProject.liveUrl && activeModalProject.liveUrl !== '#' && (
                    <a
                      href={activeModalProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#0051d5] hover:bg-[#316bf3] text-white py-3 sm:py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] sm:text-xs transition-all shadow-lg flex items-center justify-center gap-2 text-center"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Launch Live Website</span>
                    </a>
                  )}

                  {activeModalProject.githubUrl && activeModalProject.githubUrl !== '#' && (
                    <a
                      href={activeModalProject.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-[#000000] hover:bg-gray-800 text-white py-3 sm:py-3.5 rounded-xl font-bold uppercase tracking-widest text-[11px] sm:text-xs transition-all flex items-center justify-center gap-2 text-center"
                    >
                      <Code2 className="w-4 h-4" />
                      <span>View GitHub Repository</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: High-Impact Case Study Brief */}
              <div className="lg:col-span-7 flex flex-col gap-5 sm:gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-emerald-500/10 text-emerald-600 font-extrabold text-[10px] uppercase tracking-widest rounded-full border border-emerald-500/20">
                      Handcrafted Case Study
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-3xl font-black text-[#000000] leading-tight">
                    {activeModalProject.title}
                  </h3>
                </div>

                {/* The Challenge Block */}
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#f8f9fb] border border-gray-200 border-l-4 border-l-amber-500">
                  <h4 className="text-xs font-black uppercase tracking-widest text-amber-700 mb-2 flex items-center gap-1.5">
                    <span>01. The Business Challenge</span>
                  </h4>
                  <p className="text-gray-800 text-xs sm:text-sm leading-relaxed font-medium">
                    {activeModalProject.challenge ||
                      'The client needed a custom, high-speed web solution to streamline operations, eliminate bloated legacy plugins, and deliver a sub-second user experience across all devices.'}
                  </p>
                </div>

                {/* Technical Architecture & Solution Block */}
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#f8f9fb] border border-gray-200 border-l-4 border-l-[#0051d5]">
                  <h4 className="text-xs font-black uppercase tracking-widest text-[#0051d5] mb-2 flex items-center gap-1.5">
                    <span>02. Engineering & Solution Architecture</span>
                  </h4>
                  <p className="text-gray-800 text-xs sm:text-sm leading-relaxed font-medium">
                    {activeModalProject.solution && activeModalProject.solution !== activeModalProject.challenge
                      ? activeModalProject.solution
                      : 'Ravi Hadwani architected a decoupled Headless WordPress REST API backend paired with a custom Next.js 16 frontend. Implemented ISR caching, responsive UI component libraries, and optimized asset pipelines for maximum conversion.'}
                  </p>
                </div>

                {/* Key Deliverables Summary */}
                <div className="p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-[#000000] text-white">
                  <h4 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">
                    Project Deliverables & Standards
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-semibold text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Custom Next.js App Router</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>Headless WP REST Integration</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>SEO & Schema Markup</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <span>100% Mobile & Desktop Tested</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
