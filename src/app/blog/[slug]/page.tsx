import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/wordpress';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import { ArrowLeft, ArrowUpRight, ArrowRight, Share2, Link as LinkIcon, Bookmark, Sparkles, Code2 } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const allPosts = await getBlogPosts();

  if (!post) {
    notFound();
  }

  const recommendedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#e2e2e2] selection:bg-[#0051d5] selection:text-white overflow-x-hidden">
      <ReadingProgressBar />
      <CustomCursor />
      <Navbar />

      {/* Ambient Glow background */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#14213D] rounded-full blur-[160px] opacity-25 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#0051d5] rounded-full blur-[150px] opacity-15 pointer-events-none z-0"></div>

      <main className="relative z-10 pt-20">
        {/* Hero Section */}
        <header className="relative w-full min-h-[500px] md:min-h-[580px] flex flex-col justify-end px-6 md:px-16 pb-12 overflow-hidden border-b border-white/10">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent z-10"></div>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="max-w-[1440px] mx-auto w-full z-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0051d5] hover:text-white transition-colors mb-6 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>Back to Insights</span>
            </Link>

            <div className="space-y-4">
              <span className="inline-block px-4 py-1.5 bg-[#0051d5] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md">
                {post.category}
              </span>

              <h1 className="text-3xl md:text-6xl font-extrabold text-white max-w-5xl leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-gray-400 pt-4 text-xs font-semibold uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#0051d5] flex items-center justify-center font-bold text-white text-sm shadow-md">
                    RH
                  </div>
                  <span className="text-white font-bold text-sm">Ravi Hadwani</span>
                </div>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                <span>{post.date}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-gray-600"></span>
                <span className="text-[#0051d5]">{post.readTime}</span>
              </div>
            </div>
          </div>
        </header>

        {/* Article Layout Grid */}
        <article className="px-6 md:px-16 py-16 max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Sticky Table of Contents Sidebar */}
            <aside className="hidden lg:block lg:col-span-3">
              <div className="sticky top-32 space-y-10">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-4">
                    Table of Contents
                  </p>
                  <ul className="space-y-3 text-sm text-gray-400">
                    <li className="text-white font-bold hover:text-[#0051d5] transition-colors cursor-pointer border-l-2 border-[#0051d5] pl-3">
                      Overview & Architecture
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer pl-3">
                      Component Patterns
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer pl-3">
                      Performance Tradeoffs
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer pl-3">
                      Conclusion
                    </li>
                  </ul>
                </div>

                <div className="pt-6 border-t border-white/10">
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-4">
                    Share Insight
                  </p>
                  <div className="flex gap-3">
                    <button
                      suppressHydrationWarning
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button
                      suppressHydrationWarning
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all"
                    >
                      <LinkIcon className="w-4 h-4" />
                    </button>
                    <button
                      suppressHydrationWarning
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-[#0051d5] text-gray-300 hover:text-white flex items-center justify-center transition-all"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Article Content Card */}
            <div className="lg:col-span-9 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 md:p-14 shadow-2xl relative">
              <div className="prose prose-invert prose-blue max-w-none text-gray-300 text-lg leading-relaxed space-y-8">
                <p className="text-xl leading-relaxed text-white/90 first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#0051d5] first-letter:mr-3 first-letter:float-left">
                  {post.excerpt}
                </p>

                <div
                  className="space-y-6"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Pull Quote */}
                <blockquote className="relative py-10 px-8 my-10 border-y border-white/15 text-center flex flex-col items-center justify-center bg-white/[0.02] rounded-2xl">
                  <p className="text-2xl md:text-3xl font-extrabold text-white italic max-w-2xl leading-snug">
                    "Design systems are not just about components; they are about operational communication."
                  </p>
                </blockquote>

                {/* Code Sample Block */}
                <div className="bg-[#0d0f0f] rounded-2xl p-6 border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto my-8">
                  <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10 text-gray-500 text-[11px]">
                    <Code2 className="w-4 h-4 text-[#0051d5]" />
                    <span>DataTable.tsx (Compound Component Pattern)</span>
                  </div>
                  <pre className="text-gray-300">
                    <span className="text-[#0051d5]">const</span> <span className="text-emerald-400">DataTable</span> = ({'{'} children {'}'}) =&gt; {'{\n'}
                    {'  '}<span className="text-gray-500">// Internal orchestration logic & state</span>{'\n'}
                    {'  '}<span className="text-[#0051d5]">return</span> ({'\n'}
                    {'    '}&lt;<span className="text-emerald-400">TableProvider</span> value={'{'}tableState{'}'}&gt;{'\n'}
                    {'      '}&lt;<span className="text-emerald-400">Container</span>&gt;{'{'}children{'}'}&lt;/<span className="text-emerald-400">Container</span>&gt;{'\n'}
                    {'    '}&lt;/<span className="text-emerald-400">TableProvider</span>&gt;{'\n'}
                    {'  '});{'\n'}
                    {'}'};
                  </pre>
                </div>
              </div>

              {/* Author Profile Bio Box */}
              <div className="mt-14 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#0051d5] flex items-center justify-center font-bold text-white text-xl shadow-lg">
                    RH
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-lg">Ravi Hadwani</h4>
                    <p className="text-xs text-gray-400 uppercase tracking-widest mt-0.5">
                      Senior Frontend Developer & UI/UX Designer
                    </p>
                  </div>
                </div>

                <Link
                  href="/#contact"
                  className="bg-[#0051d5] text-white px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all shadow-md"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </div>
        </article>

        {/* Recommended Articles Section */}
        {recommendedPosts.length > 0 && (
          <section className="bg-[#0d0f0f] py-20 px-6 md:px-16 border-t border-white/10">
            <div className="max-w-[1440px] mx-auto">
              <div className="flex justify-between items-end mb-12">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-2 block">
                    Continue Reading
                  </span>
                  <h2 className="text-3xl font-extrabold text-white">Recommended For You</h2>
                </div>
                <Link
                  href="/blog"
                  className="hidden md:flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0051d5] hover:text-white transition-colors group"
                >
                  <span>View All Posts</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {recommendedPosts.map((rec) => (
                  <Link
                    key={rec.id}
                    href={`/blog/${rec.slug}`}
                    className="group relative bg-white/5 border border-white/10 p-8 rounded-3xl transition-all hover:border-[#0051d5] hover:-translate-y-1 hover:bg-white/10"
                  >
                    <span className="text-xs font-bold uppercase tracking-widest text-[#0051d5] mb-3 block">
                      {rec.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-[#b4c5ff] transition-colors leading-snug">
                      {rec.title}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-6">{rec.excerpt}</p>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#0051d5] group-hover:text-white transition-colors">
                      <span>Read Article</span>
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
