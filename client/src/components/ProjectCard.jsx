import React from 'react';
import { ExternalLink, ArrowRight, Trash2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, onDelete }) {
  const {
    _id,
    title,
    category,
    description,
    imageUrl,
    liveDemoUrl,
    githubUrl,
    technologies = [],
    glowColor = 'purple'
  } = project;

  // Glow border styling matching the 3 cards in the screenshot
  const glowStyles = {
    purple: 'hover:border-purple-500/60 hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] border-purple-500/30',
    blue: 'hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(59,130,246,0.35)] border-blue-500/30',
    cyan: 'hover:border-cyan-400/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.35)] border-cyan-400/30',
  };

  const arrowBgStyles = {
    purple: 'bg-purple-600 hover:bg-purple-500 shadow-purple-600/40',
    blue: 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/40',
    cyan: 'bg-cyan-600 hover:bg-cyan-500 shadow-cyan-600/40',
  };

  const currentGlow = glowStyles[glowColor] || glowStyles.purple;
  const currentArrowBg = arrowBgStyles[glowColor] || arrowBgStyles.purple;

  return (
    <div
      className={`group relative rounded-3xl bg-[#0a0e19] border ${currentGlow} p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-xl shadow-black/50 overflow-hidden`}
    >
      {/* Top Image Preview Card */}
      <div className="relative w-full h-44 sm:h-48 rounded-2xl overflow-hidden bg-[#111726] border border-white/10 group-hover:border-white/20 transition-colors">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
          }}
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e19] via-transparent to-transparent opacity-60" />

        {/* Category Pill Tag */}
        {category && (
          <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-semibold bg-black/60 backdrop-blur-md text-white border border-white/10">
            {category}
          </span>
        )}

        {/* Delete Quick Option (if provided) */}
        {onDelete && (
          <button
            onClick={() => onDelete(_id)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 text-slate-400 hover:text-red-400 hover:bg-black/80 transition-colors opacity-0 group-hover:opacity-100"
            title="Delete project"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Card Body */}
      <div className="pt-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Circular Arrow Action */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1">
              {title}
            </h3>
            <a
              href={liveDemoUrl && liveDemoUrl !== '#' ? liveDemoUrl : '#'}
              target={liveDemoUrl && liveDemoUrl !== '#' ? '_blank' : '_self'}
              rel="noreferrer"
              className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full ${currentArrowBg} text-white flex items-center justify-center shrink-0 shadow-md group-hover:scale-110 transition-transform`}
              title="Open project live demo"
            >
              <ArrowRight className="w-4 h-4 -rotate-45" />
            </a>
          </div>

          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-400 mt-2 line-clamp-3 leading-relaxed">
            {description}
          </p>

          {/* Technology Badges */}
          <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-4">
            {technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-[#131a2c] text-cyan-300/90 border border-white/5 group-hover:border-cyan-500/20 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Card Footer: Live Demo & GitHub Links */}
        <div className="pt-5 mt-4 border-t border-white/[0.08] flex items-center justify-between text-xs font-semibold">
          {/* Live Demo Option */}
          <a
            href={liveDemoUrl && liveDemoUrl !== '#' ? liveDemoUrl : '#'}
            target={liveDemoUrl && liveDemoUrl !== '#' ? '_blank' : '_self'}
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            <span>Live Demo</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          {/* GitHub Option */}
          <a
            href={githubUrl && githubUrl !== '#' ? githubUrl : '#'}
            target={githubUrl && githubUrl !== '#' ? '_blank' : '_self'}
            rel="noreferrer"
            className="flex items-center gap-1.5 text-slate-300 hover:text-purple-400 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </div>
  );
}
