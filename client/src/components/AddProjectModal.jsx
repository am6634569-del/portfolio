import React, { useState, useRef } from 'react';
import { X, Plus, Image as ImageIcon, Link as LinkIcon, Sparkles, Upload, Check } from 'lucide-react';
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

  const [activeTab, setActiveTab] = useState('upload'); // 'upload' | 'url'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef(null);

  // Sample quick images for fast testing
  const sampleImages = [
    { label: 'Hammé Naturals', url: '/hamme-naturals.png' },
    { label: 'Instant Home', url: '/instant-home-offers.png' },
    { label: 'ScentAura', url: '/scentaura.png' },
    { label: 'Clothing Brand', url: '/shopify.png' },
  ];

  if (!isOpen) return null;

  // Handle local file selection from Computer / Desktop
  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file (PNG, JPG, WEBP, etc.)');
        return;
      }
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, imageUrl: reader.result }));
        setError('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Please provide both a Title and a Description.');
      return;
    }

    setLoading(true);

    try {
      let resolvedImageUrl = formData.imageUrl.trim();

      // Smart resolution: if user entered simple filename like "home.png" or "myimage.jpg"
      if (
        resolvedImageUrl &&
        !resolvedImageUrl.startsWith('http://') &&
        !resolvedImageUrl.startsWith('https://') &&
        !resolvedImageUrl.startsWith('data:')
      ) {
        if (!resolvedImageUrl.startsWith('/')) {
          resolvedImageUrl = `/${resolvedImageUrl}`;
        }
      }

      if (!resolvedImageUrl) {
        resolvedImageUrl = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
      }

      const payload = {
        ...formData,
        imageUrl: resolvedImageUrl,
        liveDemoUrl: formData.liveDemoUrl.trim() || '#',
        githubUrl: formData.githubUrl.trim() || '#',
        technologies: formData.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      };

      await onProjectAdded(payload);

      // Trigger celebration confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 },
      });

      // Reset form
      setFormData({
        title: '',
        category: 'E-commerce',
        description: '',
        imageUrl: '',
        liveDemoUrl: '',
        githubUrl: '',
        technologies: 'React, Node.js, MongoDB, Tailwind',
        glowColor: 'purple',
      });
      setFileName('');

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
              Add a new project with image (upload or URL) and live links
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
                placeholder="e.g. Hammé Naturals E-commerce"
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
                placeholder="e.g. E-commerce, Real Estate, Business"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Image Upload / URL Selector */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <ImageIcon className="w-3.5 h-3.5 text-cyan-400" />
                Project Image
              </label>

              {/* Mode Toggle Buttons */}
              <div className="flex items-center p-0.5 rounded-lg bg-[#111726] border border-white/10 text-[11px]">
                <button
                  type="button"
                  onClick={() => setActiveTab('upload')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'upload'
                      ? 'bg-purple-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Upload from Computer
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('url')}
                  className={`px-3 py-1 rounded-md transition-all ${
                    activeTab === 'url'
                      ? 'bg-purple-600 text-white font-medium'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Enter Name / URL
                </button>
              </div>
            </div>

            {/* TAB 1: Upload from Computer / Desktop */}
            {activeTab === 'upload' && (
              <div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleDrop}
                  className="w-full border-2 border-dashed border-white/15 hover:border-cyan-400/60 rounded-2xl p-4 sm:p-6 text-center cursor-pointer bg-[#0e1424] hover:bg-[#131b30] transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 mx-auto flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-white">
                    Click to browse or drag & drop image from Desktop
                  </p>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Supports PNG, JPG, JPEG, WEBP
                  </p>
                  {fileName && (
                    <div className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs">
                      <Check className="w-3.5 h-3.5" />
                      <span>{fileName}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* TAB 2: Text input for URL or filename (e.g. home.png, https://...) */}
            {activeTab === 'url' && (
              <div className="space-y-2">
                <input
                  type="text"
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="e.g. home.png, instant-home-offers.png, or https://..."
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                />
                <p className="text-[11px] text-slate-400">
                  Tip: Aap image ka direct name jaise <code className="text-cyan-300">home.png</code> ya full URL paste kar sakte hain.
                </p>

                {/* Quick Presets */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
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
              </div>
            )}

            {/* Live Image Preview */}
            {formData.imageUrl && (
              <div className="mt-3 relative w-full h-36 rounded-2xl overflow-hidden border border-white/15 bg-black/40 shadow-inner group">
                <img
                  src={formData.imageUrl}
                  alt="Project Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <button
                  type="button"
                  onClick={() => {
                    setFormData({ ...formData, imageUrl: '' });
                    setFileName('');
                  }}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-slate-300 hover:text-white hover:bg-black transition-colors"
                  title="Remove Image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Links Options: Live Demo Link & GitHub Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                <span className="flex items-center gap-1.5">
                  <LinkIcon className="w-3.5 h-3.5 text-cyan-400" />
                  Live Demo Link
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
                  GitHub Link (Option)
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
