'use client';

import { useState } from 'react';
import { Project } from '@/lib/wordpress';
import { ExternalLink, Code2, X, Eye } from 'lucide-react';

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'WordPress', 'Next.js', 'React'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter(
          (p) =>
            p.category.toLowerCase() === selectedCategory.toLowerCase() ||
            p.tags.some((t) => t.toLowerCase() === selectedCategory.toLowerCase())
        );

  return (
    <section className="py-24 bg-white" id="projects">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-2 block">
              Featured Work
            </span>
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-[#000000]">
              Selected Projects
            </h2>
            <p className="text-[#444748] mt-2 text-base">
              A showcase of high-performance web solutions, headless setups, and detailed case studies.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                suppressHydrationWarning
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#000000] text-white shadow-md'
                    : 'bg-[#f2f4f6] text-[#444748] hover:bg-[#edeef0] hover:text-[#000000]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {filteredProjects.map((project) => (
            <div key={project.id} className="group flex flex-col">
              {/* Image Container with Hover Overlay */}
              <div className="relative aspect-video overflow-hidden rounded-3xl border border-[#c4c7c7]/30 bg-[#edeef0] shadow-md group-hover:shadow-2xl transition-all duration-700">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-card-image w-full h-full object-cover rounded-3xl"
                />

                {/* Glass Hover Overlay */}
                <div className="absolute inset-0 bg-[#000000]/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-4 backdrop-blur-sm rounded-3xl">
                  <button
                    suppressHydrationWarning
                    onClick={() => setActiveModalProject(project)}
                    className="bg-white text-[#000000] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-[#0051d5] hover:text-white transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 shadow-lg"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Quick Preview</span>
                  </button>
                  {project.liveUrl && project.liveUrl !== '#' && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="border border-white text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-[#000000] transition-all flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span>Visit Site</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Text Info & Challenge */}
              <div className="mt-6 flex flex-col md:flex-row gap-6 px-2">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[#000000] mb-2">{project.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs font-bold uppercase tracking-wider text-[#0051d5]">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="md:w-3/5">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#747878] mb-1">
                    The Challenge
                  </p>
                  <p className="text-[#444748] text-sm leading-relaxed">{project.challenge}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      {activeModalProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-fade-in-up">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 relative shadow-2xl border border-gray-200">
            <button
              suppressHydrationWarning
              onClick={() => setActiveModalProject(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-black transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <img
              src={activeModalProject.image}
              alt={activeModalProject.title}
              className="w-full aspect-video object-cover rounded-2xl mb-6 shadow-sm"
            />

            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 bg-[#0051d5]/10 text-[#0051d5] font-bold text-xs rounded-full uppercase">
                {activeModalProject.category}
              </span>
            </div>

            <h3 className="text-3xl font-extrabold text-[#000000] mb-4">
              {activeModalProject.title}
            </h3>

            <div className="space-y-4 mb-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                  Challenge
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {activeModalProject.challenge}
                </p>
              </div>

              {activeModalProject.solution && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-1">
                    Solution & Technical Implementation
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {activeModalProject.solution}
                  </p>
                </div>
              )}
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              {activeModalProject.tags.map((t) => (
                <span
                  key={t}
                  className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-semibold rounded-lg"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex gap-4 border-t pt-6">
              {activeModalProject.liveUrl && activeModalProject.liveUrl !== '#' && (
                <a
                  href={activeModalProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#000000] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#0051d5] transition-all flex items-center gap-2"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Live Demo</span>
                </a>
              )}
              <button
                suppressHydrationWarning
                onClick={() => setActiveModalProject(null)}
                className="bg-gray-100 text-gray-800 px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
