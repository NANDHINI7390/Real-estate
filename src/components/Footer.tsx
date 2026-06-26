import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  onPageChange: (page: PageView) => void;
  onSelectProperty?: (id: string | null) => void;
}

export default function Footer({ onPageChange, onSelectProperty }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleQuickLink = (page: PageView) => {
    if (onSelectProperty) {
      onSelectProperty(null);
    }
    onPageChange(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const whatsappNumber = '919876543210'; // Demo Indian number
  const whatsappText = encodeURIComponent('Hello Mailam Properties! I would like to enquire about your active property listings.');
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappText}`;

  return (
    <footer className="bg-[#FAFAF8] text-slate-800 border-t border-slate-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Column 1: Company Profile */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="bg-emerald-950 p-2 rounded shadow-inner">
                <span className="font-serif font-black text-amber-500 text-lg tracking-tighter">MP</span>
              </div>
              <span className="font-serif font-bold text-lg tracking-wide text-emerald-950">
                MAILAM PROPERTIES
              </span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed font-sans">
              Mailam Properties is India's premier boutique real estate agency, specializing in top-tier residential apartments, premium villas, plots, and commercial properties across India's high-growth metros.
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="#" className="p-2 bg-slate-100 hover:bg-amber-500 hover:text-white rounded transition-colors text-slate-600" aria-label="Facebook">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 hover:bg-amber-500 hover:text-white rounded transition-colors text-slate-600" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 hover:bg-amber-500 hover:text-white rounded transition-colors text-slate-600" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 bg-slate-100 hover:bg-amber-500 hover:text-white rounded transition-colors text-slate-600" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Navigation */}
          <div>
            <h3 className="text-emerald-950 font-serif font-bold text-sm mb-4 tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2.5 text-sm text-slate-600">
              <li>
                <button onClick={() => handleQuickLink('home')} className="hover:text-amber-600 transition-colors cursor-pointer text-left font-medium">
                  Home Page
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('listings')} className="hover:text-amber-600 transition-colors cursor-pointer text-left font-medium">
                  Property Listings
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('contact')} className="hover:text-amber-600 transition-colors cursor-pointer text-left font-medium">
                  Contact Agency
                </button>
              </li>
              <li>
                <button onClick={() => handleQuickLink('admin')} className="hover:text-amber-600 transition-colors cursor-pointer text-left font-medium">
                  Admin Control Panel
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h3 className="text-emerald-950 font-serif font-bold text-sm mb-4 tracking-wider uppercase">Our Metros</h3>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                <span className="font-medium">Level 14, Prestige Trade Tower, Palace Road, Bengaluru - 560001</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Phone className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium">+91 80 4912 3456</span>
              </li>
              <li className="flex items-center space-x-2.5">
                <Mail className="w-4 h-4 text-amber-600 shrink-0" />
                <span className="font-medium">enquiries@mildamproperties.in</span>
              </li>
            </ul>
          </div>

          {/* Column 4: WhatsApp Direct */}
          <div className="space-y-4">
            <h3 className="text-emerald-950 font-serif font-bold text-sm mb-4 tracking-wider uppercase">Direct Enquiry</h3>
            <p className="text-xs text-slate-600 leading-relaxed font-sans">
              Have a custom requirement? Chat directly with our premium client relation team instantly via WhatsApp.
            </p>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-650 hover:from-green-600 hover:to-emerald-700 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Bottom Banner */}
        <div className="border-t border-slate-200 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 font-mono">
          <div>
            © {currentYear} Mailam Properties India Pvt Ltd. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-amber-600 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-amber-600 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-amber-600 transition-colors">RERA Registered ID: KA-RERA-0012-P</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
