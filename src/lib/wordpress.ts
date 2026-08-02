export interface Project {
  id: string | number;
  title: string;
  category: string;
  tags: string[];
  image: string;
  challenge: string;
  solution?: string;
  liveUrl?: string;
  githubUrl?: string;
  featured?: boolean;
}

export interface Service {
  id: string | number;
  icon: string;
  title: string;
  description: string;
  tags: string[];
}

export interface Testimonial {
  id: string | number;
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface BlogPost {
  id: string | number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
}

const FALLBACK_PROJECTS: Project[] = [
  {
    id: 1,
    title: 'Corporate Business Website',
    category: 'WordPress',
    tags: ['WordPress', 'PHP', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Modernizing a legacy enterprise platform to handle high traffic while maintaining a strict Swiss-grid layout and sub-2s load times across all global regions.',
    solution: 'Built a headless WordPress setup paired with Next.js SSG caching, reducing server response times by 65%.',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 2,
    title: 'Fine Dining Experience',
    category: 'Next.js',
    tags: ['Next.js', 'React', 'Frontend'],
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Focused on sensory visual design, implementing fluid typography and smooth page transitions that mirror the elegance of the physical dining experience.',
    solution: 'Engineered Framer Motion micro-interactions and pre-rendered image assets for fluid mobile viewing.',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 3,
    title: 'Verve Real Estate',
    category: 'React',
    tags: ['React', 'Framer Motion', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Developing an intuitive map-based search system that handles thousands of listings with real-time updates and zero latency UI responses.',
    solution: 'Integrated custom Mapbox GL shaders and optimistic UI state updates for instantaneous filtering.',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
  {
    id: 4,
    title: 'AI Cloud Platform Landing Page',
    category: 'React',
    tags: ['React', 'Three.js', 'WebGL'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    challenge: 'Implementing advanced WebGL shaders to visualize AI data processing, resulting in a 40% increase in user session duration and brand engagement.',
    solution: 'Authored lightweight GLSL fragment shaders rendered inside an interactive canvas component.',
    liveUrl: '#',
    githubUrl: '#',
    featured: true,
  },
];

const FALLBACK_SERVICES: Service[] = [
  {
    id: 1,
    icon: 'draw',
    title: 'UI/UX Design',
    description: 'Creating intuitive, user-centric interfaces that engage users and convert visitors into loyal clients.',
    tags: ['Figma', 'Prototyping', 'User Research', 'Design Systems'],
  },
  {
    id: 2,
    icon: 'code',
    title: 'Frontend Development',
    description: 'Building fast, accessible, responsive, and maintainable modern web applications with Next.js & React.',
    tags: ['React', 'Next.js', 'Tailwind CSS', 'TypeScript'],
  },
  {
    id: 3,
    icon: 'terminal',
    title: 'WordPress Solutions',
    description: 'Custom themes, Headless REST API setups, and tailored plugins engineered for speed and ease of management.',
    tags: ['Headless WP', 'PHP', 'REST API', 'Custom Post Types'],
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: 'Exceptional eye for detail. The WordPress site built for our agency surpassed all expectations in speed and design quality.',
    name: 'Sarah Jenkins',
    role: 'CEO',
    company: 'Modus Creative',
  },
  {
    id: 2,
    quote: 'A master of the frontend. Our SaaS dashboard is now significantly faster, more responsive, and far more intuitive.',
    name: 'David Chen',
    role: 'Product Lead',
    company: 'CloudFlow',
  },
  {
    id: 3,
    quote: 'Reliable, professional, and highly skilled. The perfect partner for end-to-end web development projects.',
    name: 'Elena Rodriguez',
    role: 'Founder',
    company: 'Verve Homes',
  },
];

const FALLBACK_BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    slug: 'architecting-scalable-design-systems',
    title: 'Architecting Scalable Design Systems for Enterprise React Applications',
    excerpt: 'Learn the methodologies behind creating maintainable, high-performance design systems that empower developers and designers to build consistent experiences at scale.',
    content: `
      <p>Building a design system for enterprise applications requires more than just a library of React components. It requires establishing rigid design tokens, clear contribution guidelines, and automated performance budgets.</p>
      <h2>Establishing Rigid Design Tokens</h2>
      <p>Design tokens serve as the single source of truth for colors, typography, spacing, and elevation. By abstracting raw CSS values into semantic tokens like <code>surface-primary</code> or <code>on-background</code>, teams ensure consistency across web, mobile, and print mediums.</p>
      <h2>Component Composition vs Configuration</h2>
      <p>Avoid creating monolithic components with dozens of props. Instead, leverage React's composition model to build lightweight, single-responsibility primitives that can be combined flexibly.</p>
    `,
    category: 'Design Strategy',
    date: 'October 28, 2024',
    readTime: '12 Min Read',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1600&q=80',
    featured: true,
  },
  {
    id: 2,
    slug: 'beyond-pixels-mastering-performance',
    title: 'Beyond Pixels: Mastering Performance in Modern Web Apps',
    excerpt: 'Deep dive into virtualization, code-splitting, and memoization techniques to achieve a consistent 60fps in complex React applications.',
    content: `
      <p>Achieving sub-second load times and 60fps interactions demands disciplined performance profiling. From virtualizing long lists with <code>@tanstack/react-virtual</code> to lazy loading heavy routes, performance must be engineered from day one.</p>
    `,
    category: 'Engineering',
    date: 'October 24, 2024',
    readTime: '8 Min Read',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 3,
    slug: 'psychology-of-micro-interactions',
    title: 'The Psychology of Micro-interactions',
    excerpt: 'How small animations and feedback loops can significantly improve user retention and perceived product quality.',
    content: `
      <p>Micro-interactions are the subtle visual cues that signal success, guide user focus, and bring emotional delight to digital products.</p>
    `,
    category: 'UX Design',
    date: 'September 12, 2024',
    readTime: '6 Min Read',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 4,
    slug: 'tailwind-css-utility-to-design-first',
    title: 'Tailwind CSS: From Utility-First to Design-First',
    excerpt: 'A retrospective on how utility-first CSS changed my workflow and enabled faster iteration for complex visual components.',
    content: `
      <p>Tailwind CSS eliminated the context-switching penalty of writing custom CSS rules while enforcing design consistency via configuration themes.</p>
    `,
    category: 'Case Study',
    date: 'August 30, 2024',
    readTime: '7 Min Read',
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 5,
    slug: 'building-a-narrative-driven-portfolio',
    title: 'Building a Narrative-Driven Portfolio',
    excerpt: 'Moving beyond the grid: How to use storytelling and pacing to showcase your design and engineering journey effectively.',
    content: `
      <p>A great portfolio doesn't just show screenshots; it communicates technical problem-solving, architectural trade-offs, and project impact.</p>
    `,
    category: 'Process',
    date: 'August 05, 2024',
    readTime: '5 Min Read',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 6,
    slug: 'future-of-framer-motion',
    title: 'The Future of Framer Motion in Web Development',
    excerpt: 'Exploring advanced animation patterns and orchestrating complex layout transitions with ease using Framer Motion.',
    content: `
      <p>Framer Motion simplifies fluid layout animations, shared element transitions, and gesture controls for modern React interfaces.</p>
    `,
    category: 'DevTools',
    date: 'July 20, 2024',
    readTime: '9 Min Read',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80',
  },
];

async function fetchWithTimeout(url: string, options: RequestInit = {}, timeoutMs = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (err) {
    clearTimeout(id);
    throw err;
  }
}

export async function getProjects(): Promise<Project[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://dev-hadwaniravi-portfolio.pantheonsite.io';

  try {
    const res = await fetchWithTimeout(`${wpUrl}/wp-json/wp/v2/portfolio_project?_embed`, {
      next: { revalidate: 60 },
    }, 5000);
    if (!res.ok) throw new Error('WordPress API error');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return FALLBACK_PROJECTS;

    return data.map((item: any) => ({
      id: item.id,
      title: item.title.rendered,
      category: item.meta?.category || 'WordPress',
      tags: item.meta?.tags ? (typeof item.meta.tags === 'string' ? JSON.parse(item.meta.tags) : item.meta.tags) : ['WordPress', 'React'],
      image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || FALLBACK_PROJECTS[0].image,
      challenge: item.excerpt?.rendered?.replace(/<[^>]+>/g, '') || 'Project built with custom architecture.',
      solution: item.content?.rendered?.replace(/<[^>]+>/g, '') || '',
      liveUrl: item.meta?.live_url || '#',
      githubUrl: item.meta?.github_url || '#',
    }));
  } catch (error) {
    return FALLBACK_PROJECTS;
  }
}

export async function getServices(): Promise<Service[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://dev-hadwaniravi-portfolio.pantheonsite.io';

  try {
    const res = await fetchWithTimeout(`${wpUrl}/wp-json/wp/v2/portfolio_service`, {
      next: { revalidate: 60 },
    }, 5000);
    if (!res.ok) throw new Error('WordPress API error');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return FALLBACK_SERVICES;

    return data.map((item: any) => ({
      id: item.id,
      icon: item.meta?.icon || 'code',
      title: item.title.rendered,
      description: item.content?.rendered?.replace(/<[^>]+>/g, '') || '',
      tags: item.meta?.tags ? (typeof item.meta.tags === 'string' ? JSON.parse(item.meta.tags) : item.meta.tags) : [],
    }));
  } catch (error) {
    return FALLBACK_SERVICES;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://dev-hadwaniravi-portfolio.pantheonsite.io';

  try {
    const res = await fetchWithTimeout(`${wpUrl}/wp-json/wp/v2/portfolio_testimonial?_embed`, {
      next: { revalidate: 60 },
    }, 5000);
    if (!res.ok) throw new Error('WordPress API error');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return FALLBACK_TESTIMONIALS;

    return data.map((item: any) => ({
      id: item.id,
      quote: item.content?.rendered?.replace(/<[^>]+>/g, '') || '',
      name: item.title.rendered,
      role: item.meta?.role || 'Client',
      company: item.meta?.company || '',
    }));
  } catch (error) {
    return FALLBACK_TESTIMONIALS;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://dev-hadwaniravi-portfolio.pantheonsite.io';

  try {
    const res = await fetchWithTimeout(`${wpUrl}/wp-json/wp/v2/posts?_embed`, {
      next: { revalidate: 60 },
    }, 5000);
    if (!res.ok) throw new Error('WordPress API error');
    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) return FALLBACK_BLOG_POSTS;

    return data.map((item: any, index: number) => ({
      id: item.id,
      slug: item.slug,
      title: item.title.rendered,
      excerpt: item.excerpt?.rendered?.replace(/<[^>]+>/g, '') || '',
      content: item.content?.rendered || '',
      category: item._embedded?.['wp:term']?.[0]?.[0]?.name || 'Engineering',
      date: new Date(item.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: `${Math.max(4, Math.ceil((item.content?.rendered?.length || 500) / 1000))} Min Read`,
      image: item._embedded?.['wp:featuredmedia']?.[0]?.source_url || FALLBACK_BLOG_POSTS[index % FALLBACK_BLOG_POSTS.length].image,
      featured: index === 0,
    }));
  } catch (error) {
    return FALLBACK_BLOG_POSTS;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  const found = posts.find((p) => p.slug === slug);
  if (found) return found;
  return FALLBACK_BLOG_POSTS.find((p) => p.slug === slug) || null;
}

export async function sendContactMessage(payload: {
  name: string;
  email: string;
  projectType: string;
  message: string;
}) {
  const wpUrl = process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://dev-hadwaniravi-portfolio.pantheonsite.io';
  if (wpUrl) {
    try {
      const res = await fetchWithTimeout(`${wpUrl}/wp-json/rh-portfolio/v1/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }, 5000);
      if (res.ok) return await res.json();
    } catch (e) {
      console.warn('WP contact endpoint fallback:', e);
    }
  }

  // Next.js API Route fallback
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  return await res.json();
}

