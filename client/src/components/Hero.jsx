import React from 'react';
import {
  Code,
  Mail,
  MapPin,
  Laptop,
} from 'lucide-react';
import {
  GithubIcon,
  FacebookIcon,
  TwitterXIcon,
  WhatsAppIcon
} from './Icons';

export default function Hero({ onOpenContact }) {
  return (
    <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background ambient lighting glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[450px] h-[450px] bg-purple-600/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 left-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Bio & Intro */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-block">
              <span className="text-sm md:text-base font-medium text-cyan-400 tracking-wide uppercase">
                Hello, I'm
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
              <span className="bg-gradient-to-r from-cyan-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
                Muhammad Asad Usman
              </span>
            </h1>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
              Full Stack <span className="text-purple-400">Developer</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
              I build modern, fast and scalable web applications with React, Node.js, Express, MongoDB and I also create high-converting Shopify & E-commerce websites for clothing brands and businesses.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#projects"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-white gradient-btn-primary shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
              >
                <span>View My Projects</span>
                <Code className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenContact}
                className="flex items-center gap-2.5 px-6 py-3 rounded-full font-medium text-slate-200 bg-[#0d121f] hover:bg-[#151c30] border border-white/10 hover:border-purple-500/40 hover:text-white transition-all duration-200"
              >
                <span>Contact Me</span>
                <Mail className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/923286009274"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-5 py-3 rounded-full font-medium text-emerald-300 bg-[#072418] hover:bg-[#0c3726] border border-emerald-500/40 hover:border-emerald-400 hover:text-white transition-all duration-200"
              >
                <WhatsAppIcon className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center justify-center lg:justify-start gap-3.5 pt-4">
              <a
                href="https://github.com/am6634569-del"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub Profile"
                className="w-10 h-10 rounded-full bg-[#0d121f] border border-white/10 flex items-center justify-center text-slate-300 hover:text-cyan-400 hover:border-cyan-400/50 hover:scale-110 transition-all duration-200"
              >
                <GithubIcon className="w-5 h-5" />
              </a>
              <a
                href="https://wa.me/923286009274"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp Chat"
                className="w-10 h-10 rounded-full bg-[#0d121f] border border-white/10 flex items-center justify-center text-slate-300 hover:text-emerald-400 hover:border-emerald-400/50 hover:scale-110 transition-all duration-200"
                title="Chat on WhatsApp: 03286009274"
              >
                <WhatsAppIcon className="w-5 h-5 text-emerald-400" />
              </a>
              <a
                href="https://www.facebook.com/share/1DBzx9wWbQ/?mibextid=wwXIfr"
                target="_blank"
                rel="noreferrer"
                aria-label="Facebook Profile"
                className="w-10 h-10 rounded-full bg-[#0d121f] border border-white/10 flex items-center justify-center text-slate-300 hover:text-indigo-400 hover:border-indigo-400/50 hover:scale-110 transition-all duration-200"
                title="Facebook Profile"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (Twitter) Profile"
                className="w-10 h-10 rounded-full bg-[#0d121f] border border-white/10 flex items-center justify-center text-slate-300 hover:text-purple-400 hover:border-purple-400/50 hover:scale-110 transition-all duration-200"
              >
                <TwitterXIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right Column: Hero Profile Presentation */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row items-center justify-center gap-6 relative">
            
            {/* Playful scribble note "Let's Build Something Great" */}
            <div className="absolute -top-10 sm:-top-8 right-2 sm:right-6 text-slate-200 font-handwriting text-xl sm:text-2xl rotate-6 flex items-center gap-1 select-none pointer-events-none z-20">
              <span>Let's Build<br />Something Great</span>
              <svg className="w-8 h-8 text-cyan-400 -rotate-12 translate-y-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 14c4 3 11 3 15-2" />
                <path d="M19 12l-2 5" />
              </svg>
            </div>

            {/* Profile Picture Card with glowing backdrop */}
            <div className="relative group">
              {/* Vibrant neon gradient backplate */}
              <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-indigo-600 to-purple-600 rounded-[2.5rem] blur-xl opacity-60 group-hover:opacity-90 transition duration-500 animate-pulse" />
              
              {/* Outer decorative glowing borders */}
              <div className="relative w-64 h-72 sm:w-72 sm:h-80 rounded-[2.2rem] p-1 bg-gradient-to-tr from-cyan-400 via-indigo-500 to-purple-500 shadow-2xl overflow-hidden">
                <div className="w-full h-full rounded-[2rem] overflow-hidden bg-[#0a0d16] flex items-center justify-center relative">
                  <img
                    src="/profile.png"
                    alt="Muhammad Asad Usman"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80";
                    }}
                  />
                  {/* Subtle inner dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07090e]/70 via-transparent to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Floating Info / Status Card (Experience 0+ Projects removed, WhatsApp added) */}
            <div className="w-full sm:w-64 glass-panel rounded-2xl p-4 border border-white/10 shadow-xl space-y-3 relative z-10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400 border border-purple-500/20 shrink-0">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Mianwali, Pakistan</div>
                  <div className="text-[11px] text-slate-400">(Open for Remote & Islamabad)</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shrink-0">
                  <Laptop className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Available for Freelance</div>
                  <div className="text-[11px] text-slate-400">& Full-Time Opportunities</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                  <WhatsAppIcon className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">WhatsApp & Call</div>
                  <a
                    href="https://wa.me/923286009274"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] text-emerald-400 hover:underline block"
                  >
                    03286009274
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
