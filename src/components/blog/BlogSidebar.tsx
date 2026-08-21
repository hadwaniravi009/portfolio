'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/lib/wordpress';
import TableOfContents, { HeadingItem } from './TableOfContents';
import {
  Search,
  TrendingUp,
  Clock,
  Sparkles,
  BookOpen,
  ArrowRight,
  Send,
  X,
  Flame,
  Calendar,
  Layers,
} from 'lucide-react';

interface BlogSidebarProps {
  headings: HeadingItem[];
  trendingPosts: BlogPost[];
  relatedPosts: BlogPost[];
  recentPosts: BlogPost[];
  allPosts: BlogPost[];
  currentPostId: string | number;
}

export default function BlogSidebar({
  headings,
  trendingPosts,
  relatedPosts,
  recentPosts,
  allPosts,
  currentPostId,
}: BlogSidebarProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Live filter posts for instant search popup
  const searchResults = searchQuery.trim()
    ? allPosts
        .filter((p) => {
          const q = searchQuery.toLowerCase().trim();
          return (
            p.title.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q) ||
            p.excerpt.toLowerCase().includes(q) ||
            p.slug.toLowerCase().includes(q)
          );
        })
        .slice(0, 5)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/blog?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="space-y-8">
      {/* 1. SEARCH BLOG WIDGET */}
      <div className="bg-[#0f1218]/95 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl relative z-30">
        <div className="flex items-center gap-2.5 pb-3.5 mb-3.5 border-b border-white/10">
          <div className="w-7 h-7 rounded-lg bg-[#0051d5]/20 border border-[#0051d5]/40 flex items-center justify-center text-[#0051d5]">
            <Search className="w-4 h-4" />
          </div>
          <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
            Search Blog
          </h3>
        </div>

        <form onSubmit={handleSearchSubmit} className="relative">
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search articles, topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 250)}
              className="w-full bg-white/5 border border-white/15 focus:border-[#0051d5] rounded-xl py-2.5 pl-10 pr-9 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#0051d5] transition-all"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-gray-400 hover:text-white p-0.5 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </form>

        {/* Live Search Instant Results Dropdown */}
        {isSearchFocused && searchQuery.trim().length > 0 && (
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] bg-[#12161f]/98 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] p-3 z-50 space-y-2">
            <div className="px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-400 border-b border-white/10 flex justify-between items-center">
              <span>Matching Articles</span>
              <span className="text-[#0051d5] font-semibold">{searchResults.length} found</span>
            </div>

            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Link
                  key={result.id}
                  href={`/blog/${result.slug}`}
                  className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
                >
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-white/10"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-semibold text-white group-hover:text-[#b4c5ff] transition-colors line-clamp-1">
                      {result.title}
                    </p>
                    <span className="text-[10px] text-[#0051d5] font-medium block mt-0.5">
                      {result.category}
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-xs text-gray-400 text-center py-3">No matching articles found</p>
            )}

            <button
              onClick={handleSearchSubmit}
              className="w-full py-2 text-center text-xs font-bold text-[#0051d5] hover:text-white hover:bg-white/5 rounded-lg transition-colors border-t border-white/10 pt-2 block"
            >
              View all results on blog page →
            </button>
          </div>
        )}
      </div>

      {/* 2. STICKY TABLE OF CONTENTS */}
      {headings.length > 0 && (
        <div className="sticky top-28 z-20">
          <TableOfContents headings={headings} />
        </div>
      )}

      {/* 3. TRENDING ON RAVI'S INSIGHTS (TRENDING POSTS) */}
      {trendingPosts.length > 0 && (
        <div className="bg-[#0f1218]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white flex items-center gap-2">
              <span>Trending Insights</span>
              <span className="px-1.5 py-0.5 text-[9px] font-bold uppercase bg-amber-500/20 text-amber-300 rounded border border-amber-500/30">
                Hot
              </span>
            </h3>
          </div>

          <div className="space-y-4">
            {trendingPosts.map((post, idx) => {
              const rank = String(idx + 1).padStart(2, '0');
              const isCurrent = post.id === currentPostId;
              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className={`group flex items-start gap-3.5 p-2 rounded-xl transition-all duration-200 ${
                    isCurrent
                      ? 'bg-white/5 border border-white/10 pointer-events-none'
                      : 'hover:bg-white/5 hover:translate-x-1'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-14 h-14 rounded-xl object-cover border border-white/10 group-hover:border-[#0051d5] transition-colors"
                    />
                    <span
                      className={`absolute -top-1.5 -left-1.5 w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center shadow-md ${
                        idx === 0
                          ? 'bg-amber-400 text-black'
                          : idx === 1
                          ? 'bg-slate-200 text-black'
                          : 'bg-[#0051d5] text-white'
                      }`}
                    >
                      {rank}
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#0051d5] block mb-1">
                      {post.category}
                    </span>
                    <h4 className="text-xs font-bold text-gray-200 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                      {post.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1.5 text-[10px] text-gray-500">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <div className="bg-[#0f1218]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Related Posts
            </h3>
          </div>

          <div className="space-y-3.5">
            {relatedPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group block p-2.5 rounded-xl bg-white/[0.02] hover:bg-white/5 border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-1.5">
                  <span className="font-semibold text-emerald-400">{post.category}</span>
                  <span>{post.date}</span>
                </div>
                <h4 className="text-xs font-bold text-gray-200 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                  {post.title}
                </h4>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 5. RECENT POSTS */}
      {recentPosts.length > 0 && (
        <div className="bg-[#0f1218]/90 backdrop-blur-xl border border-white/10 rounded-2xl p-5 shadow-xl">
          <div className="flex items-center gap-2.5 pb-3.5 mb-4 border-b border-white/10">
            <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-extrabold uppercase tracking-wider text-white">
              Recent Posts
            </h3>
          </div>

          <div className="space-y-3">
            {recentPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex items-center gap-3 p-1.5 rounded-xl hover:bg-white/5 transition-all"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-11 h-11 rounded-lg object-cover flex-shrink-0 border border-white/10"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-gray-300 group-hover:text-white leading-snug line-clamp-2 transition-colors">
                    {post.title}
                  </h4>
                  <span className="text-[10px] text-gray-500 mt-1 block">{post.date}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* 6. HIRE / CONSULTATION CARD */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#0051d5]/30 via-[#0f1218] to-[#14213d]/60 border border-[#0051d5]/40 rounded-2xl p-6 shadow-xl">
        <div className="absolute top-0 right-0 w-24 h-24 bg-[#0051d5]/20 rounded-full blur-2xl pointer-events-none" />
        <div className="w-8 h-8 rounded-xl bg-[#0051d5] flex items-center justify-center text-white mb-4 shadow-lg">
          <Sparkles className="w-4 h-4" />
        </div>
        <h4 className="text-base font-extrabold text-white mb-2 leading-tight">
          Need a Custom High-Performance Website?
        </h4>
        <p className="text-xs text-gray-300 mb-5 leading-relaxed font-normal">
          Let's collaborate on your next Next.js, WordPress, or bespoke design system project.
        </p>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-[#0051d5] hover:bg-white hover:text-black text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group"
        >
          <span>Start a Project</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
