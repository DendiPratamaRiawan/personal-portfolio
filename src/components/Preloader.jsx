import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8 } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900 text-white"
    >
      <motion.div
        animate={{ scale: [0.8, 1.2, 1], rotate: [0, 180, 360] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mb-4"
      />
      <motion.h2 
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
        className="text-2xl font-bold tracking-widest text-blue-400"
      >
        DR | PORTFOLIO
      </motion.h2>
    </motion.div>
  );
}