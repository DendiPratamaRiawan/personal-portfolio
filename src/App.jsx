import { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './components/Preloader';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SkillsExperience from './components/SkillsExperience';
import PortfolioSection from './components/PortfolioSection';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Particles from './components/Particles';

export default function App() {
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Waktu timer dikembalikan ke 2200ms (2.2 detik) agar durasinya pas & elegan
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={darkMode ? 'dark bg-slate-900 min-h-screen text-slate-100 relative' : 'bg-white min-h-screen text-slate-900 relative'}>
      
      {/* Background Particles Full Layar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
        <Particles
          particleColors={["#2200dc"]}
          particleCount={300}
          particleSpread={15}
          speed={0.1}
          particleBaseSize={120}
          sizeRandomness={1}
          moveParticlesOnHover={true}
          alphaParticles={true}
          disableRotation={false}
          pixelRatio={1}
        />
      </div>

      <div className="relative z-10">
        {/* Toaster diposisikan di top-center dengan gaya modern dan elegan */}
        <Toaster 
          position="top-center" 
          toastOptions={{
            duration: 4000,
            style: {
              background: '#1e293b',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '14px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
            },
            success: {
              iconTheme: {
                primary: '#3b82f6',
                secondary: '#fff',
              },
            },
          }}
        />
        
        {/* Preloader berjalan di atas menggunakan AnimatePresence */}
        <AnimatePresence>
          {loading && <Preloader key="loader" />}
        </AnimatePresence>

        {/* 
          Seluruh konten website sudah dirender di background, 
          sehingga saat preloader naik, transisinya sangat mulus tanpa jeda/lag! 
        */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: loading ? 0 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
          <main>
            <Hero />
            <SkillsExperience />
            <PortfolioSection />
            <Services />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      </div>
    </div>
  );
}