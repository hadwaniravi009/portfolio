import Link from 'next/link';
import { getBlogPosts } from '@/lib/wordpress';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NewsletterForm from '@/components/NewsletterForm';
import { ArrowRight, ArrowUpRight, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getBlogPosts();
  const featuredPost = posts.find((p) => p.featured) || posts[0];
  const gridPosts = posts.filter((p) => p.id !== featuredPost?.id);

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#e2e2e2] selection:bg-[#0051d5] selection:text-white overflow-x-hidden">
      <CustomCursor />
      <Navbar />

      {/* Ambient Glow Orbs */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#14213D] rounded-full blur-[140px] opacity-25 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#0051d5] rounded-full blur-[150px] opacity-15 pointer-events-none z-0"></div>

      <main className="pt-32 pb-24 relative z-10">
        {/* Page Header */}
        <section className="px-6 md:px-16 max-w-[1440px] mx-auto mb-16 md:mb-20">
          <div className="max-w-4xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-[#0051d5] mb-4 block">
              Thoughts & Experiments
            </span>
            <h1 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white mb-6">
              Insights & Perspectives
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl leading-relaxed font-normal">
              Exploring the intersection of high-performance frontend engineering, fluid UI design systems, and modern web application architecture.
            </p>
          </div>
        </section>

        {/* Featured Post Card */}
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
                    <span className="px-4 py-1 bg-[#0051d5]/30 border border-[#0051d5]/50 text-white rounded-full text-xs font-bold uppercase tracking-wider">
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

          {/* Pagination Controls */}
          <div className="flex justify-center mt-16 gap-3">
            <button
              suppressHydrationWarning
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:border-[#0051d5] hover:text-white transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              suppressHydrationWarning
              className="w-11 h-11 rounded-full bg-[#0051d5] text-white flex items-center justify-center font-bold text-xs shadow-md"
            >
              1
            </button>
            <button
              suppressHydrationWarning
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:border-[#0051d5] hover:text-white transition-all font-bold text-xs"
            >
              2
            </button>
            <button
              suppressHydrationWarning
              className="w-11 h-11 rounded-full border border-white/20 flex items-center justify-center text-gray-400 hover:border-[#0051d5] hover:text-white transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
