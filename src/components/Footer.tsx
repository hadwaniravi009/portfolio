'use client';

import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#000000] text-white py-16 border-t border-white/10">
      <div className="max-w-[1440px] mx-auto px-6 md:px-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-extrabold text-2xl tracking-tighter text-white">
              Ravi Hadwani
            </span>
            <span className="text-xs uppercase px-3 py-1 bg-white/10 rounded-full font-semibold text-gray-300">
              Senior Developer
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs uppercase tracking-widest font-bold text-gray-400">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://github.com/hadwaniravi009" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
              GitHub
            </a>
            <a href="mailto:hadwaniravi009@gmail.com" className="hover:text-white transition-colors">
              Email
            </a>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 gap-4">
          <div className="text-xs text-gray-500 uppercase tracking-widest font-medium">
            © {new Date().getFullYear()} RAVI HADWANI — HANDCRAFTED WITH PRECISION
          </div>

          <button
            onClick={scrollToTop}
            suppressHydrationWarning
            className="flex items-center gap-2 text-xs uppercase tracking-widest font-bold text-gray-400 hover:text-white transition-colors group"
          >
            <span>Back to top</span>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#0051d5] transition-colors">
              <ArrowUp className="w-4 h-4 text-white" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
