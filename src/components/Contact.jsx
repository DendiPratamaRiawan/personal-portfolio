import { useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Send, MapPin, Phone, Mail, Loader2, MessageSquare } from 'lucide-react';

export default function Contact() {
  const formRef = useRef();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(formRef.current);

    try {
      const response = await fetch('https://formspree.io/f/xrpbbraa', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Pesan Anda berhasil terkirim!');
        formRef.current.reset();
      } else {
        toast.error(data.error || 'Gagal mengirim pesan, silakan coba lagi.');
      }
    } catch (error) {
      toast.error('Terjadi kesalahan jaringan, silakan coba lagi.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="mb-12">
        <span className="text-blue-600 dark:text-blue-400 font-medium text-sm tracking-wide uppercase">
          Get In Touch
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mt-1">
          Contact Me
        </h2>
      </div>

      <div className="grid md:grid-cols-12 gap-8 items-start">
        {/* Info Kontak Side */}
        <div className="md:col-span-5 space-y-6">
          <p className="text-slate-600 dark:text-slate-300 text-sm md:text-base leading-relaxed">
            Feel free to reach out if you have any questions, potential projects, or collaboration opportunities. I will get back to you as soon as possible!
          </p>

          <div className="space-y-4 pt-2">
            {/* Card Location */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Location</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">Serang, Banten, Indonesia</p>
              </div>
            </div>

            {/* Card Phone */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Phone / WhatsApp</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">087768808324</p>
              </div>
            </div>

            {/* Card Email */}
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 group">
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Email Address</p>
                <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">dendipratamar@gmail.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form Kontak Side */}
        <div className="md:col-span-7 relative group">
          {/* Subtle Glow Background Effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>

          <form 
            ref={formRef} 
            onSubmit={handleSubmit} 
            className="relative space-y-5 bg-white dark:bg-slate-900/90 backdrop-blur-xl p-8 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none"
          >
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              <MessageSquare className="text-blue-600 dark:text-blue-400" size={20} />
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send a Message</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Name</label>
                <input 
                  type="text" 
                  name="name" 
                  placeholder="John Doe"
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all duration-200" 
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Your Email</label>
                <input 
                  type="email" 
                  name="email" 
                  placeholder="john@example.com"
                  required 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all duration-200" 
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Message</label>
              <textarea 
                name="message" 
                rows="4" 
                placeholder="How can I help you?"
                required 
                className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700/70 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:bg-white dark:focus:bg-slate-900 focus:border-blue-500 dark:focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 outline-none text-sm transition-all duration-200 resize-none"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium text-sm rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed group/btn"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  <span>Sending Message...</span>
                </>
              ) : (
                <>
                  <Send size={18} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-200" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}