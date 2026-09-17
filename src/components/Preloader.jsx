import { motion } from 'framer-motion';

export default function Preloader() {
  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-950 text-white overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <div className="absolute w-72 h-72 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Modern Dual-Ring Orbit Spinner */}
      <div className="relative flex items-center justify-center mb-8">
        {/* Outer Ring Rotating Clockwise */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          className="w-20 h-20 rounded-full border-2 border-transparent border-t-cyan-400 border-r-blue-500"
        />

        {/* Inner Ring Rotating Counter-Clockwise */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ repeat: Infinity, duration: 1.8, ease: "linear" }}
          className="absolute w-14 h-14 rounded-full border-2 border-transparent border-b-indigo-500 border-l-sky-400"
        />

        {/* Center Glowing Dot */}
        <motion.div 
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="absolute w-4 h-4 bg-gradient-to-tr from-cyan-400 to-blue-600 rounded-full shadow-[0_0_15px_#38bdf8]"
        />
      </div>

      {/* DPR | PORTFOLIO Text */}
      <motion.div 
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="flex items-center"
      >
        <h2 className="text-xl sm:text-2xl font-black tracking-[0.2em] bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
          DPR <span className="text-cyan-400 font-light mx-1">|</span> PORTFOLIO
        </h2>
      </motion.div>
    </motion.div>
  );
}