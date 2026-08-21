import Link from 'next/link';
import { ArrowUpRight, Mail, Globe } from 'lucide-react';

export default function AuthorBio() {
  return (
    <div className="bg-[#0f1218]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden my-12">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
        <div className="relative">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[#0051d5] to-[#6039d5] p-0.5 shadow-xl flex-shrink-0">
            <div className="w-full h-full rounded-2xl bg-[#090b0e] flex items-center justify-center font-extrabold text-2xl text-white">
              RH
            </div>
          </div>
          <span
            className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-black flex items-center justify-center"
            title="Available for work"
          >
            <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          </span>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#0051d5] block">
                Written By
              </span>
              <h3 className="text-xl font-extrabold text-white">Ravi Hadwani</h3>
            </div>
            <Link
              href="/#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#0051d5] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              <span>Get In Touch</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Senior Frontend Engineer & UI/UX Specialist crafting high-performance, scalable web
            architectures with Next.js, React, and bespoke WordPress systems.
          </p>

          <div className="flex items-center gap-2.5">
            {/* GitHub */}
            <a
              href="https://github.com/hadwaniravi"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0051d5] border border-white/10 hover:border-transparent text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              title="GitHub"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/ravihadwani"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0051d5] border border-white/10 hover:border-transparent text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              title="LinkedIn"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.45 1.45 0 0 0 1.45-1.45c0-.8-.65-1.45-1.45-1.45a1.45 1.45 0 0 0-1.45 1.45c0 .8.65 1.45 1.45 1.45m1.39 9.74v-8.37H5.07v8.37h2.78z" />
              </svg>
            </a>

            {/* Website */}
            <a
              href="https://ravihadwani.in"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0051d5] border border-white/10 hover:border-transparent text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              title="Portfolio Website"
            >
              <Globe className="w-4 h-4" />
            </a>

            {/* Email */}
            <a
              href="mailto:contact@ravihadwani.in"
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-[#0051d5] border border-white/10 hover:border-transparent text-gray-300 hover:text-white flex items-center justify-center transition-colors"
              title="Email Ravi"
            >
              <Mail className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
