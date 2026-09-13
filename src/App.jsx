import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsExperience from './components/SkillsExperience';
import PortfolioSection from './components/PortfolioSection';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={darkMode ? 'dark bg-slate-900 min-h-screen text-slate-100' : 'bg-white min-h-screen text-slate-900'}>
      <Toaster position="bottom-right" />
      <AnimatePresence>
        {loading && <Preloader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main>
            <Hero />
            <SkillsExperience />
            <PortfolioSection />
            <Services />
            <Contact />
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}