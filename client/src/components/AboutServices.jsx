import React from 'react';
import {
  Download,
  Layers,
  ShoppingBag,
  Layout,
  Share2,
  GitBranch,
  Zap
} from 'lucide-react';

export default function AboutServices() {
  const services = [
    {
      title: 'MERN Stack Development',
      description: 'React, Node, Express, MongoDB',
      icon: Layers,
      color: 'text-cyan-400',
      bgGlow: 'from-cyan-500/10 to-transparent',
      borderColor: 'group-hover:border-cyan-500/40',
    },
    {
      title: 'Shopify E-commerce Development',
      description: 'Custom stores, themes, app integration',
      icon: ShoppingBag,
      color: 'text-emerald-400',
      bgGlow: 'from-emerald-500/10 to-transparent',
      borderColor: 'group-hover:border-emerald-500/40',
    },
    {
      title: 'Responsive & Modern UI',
      description: 'Clean, fast and user-friendly designs',
      icon: Layout,
      color: 'text-purple-400',
      bgGlow: 'from-purple-500/10 to-transparent',
      borderColor: 'group-hover:border-purple-500/40',
    },
    {
      title: 'API Integration',
      description: 'Payment gateways, third-party APIs',
      icon: Share2,
      color: 'text-blue-400',
      bgGlow: 'from-blue-500/10 to-transparent',
      borderColor: 'group-hover:border-blue-500/40',
    },
    {
      title: 'Git & GitHub',
      description: 'Version control & collaboration',
      icon: GitBranch,
      color: 'text-violet-400',
      bgGlow: 'from-violet-500/10 to-transparent',
      borderColor: 'group-hover:border-violet-500/40',
    },
    {
      title: 'Problem Solving',
      description: 'Clean code, optimized performance',
      icon: Zap,
      color: 'text-rose-400',
      bgGlow: 'from-rose-500/10 to-transparent',
      borderColor: 'group-hover:border-rose-500/40',
    },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div id="services" className="scroll-mt-24"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: About Me Bio */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest">
              ABOUT ME
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
              I'm a Passionate Full Stack Developer
            </h2>

            <p className="text-slate-300 text-base leading-relaxed">
              I specialize in building modern web applications using MERN stack and Shopify. I love turning ideas into real products and helping businesses grow online through clean code, great UI/UX and powerful e-commerce solutions.
            </p>

            <div className="pt-2">
              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-sm font-semibold text-white bg-[#0f1422] border border-white/10 hover:border-cyan-400/50 hover:bg-[#151c30] shadow-md hover:shadow-cyan-500/20 transition-all duration-200"
              >
                <Download className="w-4 h-4 text-cyan-400" />
                <span>Download CV</span>
              </a>
            </div>
          </div>

          {/* Right Column: 6 Services Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {services.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className={`group relative p-5 rounded-2xl bg-[#0b0f19] border border-white/[0.07] ${item.borderColor} transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/40 overflow-hidden`}
                >
                  {/* Subtle hover gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.bgGlow} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                  <div className="relative z-10 flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl bg-[#141b2d] border border-white/10 ${item.color} shrink-0 group-hover:scale-110 transition-transform duration-200`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-white group-hover:text-white transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-snug">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
