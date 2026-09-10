import React, { useState } from 'react';
import { X, Send, CheckCircle2 } from 'lucide-react';
import { sendContactMessage } from '../services/api';
import confetti from 'canvas-confetti';

export default function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setError('Please fill in Name, Email and Message.');
      return;
    }

    setLoading(true);

    try {
      const res = await sendContactMessage(formData);
      if (res.success) {
        setSuccess(true);
        confetti({
          particleCount: 70,
          spread: 50,
          origin: { y: 0.6 }
        });
        setTimeout(() => {
          setFormData({ name: '', email: '', phone: '', message: '' });
          setSuccess(false);
          onClose();
        }, 2500);
      } else {
        setError(res.message || 'Failed to send message.');
      }
    } catch (err) {
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-lg bg-[#0b0f19] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-purple-950/40 my-8">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-pink-500 flex items-center justify-center text-white shadow-md shadow-purple-500/30">
            <Send className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">Let's Work Together</h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Send me a direct message or project inquiry
            </p>
          </div>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-xl font-bold text-white">Message Sent!</h3>
            <p className="text-sm text-slate-300">
              Thank you for reaching out. I'll get back to you promptly!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="John Doe"
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Your Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Phone (Optional)
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 312 3456789"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                Your Message *
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell me about your project, timeline, and goals..."
                className="w-full px-4 py-2.5 rounded-xl bg-[#111726] border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-purple-500 transition-colors resize-none"
              />
            </div>

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
                className="flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 shadow-md shadow-purple-600/30 hover:scale-105 disabled:opacity-50 transition-all"
              >
                <Send className="w-4 h-4" />
                <span>{loading ? 'Sending...' : 'Send Message'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
