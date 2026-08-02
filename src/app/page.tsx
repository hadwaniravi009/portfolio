import { getProjects, getServices, getTestimonials } from '@/lib/wordpress';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingDock from '@/components/FloatingDock';
import AmbientShader from '@/components/AmbientShader';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Services from '@/components/Services';
import Projects from '@/components/Projects';
import StatsProcess from '@/components/StatsProcess';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [projects, services, testimonials] = await Promise.all([
    getProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <main className="relative min-h-screen selection:bg-[#0051d5] selection:text-white overflow-x-hidden">
      <CustomCursor />
      <ScrollProgress />
      <FloatingDock />
      <AmbientShader />
      <Navbar />


      <Hero />
      <About />
      <Services services={services} />
      <Projects projects={projects} />
      <StatsProcess />
      <Testimonials testimonials={testimonials} />
      <Contact />
      <Footer />
    </main>
  );
}
