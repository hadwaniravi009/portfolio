import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Ravi Hadwani | Senior Frontend Developer & UI/UX Designer',
  description: 'Personal portfolio of Ravi Hadwani, specializing in Next.js, React, Tailwind CSS, high-performance UI/UX design, and Headless WordPress solutions.',
  keywords: [
    'Ravi Hadwani',
    'Frontend Developer',
    'UI/UX Designer',
    'React Developer',
    'Next.js Portfolio',
    'WordPress Developer',
    'Headless WordPress',
    'Web Developer London',
  ],
  authors: [{ name: 'Ravi Hadwani', url: 'https://ravihadwani.com' }],
  openGraph: {
    title: 'Ravi Hadwani | Senior Frontend Developer & UI/UX Designer',
    description: 'Transforming ideas into fast, responsive, SEO-friendly web experiences.',
    type: 'website',
    url: 'https://ravihadwani.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
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
