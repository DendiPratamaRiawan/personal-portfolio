import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { Award, ExternalLink } from 'lucide-react';

const GithubIcon = ({ size = 17, className = "" }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function PortfolioSection() {
  const [tab, setTab] = useState('cert');

  const getFilteredData = () => {
    switch (tab) {
      case 'cert':
        return portfolioData.certificates || [];
      case 'award':
        return portfolioData.awards || portfolioData.achievements || [];
      case 'project':
        return portfolioData.projects || [];
      default:
        return [];
    }
  };

  const currentData = getFilteredData();

  // Helper function untuk memeriksa apakah item memiliki gambar yang valid
  const hasValidImage = (imgPath) => {
    return imgPath && imgPath !== '#' && imgPath !== '';
  };

  // Fungsi interaktif pelacakan kursor ala React Bits (Chroma Mouse Move)
  const handleCardMouseMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section id="portfolio" className="py-20 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Section Tetap Putih Bersih Tanpa Warna/Aura Gelap */}

      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-6">
        <div>
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm tracking-wider uppercase inline-block mb-1">
            Chroma Showcase
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Certificates, Awards & Projects
          </h2>
        </div>
        
        {/* Toggle Switcher */}
        <div className="flex flex-wrap bg-slate-100/80 dark:bg-slate-800/80 backdrop-blur-md p-1.5 rounded-2xl self-start lg:self-auto gap-1 border border-slate-200/60 dark:border-slate-700/50 shadow-inner">
          <button 
            onClick={() => setTab('cert')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
              tab === 'cert' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Competence
          </button>

          <button 
            onClick={() => setTab('award')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 ${
              tab === 'award' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award size={16} />
            Honors & Awards
          </button>

          <button 
            onClick={() => setTab('project')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
              tab === 'project' 
                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Projects
          </button>
        </div>
      </div>

      {/* Chroma Grid Cards Container dengan Efek Interaktif React Bits */}
      <motion.div 
        layout
        className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {currentData.map((item, idx) => {
            const targetLink = item.github || item.link || '#';
            const showImage = hasValidImage(item.img);
            
            return (
              <motion.div 
                key={item.title + idx}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.06, ease: "easeOut" }}
                whileHover={{ y: -6 }}
                onMouseMove={handleCardMouseMove}
                className="chroma-card relative bg-white dark:bg-slate-900/90 backdrop-blur-xl rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between"
                style={{
                  '--card-border': '#94a3b8',
                  '--card-gradient': 'linear-gradient(145deg, #f1f5f9, #ffffff)'
                }}
              >
                {/* Efek Sorotan Cahaya Interaktif Warna Abu-abu */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-40 pointer-events-none transition-opacity duration-300 z-10"
                  style={{
                    background: 'radial-gradient(circle 300px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(148, 163, 184, 0.45), transparent 70%)'
                  }}
                />

                {/* Border Glow Effect Warna Abu-abu Elegan */}
                <div className="absolute -inset-px bg-gradient-to-r from-slate-400 via-slate-300 to-slate-500 rounded-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-sm pointer-events-none -z-10" />

                <div>
                  {/* Kontainer Gambar */}
                  {showImage && (
                    <div className="overflow-hidden relative w-full aspect-video bg-slate-100 dark:bg-slate-800">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 group-hover:brightness-105 transition-transform duration-700 ease-out" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  )}

                  {/* Content Section */}
                  <div className="p-6 relative z-20">
                    <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-slate-700 dark:group-hover:text-slate-300 transition-colors">
                      {item.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {item.issuer || item.desc || item.organization}
                    </p>

                    {/* Tech Stack Badges */}
                    {item.tech && item.tech.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {item.tech.map((t, tIdx) => (
                          <span 
                            key={tIdx} 
                            className="px-2.5 py-1 text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg border border-slate-200 dark:border-slate-700 shadow-xs"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Card Footer */}
                <div className="px-6 pb-6 pt-3 flex justify-between items-center text-xs text-slate-600 dark:text-slate-400 font-semibold border-t border-slate-100 dark:border-slate-800/60 mt-auto relative z-20">
                  <span className="tracking-wide">
                    {item.date || (tab === 'project' ? 'View Code' : tab === 'award' ? 'Awarded' : 'View Credential')}
                  </span>
                  
                  <a 
                    href={targetLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-800 hover:text-white dark:hover:bg-slate-700 dark:hover:text-white transition-all shadow-sm flex items-center justify-center group-hover:scale-105"
                    title={tab === 'project' ? 'View Repository' : 'View Details'}
                  >
                    {tab === 'project' ? (
                      <GithubIcon size={17} />
                    ) : (
                      <ExternalLink size={17} />
                    )}
                  </a>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}