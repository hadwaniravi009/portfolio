import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ravihadwani.in'),
  title: {
    default: 'Ravi Hadwani | Senior Next.js Developer & Headless WordPress Architect',
    template: '%s | Ravi Hadwani',
  },
  description:
    'Senior Full-Stack Frontend Engineer & UI/UX Designer specializing in Next.js 16, React 19, and Headless WordPress architectures. Engineering lightning-fast, high-converting digital products for founders & enterprises.',
  keywords: [
    'Ravi Hadwani',
    'Hire Next.js Developer',
    'Freelance Next.js Specialist',
    'Headless WordPress Developer India',
    'Senior Frontend Engineer India',
    'React Full-Stack Architect',
    'Figma to Next.js Developer',
    'High-Converting Web Design',
    'Core Web Vitals Optimization',
    'UI/UX Design Systems',
    'Bespoke Web Development',
  ],
  authors: [{ name: 'Ravi Hadwani', url: 'https://ravihadwani.in' }],
  creator: 'Ravi Hadwani',
  publisher: 'Ravi Hadwani',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: 'https://ravihadwani.in',
  },
  openGraph: {
    title: 'Ravi Hadwani | Senior Next.js Developer & Headless WordPress Architect',
    description:
      'Engineering blazing-fast, conversion-optimized Next.js and Headless WordPress platforms that scale with your business and achieve 95+ PageSpeed scores.',
    type: 'website',
    url: 'https://ravihadwani.in',
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
    title: 'Ravi Hadwani | Senior Next.js Developer & Headless WordPress Architect',
    description: 'Bespoke Next.js 16 & Headless WordPress Web Architecture for founders and businesses.',
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
  ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? {
        verification: {
          google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
        },
      }
    : {}),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://ravihadwani.in/#person',
        name: 'Ravi Hadwani',
        jobTitle: 'Senior Frontend Developer & Headless WordPress Architect',
        url: 'https://ravihadwani.in',
        email: 'hadwaniravi009@gmail.com',
        image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&h=630&q=80',
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
          'Core Web Vitals Optimization',
        ],
      },
      {
        '@type': 'ProfessionalService',
        '@id': 'https://ravihadwani.in/#service',
        name: 'Ravi Hadwani — Web Architecture & Frontend Engineering',
        url: 'https://ravihadwani.in',
        description: 'Bespoke Next.js development, Headless WordPress architecture, and high-converting UI/UX design systems.',
        provider: {
          '@id': 'https://ravihadwani.in/#person',
        },
        areaServed: 'Worldwide',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Core Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Next.js Web Application Development',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Headless WordPress CMS Engineering',
              },
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'UI/UX Design System & Prototyping',
              },
            },
          ],
        },
      },
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
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}
