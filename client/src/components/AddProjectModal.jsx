import React, { useState } from 'react';
import { X, Plus, Image as ImageIcon, Link as LinkIcon, Sparkles } from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';

export default function AddProjectModal({ isOpen, onClose, onProjectAdded }) {
  const [formData, setFormData] = useState({
    title: '',
    category: 'E-commerce',
    description: '',
    imageUrl: '',
    liveDemoUrl: '',
    githubUrl: '',
    technologies: 'React, Node.js, MongoDB, Tailwind',
    glowColor: 'purple',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Sample quick images for fast testing
  const sampleImages = [
    { label: 'E-commerce', url: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80' },
    { label: 'Dashboard', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
    { label: 'Fintech / App', url: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?auto=format&fit=crop&w=800&q=80' },
    { label: 'Creative Brand', url: 'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?auto=format&fit=crop&w=800&q=80' },
  ];

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please provide both a Title and a Description.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        imageUrl: formData.imageUrl.trim() || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
        liveDemoUrl: formData.liveDemoUrl.trim() || '#',
        githubUrl: formData.githubUrl.trim() || '#',
        technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      };

      await onProjectAdded(payload);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });

      onClose();
    } catch (err) {
      setError(err.message || 'Error saving project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b0f19] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-purple-600 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Add New Project</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Add a new card to your portfolio with custom image & live links
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs sm:text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          
          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Project Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g. ScentAura – Perfume Store"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Category
              </label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g. E-commerce, Business Website"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Image Option */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              <span className="flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                Image URL (Option for Card Thumbnail)
              </span>
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://images.unsplash.com/... or paste any image link"
              className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
            />

            {/* Quick Preset Images */}
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-[11px] text-slate-500">Quick presets:</span>
              {sampleImages.map((sample, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setFormData({ ...formData, imageUrl: sample.url })}
                  className="px-2 py-0.5 rounded-md bg-[#161f33] text-[11px] text-cyan-300 hover:bg-cyan-950/40 border border-white/5 transition-colors"
                >
                  {sample.label}
                </button>
              ))}
            </div>

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="mt-2 w-full h-28 rounded-xl overflow-hidden border border-white/10 bg-black/40">
                <img
                  src={formData.imageUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
              </div>
            )}
          </div>

          {/* Links Options: Live Demo Link & GitHub Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                  Live Demo Link (Option)
                </span>
              </label>
              <input
                type="url"
                value={formData.liveDemoUrl}
                onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                placeholder="https://yourproject.com"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <GithubIcon className="w-3.5 h-3.5 text-purple-400" />
                  GitHub Repository Link (Option)
                </span>
              </label>
              <input
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/username/repo"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-400 transition-colors"
              />
            </div>
          </div>

          {/* Technologies & Card Glow Color */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                value={formData.technologies}
                onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
                placeholder="React, Node.js, MongoDB, Tailwind"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Card Glow Style
              </label>
              <select
                value={formData.glowColor}
                onChange={(e) => setFormData({ ...formData, glowColor: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white text-sm focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="purple">Neon Purple Glow</option>
                <option value="blue">Electric Blue Glow</option>
                <option value="cyan">Bright Cyan Glow</option>
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Description *
            </label>
            <textarea
              required
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of the project features, responsive layout, stack, etc."
              className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          {/* Submit Action */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white gradient-btn-primary shadow-lg shadow-purple-600/30 hover:scale-105 disabled:opacity-50 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>{loading ? 'Adding Project...' : 'Add Project Card'}</span>
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
