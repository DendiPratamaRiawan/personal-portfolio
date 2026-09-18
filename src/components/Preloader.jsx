import { motion } from 'framer-motion';
import { Code2, Globe, Laptop } from 'lucide-react';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ y: 0 }}
      exit={{ 
        y: '-100%', 
        transition: { duration: 1.0, ease: [0.76, 0, 0.24, 1] } 
      }}
      style={{ willChange: 'transform' }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white text-slate-900 overflow-hidden"
    >
      <div className="relative flex flex-col items-center space-y-5 text-center px-4 z-10">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex items-center space-x-3 mb-1"
        >
          <div className="p-3 bg-blue-50 rounded-2xl text-[#2200dc]">
            <Code2 className="w-6 h-6" />
          </div>
          <div className="p-3 bg-blue-50 rounded-2xl text-[#2200dc]">
            <Globe className="w-6 h-6" />
          </div>
          <div className="p-3 bg-blue-50 rounded-2xl text-[#2200dc]">
            <Laptop className="w-6 h-6" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 leading-tight"
        >
          Welcome to my <br />
          <span className="text-[#2200dc]">Portfolio Website</span>
        </motion.h1>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: '140px' }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-1 bg-[#2200dc] rounded-full mt-3"
        />
      </div>
    </motion.div>
  );
}