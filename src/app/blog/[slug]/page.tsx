import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getBlogPostBySlug, getBlogPosts, BlogPost } from '@/lib/wordpress';
import CustomCursor from '@/components/CustomCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ReadingProgressBar from '@/components/ReadingProgressBar';
import SocialShareBar from '@/components/blog/SocialShareBar';
import BlogSidebar from '@/components/blog/BlogSidebar';
import AuthorBio from '@/components/blog/AuthorBio';
import BlogComments from '@/components/blog/BlogComments';
import PostNavigation from '@/components/blog/PostNavigation';
import { HeadingItem } from '@/components/blog/TableOfContents';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  ChevronRight,
  Clock,
  Calendar,
  Eye,
  MessageSquare,
  Sparkles,
  Code2,
  CheckCircle,
  Lightbulb,
} from 'lucide-react';

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

function processContentAndHeadings(contentHtml: string) {
  const headings: HeadingItem[] = [];
  let headingCount = 0;

  // Replace h2 and h3 to inject unique ids and collect headings for TOC
  const processedHtml = contentHtml.replace(
    /<(h[23])([^>]*)>(.*?)<\/\1>/gi,
    (match, tag, attrs, text) => {
      const level = tag.toLowerCase() === 'h2' ? 2 : 3;
      const cleanText = text.replace(/<[^>]+>/g, '').trim();

      const idMatch = attrs.match(/id=["']([^"']+)["']/i);
      let id = idMatch ? idMatch[1] : '';

      if (!id) {
        id =
          cleanText
            .toLowerCase()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-') || `section-${++headingCount}`;
      }

      headings.push({
        id,
        text: cleanText,
        level,
      });

      if (!idMatch) {
        return `<${tag}${attrs} id="${id}" class="scroll-mt-28">${text}</${tag}>`;
      } else {
        return `<${tag}${attrs} class="scroll-mt-28">${text}</${tag}>`;
      }
    }
  );

  return {
    processedHtml,
    headings,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  const allPosts = await getBlogPosts();

  if (!post) {
    notFound();
  }

  // Extract headings and inject IDs for Table of Contents
  const { processedHtml, headings } = processContentAndHeadings(post.content);

  // If content had no headings in markup, provide fallback structure
  const finalHeadings: HeadingItem[] =
    headings.length > 0
      ? headings
      : [
          { id: 'overview', text: 'Overview & Architecture', level: 2 },
          { id: 'key-takeaways', text: 'Key Strategies & Patterns', level: 2 },
          { id: 'conclusion', text: 'Summary & Conclusion', level: 2 },
        ];

  // Navigation: prev and next posts
  const currentIndex = allPosts.findIndex((p) => p.id === post.id);
  const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
  const nextPost = currentIndex >= 0 && currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

  // Sidebar posts lists
  const trendingPosts = allPosts.slice(0, 4);
  const relatedPosts = allPosts
    .filter((p) => p.id !== post.id && p.category === post.category)
    .slice(0, 3);
  const fallbackRelated =
    relatedPosts.length < 3
      ? [
          ...relatedPosts,
          ...allPosts.filter((p) => p.id !== post.id && !relatedPosts.some((r) => r.id === p.id)),
        ].slice(0, 3)
      : relatedPosts;

  const recentPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const recommendedPosts = allPosts.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="relative min-h-screen bg-[#000000] text-[#e2e2e2] selection:bg-[#0051d5] selection:text-white overflow-x-hidden">
      <ReadingProgressBar />
      <CustomCursor />
      <Navbar />

      {/* Ambient Glow Background */}
      <div className="fixed top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#14213D] rounded-full blur-[160px] opacity-25 pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-[#0051d5] rounded-full blur-[150px] opacity-15 pointer-events-none z-0"></div>

      <main className="relative z-10 pt-28 pb-20">
        {/* Top Breadcrumb Bar */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-16 mb-8">
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-400 overflow-x-auto whitespace-nowrap py-1">
            <Link href="/" className="hover:text-white transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <Link href="/blog" className="hover:text-white transition-colors">
              Blog Insights
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="text-[#0051d5] font-bold">{post.category}</span>
            <ChevronRight className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
            <span className="text-gray-300 truncate max-w-[280px] md:max-w-md">{post.title}</span>
          </nav>
        </div>

        {/* Article Header & Cover */}
        <header className="max-w-[1440px] mx-auto px-6 md:px-16 mb-12">
          <div className="space-y-5 max-w-5xl">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3.5 py-1 bg-[#0051d5] text-white font-bold text-xs uppercase tracking-widest rounded-full shadow-md">
                {post.category}
              </span>
              <span className="px-3 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs font-semibold rounded-full flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#0051d5]" />
                {post.readTime}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold text-white leading-[1.15] tracking-tight">
              {post.title}
            </h1>

            {/* Author Meta Row */}
            <div className="flex flex-wrap items-center justify-between gap-6 pt-4 border-t border-white/10 text-xs text-gray-400">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#0051d5] to-[#6039d5] p-0.5 shadow-md flex-shrink-0">
                  <div className="w-full h-full rounded-full bg-[#090b0e] flex items-center justify-center font-bold text-white text-sm">
                    RH
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-bold text-sm">Ravi Hadwani</span>
                    <span className="w-3.5 h-3.5 rounded-full bg-[#0051d5] text-white flex items-center justify-center text-[8px] font-black" title="Verified Author">
                      ✓
                    </span>
                  </div>
                  <span className="text-[11px] text-gray-400">
                    Senior Frontend Specialist & UI Architect
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5 text-xs text-gray-400 font-medium">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span>{post.date}</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5 text-gray-500" />
                  <span>2 Comments</span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-gray-500" />
                  <span>1.4k Views</span>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image Frame */}
          <div className="mt-8 relative aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden border border-white/15 shadow-2xl">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>
        </header>

        {/* Main Content Layout with 3-Column AccuWeb Structure */}
        <div className="max-w-[1440px] mx-auto px-6 md:px-16">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-10 items-start">
            {/* Left Floating Social Share Column (Desktop) */}
            <div className="hidden xl:block xl:col-span-1">
              <SocialShareBar title={post.title} />
            </div>

            {/* Middle Main Article Column */}
            <article className="xl:col-span-7 space-y-8">
              {/* Main Content Body Card */}
              <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 sm:p-10 md:p-12 shadow-2xl">
                {/* Excerpt / Lead Box */}
                <div className="mb-8 pb-8 border-b border-white/10">
                  <p className="text-xl sm:text-2xl text-white/95 leading-relaxed font-light first-letter:text-5xl first-letter:font-extrabold first-letter:text-[#0051d5] first-letter:mr-3 first-letter:float-left">
                    {post.excerpt}
                  </p>
                </div>

                {/* Key Takeaways Callout Box (AccuWeb style highlight) */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-[#0051d5]/15 via-[#0051d5]/5 to-transparent border-l-4 border-[#0051d5] border-y border-r border-white/10 mb-10 shadow-lg">
                  <div className="flex items-center gap-2.5 text-[#0051d5] font-extrabold text-xs uppercase tracking-wider mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Key Takeaway & Best Practice</span>
                  </div>
                  <p className="text-sm text-gray-200 leading-relaxed">
                    Engineering scalable design tokens and resilient frontend component patterns early in the development lifecycle directly cuts technical debt, accelerates team velocity, and guarantees consistency across enterprise release cycles.
                  </p>
                </div>

                {/* Formatted HTML Content */}
                <div className="prose prose-invert prose-blue max-w-none text-gray-300 text-base sm:text-lg leading-relaxed space-y-6">
                  <div
                    className="space-y-6 [&_h2]:text-2xl [&_h2]:sm:text-3xl [&_h2]:font-extrabold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-4 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3 [&_p]:leading-relaxed [&_p]:text-gray-300 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:space-y-2 [&_li]:text-gray-300 [&_code]:text-[#b4c5ff] [&_code]:bg-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded [&_code]:text-sm"
                    dangerouslySetInnerHTML={{ __html: processedHtml }}
                  />

                  {/* Pull Quote */}
                  <blockquote className="relative py-8 px-6 sm:px-8 my-10 border-y border-white/15 text-center flex flex-col items-center justify-center bg-white/[0.02] rounded-2xl">
                    <p className="text-xl sm:text-2xl font-extrabold text-white italic max-w-2xl leading-snug">
                      "Design systems are not just about components; they are about operational communication and architectural predictability."
                    </p>
                    <span className="text-xs font-bold text-[#0051d5] uppercase tracking-widest mt-3 block">
                      — Ravi Hadwani, Frontend Architect
                    </span>
                  </blockquote>

                  {/* Interactive Code Sample Block */}
                  <div className="bg-[#090b0e] rounded-2xl p-5 sm:p-6 border border-white/10 font-mono text-xs text-gray-300 overflow-x-auto my-8 shadow-2xl">
                    <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-white/10 text-gray-400 text-[11px]">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-4 h-4 text-[#0051d5]" />
                        <span className="font-semibold text-gray-300">DataTable.tsx</span>
                      </div>
                      <span className="text-[10px] text-gray-500 uppercase">Compound Component Pattern</span>
                    </div>
                    <pre className="text-gray-300 leading-relaxed">
                      <span className="text-[#0051d5]">const</span> <span className="text-emerald-400">DataTable</span> = ({'{'} children {'}'}) =&gt; {'{\n'}
                      {'  '}<span className="text-gray-500">// Orchestrated internal state management</span>{'\n'}
                      {'  '}<span className="text-[#0051d5]">return</span> ({'\n'}
                      {'    '}&lt;<span className="text-emerald-400">TableProvider</span> value={'{'}tableState{'}'}&gt;{'\n'}
                      {'      '}&lt;<span className="text-emerald-400">Container</span>&gt;{'{'}children{'}'}&lt;/<span className="text-emerald-400">Container</span>&gt;{'\n'}
                      {'    '}&lt;/<span className="text-emerald-400">TableProvider</span>&gt;{'\n'}
                      {'  '});{'\n'}
                      {'}'};
                    </pre>
                  </div>
                </div>

                {/* Tags & Categories Pill Bar */}
                <div className="mt-10 pt-6 border-t border-white/10 flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase text-gray-400 mr-2">Topic Tags:</span>
                  {['Architecture', 'Next.js', 'Performance', 'React', 'Design Systems'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-xs text-gray-300 font-medium transition-colors"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio Box */}
              <AuthorBio />

              {/* Prev / Next Post Navigation */}
              <PostNavigation prevPost={prevPost} nextPost={nextPost} />

              {/* Comments & Discussion Section */}
              <BlogComments postTitle={post.title} />
            </article>

            {/* Right Sidebar Column (AccuWeb Hosting Structure) */}
            <aside className="xl:col-span-4 w-full">
              <BlogSidebar
                headings={finalHeadings}
                trendingPosts={trendingPosts}
                relatedPosts={fallbackRelated}
                recentPosts={recentPosts}
                allPosts={allPosts}
                currentPostId={post.id}
              />
            </aside>
          </div>
        </div>

        {/* Recommended Articles Section at the bottom */}
        {recommendedPosts.length > 0 && (
          <section className="bg-[#090b0e] py-20 px-6 md:px-16 border-t border-white/10 mt-20">
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
