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
    { id: 1, src: activityImg1, alt: "Activity 1" },
    { id: 2, src: activityImg2, alt: "Activity 2" },
    { id: 3, src: activityImg3, alt: "Activity 3" },
    { id: 4, src: activityImg4, alt: "Activity 4" },
  ];

  return (
    <section id="about" className="pt-28 pb-12 px-6 max-w-7xl mx-auto min-h-screen flex items-center">
      <div className="grid md:grid-cols-2 gap-10 items-start w-full">
        
        {/* ================= SISI KIRI: Informational Text ================= */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6"
        >
          {/* Header & Title */}
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-lg">Hello, I'm</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mt-1 mb-2">
              {portfolioData.name}
            </h1>
            
            <div className="text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 h-10">
              <TypeAnimation
                sequence={[
                  'IT Support Specialist', 1500,
                  'Network Engineer', 1500,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
              />
            </div>
          </div>

          {/* Action Buttons & Social Links */}
          <div className="flex space-x-3 items-center">
            <a 
              href={cvFile}
              download="CV_Dendi_Pratama_Riawan.pdf"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full font-medium text-sm shadow-sm transition cursor-pointer"
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
              <a href="www.linkedin.com/in/dendipratamar" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 transition" aria-label="LinkedIn">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* About Me Section */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <span className="w-5 h-[3px] bg-blue-600 rounded-full" />
              <h3 className="font-bold text-lg text-blue-600 dark:text-blue-400">About Me</h3>
            </div>
            <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
              {portfolioData.about}
            </p>
          </div>

          {/* Tag Keahlian Vertikal */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
              <span className="p-1 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </span>
              IT Support Specialist
            </div>
            <div className="flex items-center gap-2.5 text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
              <span className="p-1 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </span>
              Network Engineer
            </div>
            <div className="flex items-center gap-2.5 text-base md:text-lg font-bold text-slate-800 dark:text-slate-100">
              <span className="p-1 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Check size={14} strokeWidth={3} />
              </span>
              Junior Cyber Security
            </div>
          </div>
        </motion.div>

        {/* ================= SISI KANAN: Foto Profil & Sub-Activities ================= */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col gap-6 items-center"
        >
          {/* Main Profile Image (Ukuran Diperbesar) */}
          <div className="relative w-full max-w-sm flex justify-center items-end py-4">
            <div className="absolute top-2 w-full h-[95%] bg-gradient-to-tr from-blue-500/30 via-indigo-500/30 to-sky-400/30 dark:from-blue-600/40 dark:to-cyan-500/40 rounded-[30%_70%_70%_30%/30%_30%_70%_70%] blur-2xl -z-10 scale-110" />
            <div className="absolute top-4 w-[90%] h-[85%] bg-blue-100 dark:bg-blue-950/60 rounded-3xl -z-10 border border-blue-200/50 dark:border-blue-700/30 shadow-lg" />

            <div className="absolute top-0 right-2 text-blue-500 font-bold text-lg select-none animate-pulse">
              ✦
            </div>

            {/* Foto profil diperbesar dari w-[82%] ke w-[92%] */}
            <img 
              src={profileImg} 
              alt="Main Profile" 
              className="w-[85%] h-auto object-contain z-10 hover:scale-105 transition-transform duration-500 ease-in-out cursor-pointer" 
            />

            {/* OPSI 1: Garis Bawah Cyber Neon Dual-Tone (Disesuaikan Lebarnya) */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[95%] z-20 flex flex-col items-center pointer-events-none">
              <div className="w-full h-10 bg-gradient-to-t from-white dark:from-slate-900 to-transparent" />
              <div className="relative w-full flex justify-center -mt-2">
                <div className="w-4/5 h-[3px] bg-gradient-to-r from-transparent via-blue-500 to-cyan-400 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.8)]" />
                <div className="absolute -bottom-1.5 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-70 blur-[0.5px]" />
              </div>
            </div>
          </div>

          {/* 4 Grid Foto Sub-Activities (Ukuran Besar) */}
          <div className="grid grid-cols-2 gap-4 w-full max-w-md md:max-w-lg">
            {subActivities.map((act) => (
              <div 
                key={act.id} 
                className="group relative overflow-hidden rounded-2xl p-1 bg-gradient-to-br from-blue-500/20 via-slate-200/50 to-blue-500/10 dark:from-blue-500/30 dark:via-slate-800/50 dark:to-slate-900 shadow-md hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="relative overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                  <img 
                    src={act.src} 
                    alt={act.alt} 
                    className="w-full h-44 sm:h-48 object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out" 
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 flex items-end p-3">
                    <span className="text-white text-xs font-semibold tracking-wide backdrop-blur-md bg-black/40 px-2.5 py-1 rounded-md border border-white/20 shadow-sm">
                      {act.alt}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  );
}