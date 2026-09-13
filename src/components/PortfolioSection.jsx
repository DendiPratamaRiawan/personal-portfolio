import { useState } from 'react';
import { motion } from 'framer-motion';
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

  return (
    <section id="portfolio" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-10 gap-4">
        <div>
          <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
            My Portfolio
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Certificates, Awards & Projects
          </h2>
        </div>
        
        {/* Toggle Switcher */}
        <div className="flex flex-wrap bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl self-start lg:self-auto gap-1">
          <button 
            onClick={() => setTab('cert')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 ${
              tab === 'cert' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Competence
          </button>

          <button 
            onClick={() => setTab('award')} 
            className={`px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 flex items-center gap-1.5 ${
              tab === 'award' 
                ? 'bg-blue-600 text-white shadow-md' 
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
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Projects
          </button>
        </div>
      </div>

      {/* Grid Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentData.map((item, idx) => {
          const targetLink = item.github || item.link || '#';
          const showImage = hasValidImage(item.img);
          
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: idx * 0.1 }}
              className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group flex flex-col justify-between"
            >
              <div>
                {/* Kontainer Gambar HANYA dirender jika item.img bukan "#" atau kosong */}
                {showImage && (
                  <div className="overflow-hidden relative w-full aspect-video bg-slate-100 dark:bg-slate-800">
                    <img 
                      src={item.img} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out" 
                    />
                  </div>
                )}

                {/* Content */}
                <div className="p-6">
                  <h3 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  {/* Deskripsi tampil penuh tanpa potongan */}
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {item.issuer || item.desc || item.organization}
                  </p>

                  {/* Tech Stack Badges */}
                  {item.tech && item.tech.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {item.tech.map((t, tIdx) => (
                        <span 
                          key={tIdx} 
                          className="px-2.5 py-1 text-[11px] font-medium bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 rounded-lg border border-blue-100 dark:border-blue-900/50"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 pb-6 pt-3 flex justify-between items-center text-xs text-blue-600 dark:text-blue-400 font-semibold border-t border-slate-100 dark:border-slate-800/60 mt-auto">
                <span>
                  {item.date || (tab === 'project' ? 'View Code' : tab === 'award' ? 'Awarded' : 'View Credential')}
                </span>
                
                <a 
                  href={targetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all shadow-sm flex items-center justify-center"
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
      </div>
    </section>
  );
}