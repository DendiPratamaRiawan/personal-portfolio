import { motion } from 'framer-motion';
import { BookOpen, ExternalLink } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import SpotlightCard from './SpotlightCard';

export default function Publications() {
  const items = portfolioData.publications ?? [];
  if (items.length === 0) return null;

  return (
    <section id="publications" className="py-16 px-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm">Research & Writing</span>
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white">Publications</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((pub, idx) => (
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
                <div className="flex items-start gap-3 mb-2">
                  <BookOpen size={20} className="mt-0.5 shrink-0 text-blue-600 dark:text-blue-400" />
                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {pub.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 mb-1">{pub.authors}</p>
                <p className="text-xs italic text-slate-500 dark:text-slate-400">{pub.venue}</p>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="inline-block text-xs font-semibold px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                  {pub.date}
                </span>
                {pub.link && (
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    Read <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </SpotlightCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
