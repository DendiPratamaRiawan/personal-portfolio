import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { Download, Check } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

// Import Foto Profil & CV
import profileImg from '../assets/foto_dendi.png';
import cvFile from '../assets/CV-dendi.pdf'; 

// Import Foto Activity dari Folder Lokal
import activityImg1 from '../assets/dendi1.jpg';
import activityImg2 from '../assets/dendi2.jpg';
import activityImg3 from '../assets/dendi3.jpg';
import activityImg4 from '../assets/dendi4.jpg';

export default function Hero() {
  const subActivities = [
    { id: 1, src: activityImg1, alt: "Internship Journey" },
    { id: 2, src: activityImg2, alt: "Firewall configuration" },
    { id: 3, src: activityImg3, alt: "IT Support Session" },
    { id: 4, src: activityImg4, alt: "Maintenance" },
  ];

  // Container utama memberi waktu preloader selesai sepenuhnya
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.7, 
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } 
    },
  };

  // Animasi khusus untuk Main Profile Card (Zoom & Spotlight)
  const profileCardVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" } 
    },
  };

  // Animasi khusus untuk Activity Cards (Bergeser ke atas & bergantian/staggered)
  const activityGridVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  };

  const activityItemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: [0.25, 1, 0.5, 1] } 
    },
  };

  return (
    <section id="about" className="pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex items-center overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-10 items-start w-full"
      >
        
        {/* ================= SISI KIRI: Informational Text ================= */}
        <motion.div variants={itemVariants} className="flex flex-col gap-6">
          <div>
            <motion.span variants={itemVariants} className="text-blue-600 dark:text-blue-400 font-semibold text-lg inline-block">
              Hello, I'm
            </motion.span>
            
            <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mt-1 mb-2">
              {portfolioData.name}
            </motion.h1>
            
            <motion.div variants={itemVariants} className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 h-10">
              <TypeAnimation
                sequence={[
                  'IT Support Specialist', 1500,
                  'Network Engineer', 1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="flex space-x-3 items-center">
            <a 
              href={cvFile}
              download="CV_Dendi_Pratama_Riawan.pdf"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-sm transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Download size={18} /> Download CV
            </a>
            
            <div className="flex space-x-1.5 text-slate-700 dark:text-slate-200">
              <a href="https://github.com/DendiPratamaRiawan/" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition" aria-label="GitHub">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/prtmaar_" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition" aria-label="Instagram">
                <svg className="w-5 h-5 fill-none stroke-current stroke-2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/dendipratamar" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[3px] bg-blue-600 rounded-full" />
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">About Me</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {portfolioData.about}
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-3">
            {['IT Support Specialist', 'Network Engineer', 'Junior Cyber Security'].map((skill, idx) => (
              <div key={idx} className="flex items-center gap-2.5 text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
                <span className="p-1 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                  <Check size={14} strokeWidth={3} />
                </span>
                {skill}
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* ================= SISI KANAN: Profile Card & Different Activity Animations ================= */}
        <motion.div 
          variants={profileCardVariants} 
          style={{ willChange: 'opacity, transform' }} 
          className="flex flex-col gap-6 items-center"
        >
          {/* Main Profile Card (React Bits Style: Spotlight & Scale Hover) */}
          <motion.div 
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-sm p-4 rounded-3xl bg-gradient-to-b from-blue-500/10 via-slate-100 to-slate-200 dark:from-blue-500/20 dark:via-slate-800/90 dark:to-slate-900 border border-slate-200/80 dark:border-slate-700/60 shadow-xl overflow-hidden group"
          >
            <div className="absolute -inset-px bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-500 blur-sm pointer-events-none" />
            
            <div className="relative flex flex-col items-center z-10">
              <div className="relative w-full h-72 sm:h-80 flex justify-center items-center overflow-hidden rounded-2xl bg-slate-200/50 dark:bg-slate-900/50 backdrop-blur-md">
                <img 
                  src={profileImg} 
                  alt="Main Profile" 
                  loading="lazy" 
                  className="w-full h-full object-cover object-top filter drop-shadow-md group-hover:scale-105 transition-transform duration-500 ease-out" 
                />
              </div>
              <div className="mt-3 text-center">
                <span className="inline-block px-3 py-1 text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 rounded-full border border-blue-200 dark:border-blue-800/50">
                  Network & IT Professional
                </span>
              </div>
            </div>
          </motion.div>

          {/* Grid Sub-Activities dengan Animasi Berbeda (Floating Tilt & Staggered Reveal) */}
          <motion.div 
            variants={activityGridVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 gap-4 w-full max-w-md md:max-w-lg"
          >
            {subActivities.map((act) => (
              <motion.div 
                key={act.id} 
                variants={activityItemVariants}
                whileHover={{ y: -6, rotate: 1 }} // Animasi hover unik: naik sedikit & miring tipis elegan
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ willChange: 'opacity, transform' }}
                className="group relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-blue-600/30 via-slate-200/60 to-blue-400/20 dark:from-blue-500/40 dark:via-slate-800/80 dark:to-slate-900 shadow-lg cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={act.src} 
                    alt={act.alt} 
                    loading="lazy" 
                    className="w-full h-44 sm:h-48 object-cover transform group-hover:scale-110 group-hover:brightness-105 transition-all duration-500 ease-out" 
                  />
                  {/* Glassmorphism Label Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-100 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-3.5">
                    <span className="text-white text-xs font-medium tracking-wide backdrop-blur-md bg-white/10 dark:bg-black/50 px-3 py-1.5 rounded-lg border border-white/20 shadow-sm w-full text-center truncate">
                      {act.alt}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

      </motion.div>
    </section>
  );
}