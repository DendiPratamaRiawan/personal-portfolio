import { useState } from 'react';
import { motion } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';
import { CheckCircle2, Briefcase, GraduationCap, Users, HeartHandshake } from 'lucide-react';

export default function SkillsExperience() {
  const [activeTab, setActiveTab] = useState('experience');

  return (
    <section id="skills" className="py-16 px-6 max-w-7xl mx-auto">
      {/* items-stretch memaksa kedua kolom (kiri & kanan) memiliki tinggi yang sama persis */}
      <div className="grid lg:grid-cols-12 gap-8 items-stretch">
        
        {/* ================= SISI KIRI: Skill Set & Intro (Tanpa Card/Border) ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-5 flex flex-col justify-between gap-5"
        >
          <div>
            <span className="text-blue-600 dark:text-blue-400 font-semibold text-sm">
              My Skills & Experience
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mt-1 mb-3">
              Skill and Experience
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
              I've experience in networking and IT support, and I'm proficient in troubleshooting hardware and software. Here are some of the skills my possess:
            </p>

            {/* Grid Skill Item */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {portfolioData.skills.map((skill, idx) => (
                <div 
                  key={idx} 
                  className="flex items-center gap-2 p-2.5 bg-blue-50/60 dark:bg-slate-800/60 rounded-xl border border-blue-100/80 dark:border-slate-800 hover:border-blue-500/50 transition-all shadow-sm"
                >
                  <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 shrink-0" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* ================= SISI KANAN: Card Tab Timeline (Tinggi Mengikuti Sisi Kiri / h-full) ================= */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="lg:col-span-7 h-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/80 dark:border-slate-800 p-6 shadow-xl shadow-slate-200/50 dark:shadow-none flex flex-col justify-between"
        >
          <div>
            {/* Tab Navigation Header */}
            <div className="grid grid-cols-2 sm:grid-cols-4 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl mb-8 gap-1">
              <button
                onClick={() => setActiveTab('experience')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'experience'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Briefcase size={15} />
                Experience
              </button>

              <button
                onClick={() => setActiveTab('education')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'education'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <GraduationCap size={15} />
                Education
              </button>

              <button
                onClick={() => setActiveTab('organization')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'organization'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Users size={15} />
                Organization
              </button>

              <button
                onClick={() => setActiveTab('volunteer')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold transition-all duration-300 ${
                  activeTab === 'volunteer'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <HeartHandshake size={15} />
                Volunteer
              </button>
            </div>

            {/* Timeline List (Menyebar sampai ujung kanan tanpa space kosong di samping) */}
            <div className="relative ml-3 space-y-7 pb-2">
              
              {/* Experience */}
              {activeTab === 'experience' && (
                portfolioData.experiences?.map((exp, idx) => (
                  <div key={idx} className="pl-6 relative group">
                    {idx !== portfolioData.experiences.length - 1 && (
                      <span className="absolute left-[0px] top-2.5 bottom-[-28px] w-[2px] bg-slate-200 dark:bg-slate-800" />
                    )}
                    <span className="absolute -left-[6px] top-1.5 z-10 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pr-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                          {exp.title}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full self-start sm:self-center shrink-0">
                        {exp.date}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {/* Education */}
              {activeTab === 'education' && (
                portfolioData.education?.map((edu, idx) => (
                  <div key={idx} className="pl-6 relative group">
                    {idx !== portfolioData.education.length - 1 && (
                      <span className="absolute left-[0px] top-2.5 bottom-[-28px] w-[2px] bg-slate-200 dark:bg-slate-800" />
                    )}
                    <span className="absolute -left-[6px] top-1.5 z-10 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pr-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                          {edu.institution}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {edu.degree}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full self-start sm:self-center shrink-0">
                        {edu.date}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {/* Organization */}
              {activeTab === 'organization' && (
                portfolioData.organizations?.map((org, idx) => (
                  <div key={idx} className="pl-6 relative group">
                    {idx !== portfolioData.organizations.length - 1 && (
                      <span className="absolute left-[0px] top-2.5 bottom-[-28px] w-[2px] bg-slate-200 dark:bg-slate-800" />
                    )}
                    <span className="absolute -left-[6px] top-1.5 z-10 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pr-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                          {org.organization}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {org.role}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full self-start sm:self-center shrink-0">
                        {org.date}
                      </span>
                    </div>
                  </div>
                ))
              )}

              {/* Volunteer */}
              {activeTab === 'volunteer' && (
                portfolioData.volunteers?.map((vol, idx) => (
                  <div key={idx} className="pl-6 relative group">
                    {idx !== portfolioData.volunteers.length - 1 && (
                      <span className="absolute left-[0px] top-2.5 bottom-[-28px] w-[2px] bg-slate-200 dark:bg-slate-800" />
                    )}
                    <span className="absolute -left-[6px] top-1.5 z-10 w-3.5 h-3.5 bg-blue-600 rounded-full ring-4 ring-white dark:ring-slate-900 group-hover:scale-125 transition-transform" />
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 pr-2">
                      <div>
                        <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                          {vol.organization}
                        </h4>
                        <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-0.5">
                          {vol.role}
                        </p>
                      </div>
                      <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 px-2.5 py-1 rounded-full self-start sm:self-center shrink-0">
                        {vol.date}
                      </span>
                    </div>
                  </div>
                ))
              )}

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}