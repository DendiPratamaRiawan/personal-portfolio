import { useState } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';

export default function Navbar({ darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md z-40 border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <a href="#" className="text-2xl font-black text-blue-600 dark:text-blue-400 tracking-wider">DR</a>
        
        <div className="hidden md:flex space-x-8 font-medium text-slate-700 dark:text-slate-200">
          <a href="#about" className="hover:text-blue-600 transition">About</a>
          <a href="#skills" className="hover:text-blue-600 transition">Skill</a>
          <a href="#portfolio" className="hover:text-blue-600 transition">Certifikat & Project</a>
          <a href="#services" className="hover:text-blue-600 transition">Service</a>
          <a href="#contact" className="hover:text-blue-600 transition">Contact</a>
        </div>

        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:ring-2 ring-blue-400 transition"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-slate-700 dark:text-slate-200">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 px-6 py-4 space-y-4 border-b border-slate-200 dark:border-slate-800">
          <a href="#about" onClick={()=>setIsOpen(false)} className="block text-slate-700 dark:text-slate-200">About</a>
          <a href="#skills" onClick={()=>setIsOpen(false)} className="block text-slate-700 dark:text-slate-200">Skill</a>
          <a href="#portfolio" onClick={()=>setIsOpen(false)} className="block text-slate-700 dark:text-slate-200">Certifikat & Project</a>
          <a href="#services" onClick={()=>setIsOpen(false)} className="block text-slate-700 dark:text-slate-200">Service</a>
          <a href="#contact" onClick={()=>setIsOpen(false)} className="block text-slate-700 dark:text-slate-200">Contact</a>
        </div>
      )}
    </nav>
  );
}