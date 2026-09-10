import React from 'react';
import { Send, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  return (
    <footer id="contact" className="relative pt-16 pb-8 overflow-hidden">
      {/* Background neon wavy glow */}
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-transparent via-purple-950/20 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Contact Banner Bar */}
        <div className="glass-panel rounded-3xl p-6 sm:p-8 lg:p-10 border border-white/10 shadow-2xl relative overflow-hidden">
          {/* Subtle accent glow */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Prompt */}
            <div className="flex items-center gap-4 text-center lg:text-left">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg shadow-purple-600/30 shrink-0 hidden sm:flex">
                <Send className="w-6 h-6 rotate-12" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-white">
                  Let's Work Together
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Have a project in mind? I'd love to hear from you.
                </p>
              </div>
            </div>

            {/* Middle Info Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs sm:text-sm">
              <a
                href="mailto:asadusman123@gmail.com"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111726] border border-white/10 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/30 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                <span>asadusman123@gmail.com</span>
              </a>

              <a
                href="tel:+923123456789"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111726] border border-white/10 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+92 312 3456789</span>
              </a>

              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#111726] border border-white/10 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Mianwali, Pakistan</span>
              </div>
            </div>

            {/* Right Action Button */}
            <div className="shrink-0">
              <button
                onClick={onOpenContact}
                className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg shadow-blue-600/30 hover:shadow-purple-600/50 hover:scale-105 transition-all duration-200"
              >
                <span>Send Message</span>
                <Send className="w-4 h-4 rotate-12" />
              </button>
            </div>

          </div>
        </div>

        {/* Bottom Bar: Copyright & Navigation */}
        <div className="pt-6 border-t border-white/[0.06] flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="font-bold text-slate-200 tracking-wide text-sm">
            Muhammad Asad Usman
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5">
            <a href="#home" className="hover:text-white transition-colors">Home</a>
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            <a href="#services" className="hover:text-white transition-colors">Services</a>
            <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            <a href="#contact" className="hover:text-white transition-colors">Contact</a>
          </div>

          <div>
            © 2025 Muhammad Asad Usman. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
