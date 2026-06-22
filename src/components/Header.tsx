import { useState, useEffect } from 'react';
import { ViewType } from '../types';
import { Menu, X, Sun, Moon, UtensilsCrossed } from 'lucide-react';

interface HeaderProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  isThemeDark: boolean;
  setIsThemeDark: (dark: boolean) => void;
}

export default function Header({ currentView, setView, isThemeDark, setIsThemeDark }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Apply themes
    const rootElement = document.documentElement;
    if (isThemeDark) {
      rootElement.classList.add('dark');
    } else {
      rootElement.classList.remove('dark');
    }
  }, [isThemeDark]);

  const navItems = [
    { label: 'Home', value: 'home' as ViewType },
    { label: 'Digital Menu', value: 'menu' as ViewType },
    // { label: 'Table Booking', value: 'booking' as ViewType },
    { label: 'Franchise', value: 'franchise' as ViewType },
    { label: 'Reviews', value: 'reviews' as ViewType },
  ];

  const handleNavClick = (view: ViewType) => {
    setView(view);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-neutral-dark/90 dark:bg-neutral-dark/95 backdrop-blur-md border-b border-outline-variant/30 text-on-surface shadow-md">
      <div className="max-w-7xl mx-auto px-4 md:px-12 py-3 flex items-center justify-between">
        {/* Brand Logo & Name */}
        <div 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <img 
            alt="Mr. Khao Khilao Logo" 
            className="h-10 w-10 object-cover rounded-full border border-primary/40 group-hover:scale-105 transition-transform duration-300"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCxODjpcYCxWNh61u0J9w8ocOXpWCQwlapSEaBRt9LrG6ODnFb1D-ho9Vt5P3dbJKowAMSar-r8y0dq3v_IEZIjuWziPfjMQQ79Y8NdRf7Y78szZExJlBLS4MDu25xyIRG0TtYwYRHHS7waHwxCZ-j5MKqc9RBEwlHcAtfLNFx3Nmu-HmYEBh8Eaha0TrhGqI_TjbGijEGLwtEFcFrDYdyix06RCxwLAo8GklbQRVBu8JhkNGiWEurXEPIIFVgrMgsl2irh89aY9S_H"
          />
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold text-primary tracking-tight leading-none">
              Chef Piyush Gupta
            </span>
            <span className="text-[10px] font-sans text-on-surface-variant font-semibold tracking-widest uppercase">
              Mr. Khao Khilao
            </span>
          </div>
          <div className="pure-veg-indicator ml-1" title="Pure Vegetarian Excellence">
            <div className="pure-veg-dot"></div>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = currentView === item.value;
            return (
              <button
                key={item.value}
                onClick={() => handleNavClick(item.value)}
                className={`font-sans text-xs font-semibold uppercase tracking-widest relative py-1 transition-colors duration-300 hover:text-primary ${
                  isActive ? 'text-primary' : 'text-on-surface-variant'
                }`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-gold rounded-full transition-all duration-300" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Utility Buttons */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsThemeDark(!isThemeDark)}
            className="p-1.5 rounded-full text-on-surface-variant hover:text-primary hover:bg-surface-container-high/40 transition-all duration-300"
            title="Toggle theme"
          >
            {isThemeDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button 
            onClick={() => handleNavClick('booking')}
            className="hidden sm:inline-block bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-semibold px-5 py-2 uppercase tracking-widest transition-all duration-300 active:scale-95 shadow-md shadow-primary-gold/10"
          >
            Book Now
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1 rounded text-on-surface-variant hover:text-primary transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-dark border-t border-outline-variant/30 py-6 px-8 flex flex-col gap-5 shadow-2xl animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.value}
              onClick={() => handleNavClick(item.value)}
              className={`text-left font-sans text-xs font-bold uppercase tracking-widest py-2 border-b border-outline-variant/10 ${
                currentView === item.value ? 'text-primary border-primary/30' : 'text-on-surface-variant'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('booking')}
            className="w-full bg-primary-gold hover:bg-primary-gold/90 text-neutral-dark text-xs font-semibold py-3 uppercase tracking-widest transition-all duration-300 shadow-md text-center mt-2"
          >
            Book Now
          </button>
        </div>
      )}
    </header>
  );
}
