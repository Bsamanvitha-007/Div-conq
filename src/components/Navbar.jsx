import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Menu, 
  X,
  Presentation
} from 'lucide-react';


export const Navbar = ({ onOpenPresentation }) => {
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolledRatio = height > 0 ? (winScroll / height) * 100 : 0;
      setScrollProgress(scrolledRatio);

      if (winScroll > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Detect active section
      const sections = ['hero', 'journey', 'algorithms', 'simulation', 'comparison', 'complexity', 'takeaways'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Overview', href: '#hero', id: 'hero' },
    { name: 'Journey', href: '#journey', id: 'journey' },
    { name: 'Algorithms', href: '#algorithms', id: 'algorithms' },
    { name: 'Simulation', href: '#simulation', id: 'simulation' },
    { name: 'Comparison', href: '#comparison', id: 'comparison' },
    { name: 'Complexity', href: '#complexity', id: 'complexity' },
    { name: 'Takeaways', href: '#takeaways', id: 'takeaways' }
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#070B14]/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-cyan-950/20 py-3' 
        : 'bg-transparent py-5'
    }`}>
      {/* Scroll Progress Bar */}
      <div 
        className="absolute top-0 left-0 h-[2.5px] bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900/80 border border-cyan-500/40 group-hover:border-cyan-400 transition-colors shadow-sm shadow-cyan-500/20">
            <Activity className="w-5 h-5 text-cyan-400 animate-pulse-subtle" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping opacity-75" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-lg tracking-wider text-white">ALGO</span>
              <span className="text-cyan-400 font-mono text-sm font-light">/</span>
              <span className="font-heading font-medium text-lg tracking-wider text-slate-300">MOBILITY LAB</span>
            </div>
            <div className="text-[10px] font-mono tracking-widest text-slate-400 uppercase -mt-0.5">
              DAA • UNIT II CONTROL CENTER
            </div>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-slate-900/50 p-1 rounded-full border border-slate-800/70 backdrop-blur-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? 'text-cyan-300 bg-cyan-950/60 border border-cyan-500/40 shadow-sm shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenPresentation}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold font-mono tracking-wide text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 hover:border-cyan-400 transition-all shadow-sm hover:shadow-cyan-500/20 cursor-pointer"
            title="Open College Presentation & Viva Companion (Press V)"
          >
            <Presentation className="w-3.5 h-3.5 text-cyan-400" />
            <span>VIVA GUIDE</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 rounded bg-slate-900 text-[10px] text-cyan-400 border border-slate-700">V</kbd>
          </button>

        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#0B111E]/95 backdrop-blur-xl border-b border-slate-800 px-5 py-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                  activeSection === link.id
                    ? 'text-cyan-400 bg-cyan-950/50 border border-cyan-500/40'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-2 border-t border-slate-800/80">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPresentation();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold font-mono text-cyan-300 bg-cyan-950/60 border border-cyan-500/40"
            >
              <Presentation className="w-4 h-4 text-cyan-400" />
              <span>COLLEGE PRESENTATION & VIVA GUIDE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
