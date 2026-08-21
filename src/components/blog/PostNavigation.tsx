import Link from 'next/link';
import { BlogPost } from '@/lib/wordpress';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PostNavigationProps {
  prevPost: BlogPost | null;
  nextPost: BlogPost | null;
}

export default function PostNavigation({ prevPost, nextPost }: PostNavigationProps) {
  if (!prevPost && !nextPost) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-10 pt-8 border-t border-white/10">
      {prevPost ? (
        <Link
          href={`/blog/${prevPost.slug}`}
          className="group flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-[#0051d5] transition-all"
        >
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#0051d5] mb-2">
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
            <span>Previous Insight</span>
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-[#b4c5ff] line-clamp-2 transition-colors">
            {prevPost.title}
          </h4>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      {nextPost && (
        <Link
          href={`/blog/${nextPost.slug}`}
          className="group flex flex-col justify-between p-5 rounded-2xl bg-white/[0.02] hover:bg-white/5 border border-white/10 hover:border-[#0051d5] transition-all text-right items-end"
        >
          <div className="flex items-center justify-end gap-2 text-xs font-bold uppercase tracking-wider text-[#0051d5] mb-2">
            <span>Next Insight</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
          <h4 className="text-sm font-bold text-white group-hover:text-[#b4c5ff] line-clamp-2 transition-colors">
            {nextPost.title}
          </h4>
        </Link>
      )}
    </div>
  );
}
