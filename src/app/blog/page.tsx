import Link from 'next/link';
import { getBlogPosts } from '@/lib/wordpress';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { ArrowRight, ArrowUpRight, Mail, ChevronLeft, ChevronRight, Search, Sparkles } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPageProps {
  searchParams?: Promise<{ search?: string; category?: string }>;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const resolvedParams = searchParams ? await searchParams : {};
  const searchQuery = resolvedParams.search?.toLowerCase().trim() || '';
  const selectedCategory = resolvedParams.category?.trim() || '';

  const allPosts = await getBlogPosts();

  // Filter posts if search or category is present
  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      !searchQuery ||
      post.title.toLowerCase().includes(searchQuery) ||
      post.excerpt.toLowerCase().includes(searchQuery) ||
      post.category.toLowerCase().includes(searchQuery);

    const matchesCategory =
      !selectedCategory ||
      post.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const featuredPost = !searchQuery && !selectedCategory
    ? allPosts.find((p) => p.featured) || allPosts[0]
    : null;

  const gridPosts = featuredPost
    ? filteredPosts.filter((p) => p.id !== featuredPost.id)
    : filteredPosts;

  const categories = Array.from(new Set(allPosts.map((p) => p.category)));

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#e2e2e2] selection:bg-[#0051d5] selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Ambient Glow Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#14213D] rounded-full blur-[140px] opacity-25 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#0051d5] rounded-full blur-[150px] opacity-15 pointer-events-none z-0"></div>

      <main className="pt-32 pb-24 relative z-10">
        {/* Page Header */}
        <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-12 md:mb-16">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0051d5] mb-4 block">
              Thoughts & Insights
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Engineering & Design Insights
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-normal">
              Deep dives into scalable design systems, Next.js performance optimizations, WordPress architectures, and modern web application development.
            </p>
          </div>

          {/* Filter / Search Bar */}
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 pt-8 border-t border-white/10">
            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  !selectedCategory && !searchQuery
                    ? 'bg-[#0051d5] text-white shadow-md'
                    : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                All Articles
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat}
                  href={`/blog?category=${encodeURIComponent(cat)}`}
                  className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedCategory.toLowerCase() === cat.toLowerCase()
                      ? 'bg-[#0051d5] text-white shadow-md'
                      : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {cat}
                </Link>
              ))}
            </div>

            {searchQuery && (
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span>Search results for:</span>
                <span className="text-white font-bold bg-white/10 px-2.5 py-1 rounded-lg border border-white/10">
                  "{searchQuery}"
                </span>
                <Link href="/blog" className="text-[#0051d5] hover:underline font-semibold ml-2">
                  Clear
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Featured Post Card (shown when not filtering) */}
        {featuredPost && (
          <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-20">
            <Link href={`/blog/${featuredPost.slug}`} className="group block">
              <div className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Hero Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent flex flex-col justify-end p-8 md:p-16">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="px-4 py-1 bg-[#0051d5]/40 border border-[#0051d5]/60 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                      Featured
                    </span>
                    <span className="px-4 py-1 bg-white/10 backdrop-blur-md text-gray-300 rounded-full text-xs font-bold uppercase tracking-wider">
                      {featuredPost.category}
                    </span>
                    <span className="px-4 py-1 bg-white/10 backdrop-blur-md text-gray-300 rounded-full text-xs font-bold uppercase tracking-wider">
                      {featuredPost.readTime}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-5xl font-extrabold text-white max-w-4xl mb-4 group-hover:text-[#b4c5ff] transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="hidden md:block text-gray-300 text-base max-w-2xl mb-6 line-clamp-2">
                    {featuredPost.excerpt}
                  </p>

                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0051d5] group-hover:text-white transition-colors">
                    <span>Read full story</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* Blog Grid */}
        <section className="px-6 md:px-16 max-w-[1440px] mx-auto">
          {gridPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
              {gridPosts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden flex flex-col hover:border-[#0051d5] hover:-translate-y-2 hover:bg-white/10 transition-all duration-400 group"
                >
                  <div className="relative aspect-video overflow-hidden bg-white/5">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 left-4 px-3 py-1 bg-black/70 backdrop-blur-md text-[#b4c5ff] font-bold text-[10px] uppercase rounded-full border border-white/10">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold uppercase text-gray-400 block mb-3">
                        {post.date}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#b4c5ff] transition-colors leading-snug">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed mb-6 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-xs font-bold text-gray-300 hover:text-white uppercase tracking-widest flex items-center gap-1 group/link"
                      >
                        <span>Read More</span>
                        <ArrowUpRight className="w-4 h-4 text-[#0051d5] group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </Link>
                      <span className="text-[11px] text-gray-500">{post.readTime}</span>
                    </div>
                  </div>
                </article>
              ))}

              {/* Newsletter Bento Item */}
              <div className="bg-gradient-to-br from-[#0051d5] to-[#003ea8] text-white rounded-3xl p-8 flex flex-col justify-between shadow-xl border border-white/20">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-extrabold mb-3">Stay Ahead of the Curve</h3>
                  <p className="text-white/80 text-sm mb-6 leading-relaxed">
                    Get monthly curated engineering insights, design tips, and Next.js resources delivered straight to your inbox.
                  </p>
                </div>

                <NewsletterForm />
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10 p-10">
              <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No matching insights found</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-md mx-auto">
                We couldn't find any articles matching your search criteria. Try a different search term or category.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center px-6 py-2.5 rounded-full bg-[#0051d5] text-white text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all"
              >
                View All Articles
              </Link>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
