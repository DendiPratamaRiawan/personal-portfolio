import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';

export default function Services() {
  return (
    <section id="services" className="py-16 px-6 max-w-7xl mx-auto">
      {/* Header & Hire Me Button */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">What I Offer</span>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">My Services</h2>
        </div>
        
        <a 
          href="#contact" 
          className="inline-flex items-center justify-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-xl transition shadow-md shadow-blue-500/20 active:scale-95"
        >
          Hire Me
        </a>
      </div>

      {/* Grid Services (4 Kolom) dengan Spotlight Card */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {portfolioData.services.map((srv, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
          >
            <SpotlightCard 
              className="p-5 flex flex-col justify-between h-full group"
              spotlightColor="rgba(0, 229, 255, 0.2)"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {srv.title}
                  </h3>
                </div>
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 mb-2">
                  {srv.level}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {srv.desc}
                </p>
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}