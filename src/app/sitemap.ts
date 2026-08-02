import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/wordpress';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://hadwaniravi.vercel.app';

  // Fetch dynamic blog posts from WordPress
  let posts: Array<{ slug: string }> = [];
  try {
    posts = await getBlogPosts();
  } catch (error) {
    console.error('Sitemap WP fetch error:', error);
  }

  const blogUrls: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  return [...routes, ...blogUrls];
}
