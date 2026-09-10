import React, { useState, useEffect } from 'react';
import { Send, Menu, X } from 'lucide-react';

export default function Navbar({ onOpenContact }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = ['home', 'about', 'projects', 'services', 'skills', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home' },
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass-nav py-3.5 shadow-lg shadow-black/40'
          : 'bg-[#07090e]/70 backdrop-blur-md py-5 border-b border-white/[0.04]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            MA
          </div>
          <span className="text-lg font-bold tracking-tight text-white group-hover:text-purple-300 transition-colors">
            Muhammad Asad Usman
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative py-1 transition-colors ${
                activeSection === link.id
                  ? 'text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.name}
              {activeSection === link.id && (
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-purple-500 to-cyan-400 rounded-full" />
              )}
            </a>
          ))}
        </nav>

        {/* Desktop "Hire Me" Button */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onOpenContact}
            className="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-500 hover:from-indigo-600 hover:to-pink-600 shadow-md shadow-purple-600/30 hover:shadow-purple-500/50 hover:scale-105 transition-all duration-200"
          >
            <span>Hire Me</span>
            <Send className="w-3.5 h-3.5 rotate-12" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={onOpenContact}
            className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600"
          >
            Hire Me
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-400 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-t border-white/10 px-6 py-4 space-y-3 mt-3 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`block py-2 text-base font-medium ${
                activeSection === link.id
                  ? 'text-purple-400 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
