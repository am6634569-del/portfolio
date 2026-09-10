import React, { useState } from 'react';
import ProjectCard from './ProjectCard';
import { Plus, Sparkles } from 'lucide-react';

export default function Projects({ projects, onOpenAddModal, onDeleteProject }) {
  const [activeFilter, setActiveFilter] = useState('All');

  const categories = ['All', 'E-commerce', 'Business Website'];

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(p => p.category?.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <section id="projects" className="py-24 relative">
      {/* Glow aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-72 bg-purple-900/10 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <span className="text-xs sm:text-sm font-semibold text-cyan-400 uppercase tracking-widest">
            MY PROJECTS
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Featured Projects
          </h2>

          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Here are some of my recent projects. Each project is fully responsive and built with modern technologies.
          </p>
        </div>

        {/* Action Toolbar: Filter Chips & "+ Add Project" Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 mb-10">
          {/* Category Filter Buttons */}
          <div className="flex items-center gap-2 p-1.5 rounded-full bg-[#0d121f] border border-white/10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${
                  activeFilter === cat
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* User's Key Request: Button to Add Project with Link & Image Options */}
          <button
            onClick={onOpenAddModal}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold text-white gradient-btn-primary shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project (Img & Link)</span>
          </button>
        </div>

        {/* Projects Grid (Responsive: 1 col on mobile, 2 cols on tablet, 3 cols on desktop) */}
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-3xl bg-[#0b0f19] border border-white/10">
            <p className="text-slate-400 text-base mb-4">No projects found in this category.</p>
            <button
              onClick={onOpenAddModal}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-purple-600 hover:bg-purple-500"
            >
              <Plus className="w-4 h-4" /> Add Your First Project
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project._id || project.title}
                project={project}
                onDelete={onDeleteProject}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
