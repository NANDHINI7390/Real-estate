import React from 'react';
import { ShieldCheck, Award, Handshake, Users, ChevronRight, MessageSquare, Quote } from 'lucide-react';
import { Property, PropertyFilters } from '../types';
import HomeHero from '../components/HomeHero';
import PropertyCard from '../components/PropertyCard';

interface HomeProps {
  properties: Property[];
  onSelectProperty: (id: string) => void;
  onNavigateToPage: (page: 'home' | 'listings' | 'detail' | 'contact' | 'admin') => void;
  onSearchSubmit: (filters: PropertyFilters) => void;
}

export default function Home({ properties, onSelectProperty, onNavigateToPage, onSearchSubmit }: HomeProps) {
  // Take first 6 featured properties
  const featuredProperties = properties.slice(0, 6);

  const stats = [
    {
      icon: Award,
      title: '₹2,500+ Crores Sold',
      description: 'Facilitating premier acquisitions of luxurious homes and high-yield offices across India.',
    },
    {
      icon: ShieldCheck,
      title: '100% Legal & Approved',
      description: 'Strict verification of RERA registration, land deeds, and municipal NOCs for absolute peace of mind.',
    },
    {
      icon: Handshake,
      title: 'Transparent Brokerage',
      description: 'Zero hidden fees, transparent escrow agreements, and personalized end-to-end legal support.',
    },
    {
      icon: Users,
      title: '15,000+ Active Clients',
      description: 'Trusted by High-Net-Worth Individuals, corporate enterprises, and NRIs globally.',
    },
  ];

  const testimonials = [
    {
      name: 'Aditya & Priya Nair',
      role: 'Homeowners, Prestige Lakeside',
      text: 'Working with Mailam Properties was absolute perfection. Their legal check on the Bengaluru apartment property title gave us complete security. The entire purchase was smooth, fast, and highly professional.',
    },
    {
      name: 'Dr. Sandeep Goel',
      role: 'NRI Investor, Delhi NCR',
      text: 'As an NRI living in the US, finding trusted advisory in India is extremely difficult. Mailam Properties helped me acquire two premium duplexes in Gurgaon with 100% transparent legal checks and zero-stress escrow.',
    },
    {
      name: 'Meera Chawla',
      role: 'Founder, Chawla Designs, Pune',
      text: 'Our commercial office search in Baner concluded within just 10 days! They understood our workstation requirements and negotiated an exceptional rate. Highly recommended for commercial lease advisory.',
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <HomeHero onSearch={onSearchSubmit} />

      {/* Featured Properties Grid */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold font-mono text-amber-600 tracking-wider uppercase block mb-2">
              ✦ Handpicked Listings ✦
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight">
              Featured Properties
            </h2>
            <p className="text-sm text-slate-500 mt-2 font-sans max-w-xl">
              Inspect our most exclusive verified premium residences and office spaces in strategic business hubs across India.
            </p>
          </div>
          <button
            onClick={() => {
              onNavigateToPage('listings');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 inline-flex items-center gap-1 text-sm font-bold text-amber-600 hover:text-amber-700 hover:underline transition-all cursor-pointer"
          >
            <span>Explore All Properties</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {featuredProperties.length === 0 ? (
          <div className="bg-white rounded-xl p-12 border border-slate-200 text-center">
            <p className="text-slate-500 font-medium">No properties are currently listed. Add some via the Admin portal!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onSelect={onSelectProperty}
              />
            ))}
          </div>
        )}
      </section>

      {/* Corporate Why Choose Us section */}
      <section className="bg-white py-20 border-t border-b border-slate-200 text-slate-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#0A2540_1px,transparent_1px)] [background-size:20px_20px]" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-bold font-mono text-amber-650 tracking-wider uppercase block mb-2">
              ✦ Corporate Standard of Trust ✦
            </span>
            <h2 className="font-serif font-black text-3xl sm:text-4xl tracking-tight text-emerald-950">
              Why Mailam Properties?
            </h2>
            <p className="text-sm text-slate-500 mt-2 leading-relaxed">
              We redefine Indian real estate through institutional trust, absolute legality, and client-centric relationships.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={idx} 
                  className="bg-[#FAFAF8] border border-slate-200 rounded-xl p-6 hover:bg-white hover:border-amber-500 hover:shadow-lg transition-all duration-300 group"
                >
                  <div className="bg-emerald-950 text-amber-400 w-12 h-12 rounded-lg flex items-center justify-center mb-5 shadow-lg group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif font-bold text-lg text-emerald-950 mb-2">
                    {stat.title}
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans font-light">
                    {stat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Review section */}
      <section className="py-20 bg-slate-50 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold font-mono text-amber-600 tracking-wider uppercase block mb-2">
            ✦ Happy Families & Businesses ✦
          </span>
          <h2 className="font-serif font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight">
            Client Endorsements
          </h2>
          <p className="text-sm text-slate-500 mt-2 leading-relaxed">
            Read transparent reviews from families, business owners, and global investors who found their ideal property with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <div 
              key={idx} 
              className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-xs relative flex flex-col justify-between"
            >
              <Quote className="w-8 h-8 text-amber-500/15 absolute top-5 right-5" />
              <div className="space-y-4">
                <p className="text-slate-600 text-xs italic leading-relaxed font-sans">
                  "{item.text}"
                </p>
              </div>
              <div className="border-t border-slate-100 pt-4 mt-6">
                <h4 className="font-serif font-bold text-sm text-emerald-950">{item.name}</h4>
                <span className="text-[10px] text-slate-400 font-mono tracking-wide block mt-0.5">{item.role}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
