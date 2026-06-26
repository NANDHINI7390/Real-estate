import React, { useState } from 'react';
import { Menu, X, Home, List, PhoneCall, ShieldAlert, Key } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentPage: PageView;
  onPageChange: (page: PageView) => void;
  onSelectProperty?: (id: string | null) => void;
}

export default function Navbar({ currentPage, onPageChange, onSelectProperty }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page: PageView) => {
    if (onSelectProperty) {
      onSelectProperty(null); // Clear active property selection when navigating
    }
    onPageChange(page);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navItems = [
    { label: 'Home', page: 'home' as PageView, icon: Home },
    { label: 'Properties', page: 'listings' as PageView, icon: List },
    { label: 'Contact Us', page: 'contact' as PageView, icon: PhoneCall },
    { label: 'Admin Portal', page: 'admin' as PageView, icon: Key },
  ];

  return (
    <nav className="bg-white/95 text-slate-800 shadow-sm sticky top-0 z-50 border-b border-slate-200/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('home')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="bg-emerald-950 p-2.5 rounded-lg shadow-inner flex items-center justify-center transition-transform group-hover:scale-105">
              <span className="font-serif font-black text-amber-500 text-2xl tracking-tighter">MP</span>
            </div>
            <div>
              <span className="font-serif font-bold text-xl tracking-wide block text-emerald-950">
                MAILAM PROPERTIES
              </span>
              <span className="text-[10px] tracking-widest text-slate-500 block uppercase font-medium">
                Luxury Indian Estates
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center space-x-1.5 px-3 py-2 text-sm tracking-wide transition-colors duration-150 relative ${
                    isActive 
                      ? 'text-amber-600 font-semibold' 
                      : 'text-slate-600 hover:text-emerald-950 font-medium'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-amber-500 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 hover:text-emerald-950 hover:bg-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-[#FAFAF8] border-t border-slate-200 animate-fadeIn">
          <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.page;
              return (
                <button
                  key={item.page}
                  onClick={() => handleNavClick(item.page)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 rounded-md text-base font-medium transition-colors ${
                    isActive
                      ? 'bg-amber-500/10 text-amber-700 border-l-4 border-amber-500 pl-3 font-semibold'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-emerald-950'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
