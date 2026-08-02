import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://hadwaniravi.vercel.app'),
  title: {
    default: 'Ravi Hadwani | Senior Frontend Developer & UI/UX Designer',
    template: '%s | Ravi Hadwani',
  },
  description:
    'Bespoke personal portfolio of Ravi Hadwani, specializing in Next.js 16, React 19, TypeScript, Swiss UI/UX design systems, and Headless WordPress web architecture.',
  keywords: [
    'Ravi Hadwani',
    'Senior Frontend Developer',
    'UI/UX Designer India',
    'Next.js 16 Developer',
    'Headless WordPress Specialist',
    'React Full-Stack Engineer',
    'Bespoke Web Design',
    'Web Architecture',
  ],
  authors: [{ name: 'Ravi Hadwani', url: 'https://hadwaniravi.vercel.app' }],
  creator: 'Ravi Hadwani',
  publisher: 'Ravi Hadwani',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://hadwaniravi.vercel.app',
  },
  openGraph: {
    title: 'Ravi Hadwani | Senior Frontend Developer & UI/UX Designer',
    description:
      'Transforming complex business requirements into fast, scalable, and conversion-optimized web applications with Swiss layout precision.',
    type: 'website',
    url: 'https://hadwaniravi.vercel.app',
    siteName: 'Ravi Hadwani Portfolio',
    locale: 'en_US',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80',
        width: 1200,
        height: 630,
        alt: 'Ravi Hadwani - Senior Frontend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ravi Hadwani | Senior Frontend Developer & UI/UX Designer',
    description: 'Bespoke Next.js 16 & Headless WordPress Web Architecture.',
    creator: '@hadwaniravi',
    images: ['https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ravi Hadwani',
    jobTitle: 'Senior Frontend Developer & UI/UX Designer',
    url: 'https://hadwaniravi.vercel.app',
    email: 'hadwaniravi009@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'India',
    },
    sameAs: ['https://github.com/hadwaniravi009', 'https://linkedin.com'],
    knowsAbout: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Headless WordPress',
      'UI/UX Design Systems',
      'REST API',
      'Tailwind CSS',
    ],
  };

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} antialiased bg-[#f8f9fb] text-[#191c1e]`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
