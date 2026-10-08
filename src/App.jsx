import { Toaster } from 'react-hot-toast';
import { MotionConfig } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { About, Skills } from './components/About';
import Experience from './components/Experience';
import Activities from './components/Activities';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { usePortfolioData } from './hooks/usePortfolioData';

export default function App() {
  const { data } = usePortfolioData();

  const posts = data.news.filter((n) => n.category !== 'berita');
  const media = data.news.filter((n) => n.category === 'berita');
  const hasActivities = posts.length + media.length + data.activities.length > 0;

  const links = ['about', 'skills', 'experience', hasActivities && 'activities', 'projects', data.publications?.length > 0 && 'publications', 'services', 'contact'].filter(Boolean).map((id) => ({ id }));

  return (
    <MotionConfig reducedMotion="user">
      <Toaster position="top-center" toastOptions={{ style: { borderRadius: '999px', fontSize: '14px', fontWeight: 600 } }} />
      <Navbar links={links} />
      <main className="overflow-x-clip">
        <Hero data={data} />
        <About profile={data.profile} experiences={data.experiences} />
        <Skills skills={data.skills} />
        <Experience experiences={data.experiences} />
        {hasActivities && <Activities posts={posts} media={media} photos={data.activities} />}
        <Projects projects={data.projects} certificates={data.certificates} />
        <Publications items={data.publications || []} ownerName={data.profile.name} />
        <Services services={data.services} />
        <Contact profile={data.profile} />
      </main>
      <Footer profile={data.profile} links={links} />
    </MotionConfig>
  );
}
