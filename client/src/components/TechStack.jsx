import React from 'react';

export default function TechStack() {
  const technologies = [
    {
      name: 'React.js',
      icon: (
        <svg className="w-8 h-8 text-cyan-400 group-hover:rotate-180 transition-transform duration-700" viewBox="0 0 115.3 100">
          <ellipse cx="57.65" cy="50" rx="55" ry="20" fill="none" stroke="currentColor" strokeWidth="4" />
          <ellipse cx="57.65" cy="50" rx="55" ry="20" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(60 57.65 50)" />
          <ellipse cx="57.65" cy="50" rx="55" ry="20" fill="none" stroke="currentColor" strokeWidth="4" transform="rotate(120 57.65 50)" />
          <circle cx="57.65" cy="50" r="8" fill="currentColor" />
        </svg>
      ),
      glow: 'hover:border-cyan-400/50 hover:shadow-cyan-400/20'
    },
    {
      name: 'Node.js',
      icon: (
        <svg className="w-8 h-8 text-emerald-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l9 5.2v10.4l-9 5.2-9-5.2V7.2L12 2zm0 2.3L4.9 8.4v7.2L12 19.7l7.1-4.1V8.4L12 4.3z" />
          <path d="M12 7a4 4 0 0 0-4 4v2a4 4 0 0 0 8 0v-2a4 4 0 0 0-4-4z" />
        </svg>
      ),
      glow: 'hover:border-emerald-400/50 hover:shadow-emerald-400/20'
    },
    {
      name: 'Express.js',
      icon: (
        <span className="text-xl font-mono font-bold text-white tracking-tighter px-1">
          ex
        </span>
      ),
      glow: 'hover:border-slate-300/50 hover:shadow-white/20'
    },
    {
      name: 'MongoDB',
      icon: (
        <svg className="w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C11.5 3 7 8 7 13.5c0 4 3 6.5 5 7.5 2-1 5-3.5 5-7.5C17 8 12.5 3 12 2zm0 18.5c-.3-.1-3.5-1.7-3.5-5.5 0-3.3 2.5-6.8 3.5-8.2 1 1.4 3.5 4.9 3.5 8.2 0 3.8-3.2 5.4-3.5 5.5z" />
          <path d="M11.5 22v-3h1v3z" />
        </svg>
      ),
      glow: 'hover:border-emerald-500/50 hover:shadow-emerald-500/20'
    },
    {
      name: 'Shopify',
      icon: (
        <svg className="w-8 h-8 text-lime-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M15.5 3.5L13.8 2 9.5 4.5 7.2 9l6.5 1.5 4.5-5.5-2.7-1.5zm-5.7 6.7l-4.5-1-1.8 11.8L12 23l6.5-2 1.5-12.8-8.2 2z" />
          <path d="M13 8.5c-.4 0-.8.3-.8.7l-.4 3.3c.4 0 .7.1 1.1.2l.6-3.5c0-.4-.2-.7-.5-.7z" />
        </svg>
      ),
      glow: 'hover:border-lime-400/50 hover:shadow-lime-400/20'
    },
    {
      name: 'Git',
      icon: (
        <svg className="w-8 h-8 text-orange-500" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19.4 10.4l-5.8-5.8c-.8-.8-2-.8-2.8 0L9.4 6 12 8.6c.6-.2 1.3 0 1.7.4.5.5.6 1.2.4 1.7l2.5 2.5c.6-.2 1.3 0 1.7.4.7.7.7 1.9 0 2.6s-1.9.7-2.6 0c-.5-.5-.6-1.2-.4-1.7l-2.4-2.4v4.5c.2.2.3.4.3.7 0 1-.8 1.8-1.8 1.8s-1.8-.8-1.8-1.8c0-.7.4-1.3 1-1.6V9.4c-.6-.3-1-.9-1-1.6 0-.6.3-1.2.8-1.5L4.6 11.2c-.8.8-.8 2 0 2.8l5.8 5.8c.8.8 2 .8 2.8 0l6.2-6.2c.8-.8.8-2.1 0-2.9z" />
        </svg>
      ),
      glow: 'hover:border-orange-500/50 hover:shadow-orange-500/20'
    },
    {
      name: 'GitHub',
      icon: (
        <svg className="w-8 h-8 text-slate-200" viewBox="0 0 24 24" fill="currentColor">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
        </svg>
      ),
      glow: 'hover:border-white/50 hover:shadow-white/20'
    },
    {
      name: 'Tailwind CSS',
      icon: (
        <svg className="w-8 h-8 text-cyan-400" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z" />
        </svg>
      ),
      glow: 'hover:border-cyan-400/50 hover:shadow-cyan-400/20'
    },
    {
      name: 'JavaScript',
      icon: (
        <div className="w-7 h-7 bg-amber-400 rounded text-black font-extrabold flex items-center justify-end pr-1 text-sm leading-none select-none">
          JS
        </div>
      ),
      glow: 'hover:border-amber-400/50 hover:shadow-amber-400/20'
    },
    {
      name: 'HTML & CSS',
      icon: (
        <div className="flex items-center gap-0.5">
          <span className="px-1.5 py-0.5 rounded bg-orange-600 text-white font-bold text-xs">5</span>
          <span className="px-1.5 py-0.5 rounded bg-blue-600 text-white font-bold text-xs">3</span>
        </div>
      ),
      glow: 'hover:border-blue-400/50 hover:shadow-blue-400/20'
    },
  ];

  return (
    <section id="skills" className="py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        
        <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest">
          TECH STACK
        </span>

        <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
          Technologies I Use
        </h2>

        {/* Floating Glassmorphic Pill Container */}
        <div className="pt-6">
          <div className="glass-panel rounded-2xl md:rounded-full p-4 sm:p-6 border border-white/10 shadow-2xl inline-flex flex-wrap items-center justify-center gap-6 sm:gap-8 max-w-5xl mx-auto">
            {technologies.map((tech, i) => (
              <div
                key={i}
                className="group flex flex-col items-center gap-2 transition-all duration-300 hover:scale-110 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-xl bg-[#111726] border border-white/10 flex items-center justify-center group-hover:border-purple-500/50 group-hover:shadow-lg transition-all duration-300">
                  {tech.icon}
                </div>
                <span className="text-xs font-medium text-slate-400 group-hover:text-slate-200 transition-colors">
                  {tech.name}
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
