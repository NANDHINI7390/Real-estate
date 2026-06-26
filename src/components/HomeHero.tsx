import React, { useState, useEffect } from 'react';
import { Search, MapPin, Landmark, DollarSign } from 'lucide-react';
import { PropertyFilters } from '../types';
import { AVAILABLE_CITIES } from '../data/sampleData';

interface HomeHeroProps {
  onSearch: (filters: PropertyFilters) => void;
}

export default function HomeHero({ onSearch }: HomeHeroProps) {
  const [purpose, setPurpose] = useState<'Buy' | 'Rent'>('Buy');
  const [city, setCity] = useState('All');
  const [propertyType, setPropertyType] = useState('All');
  const [maxPrice, setMaxPrice] = useState(500); // 500 Lakhs for Buy, will adjust for Rent

  // Sync default sliders based on Buy vs Rent
  useEffect(() => {
    if (purpose === 'Rent') {
      setMaxPrice(200); // Max 2 Lakh/mo rent (200 thousand Rupees)
    } else {
      setMaxPrice(500); // Max 5 Cr (500 Lakhs)
    }
  }, [purpose]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const filters: PropertyFilters = {
      purpose,
      city,
      type: propertyType,
      minPrice: 0,
      maxPrice: maxPrice,
      bhk: 'All'
    };
    onSearch(filters);
  };

  return (
    <div className="relative bg-[#FAFAF8] py-12 md:py-20 overflow-hidden border-b border-slate-200/80">
      {/* Decorative premium architectural background */}
      <div className="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#0A2540_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-950/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline and Search Panel (ordered second on mobile) */}
          <div className="order-2 lg:order-1 lg:col-span-7 xl:col-span-6 space-y-6 text-left">
            {/* RERA Badge */}
            <span className="inline-flex items-center px-3 py-1 rounded-full text-[10px] md:text-xs font-semibold tracking-wider bg-amber-50 text-amber-700 border border-amber-200/80 uppercase">
              ✦ RERA Approved & Legal Title Clear ✦
            </span>

            {/* Main Premium Typography Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-emerald-950 tracking-tight leading-[1.15]">
              Find Your Perfect Sanctuary <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-amber-700 font-serif italic">
                In India's Prime Metros
              </span>
            </h1>

            {/* Subtext description */}
            <p className="text-sm md:text-base text-slate-600 font-sans font-light leading-relaxed max-w-xl">
              Discover curated luxury residences, custom villas, and prime commercial properties across India's high-growth metropolitan regions. Handpicked for exquisite architecture, legal compliance, and connected living.
            </p>

            {/* Search Panel Embedded */}
            <div className="bg-white rounded-xl shadow-xl p-5 md:p-6 border border-slate-200 text-slate-800">
              <form onSubmit={handleSearchSubmit} className="space-y-4">
                
                {/* Buy / Rent Selector */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <div className="flex space-x-1.5 bg-slate-100 p-1 rounded-lg">
                    <button
                      type="button"
                      onClick={() => setPurpose('Buy')}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                        purpose === 'Buy'
                          ? 'bg-emerald-950 text-white shadow'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Buy
                    </button>
                    <button
                      type="button"
                      onClick={() => setPurpose('Rent')}
                      className={`px-4 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
                        purpose === 'Rent'
                          ? 'bg-emerald-950 text-white shadow'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Rent
                    </button>
                  </div>

                  <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
                    {purpose === 'Buy' ? '₹ Lakhs & Crores' : '₹ Thousands'}
                  </div>
                </div>

                {/* Grid inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Select City */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-500" />
                      Metro Region
                    </label>
                    <select
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-850 focus:bg-white"
                    >
                      {AVAILABLE_CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c === 'All' ? 'All Metros' : c}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-[10px] font-semibold tracking-wider text-slate-500 uppercase mb-1.5 flex items-center gap-1">
                      <Landmark className="w-3.5 h-3.5 text-amber-500" />
                      Home Format
                    </label>
                    <select
                      value={propertyType}
                      onChange={(e) => setPropertyType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-850 focus:bg-white"
                    >
                      <option value="All">All Formats</option>
                      <option value="Apartment">Luxury Apartment</option>
                      <option value="Villa">Premium Villa / Row House</option>
                      <option value="Plot">Residential Plot</option>
                      <option value="Commercial">Commercial Workspace</option>
                    </select>
                  </div>
                </div>

                {/* Budget Slider */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between text-[10px] font-semibold tracking-wider text-slate-500 uppercase">
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-amber-500" />
                      Max Budget Limit
                    </span>
                    <span className="text-emerald-950 font-bold font-mono">
                      {purpose === 'Buy'
                        ? maxPrice >= 100
                          ? `₹${(maxPrice / 100).toFixed(2)} Cr`
                          : `₹${maxPrice} Lakhs`
                        : maxPrice >= 100
                          ? `₹${(maxPrice / 100).toFixed(1)} Lakh/mo`
                          : `₹${maxPrice},000/mo`
                      }
                    </span>
                  </div>
                  <div>
                    <input
                      type="range"
                      min={purpose === 'Buy' ? 10 : 5}
                      max={purpose === 'Buy' ? 1000 : 300}
                      step={purpose === 'Buy' ? 10 : 5}
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(Number(e.target.value))}
                      className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-amber-500"
                    />
                    <div className="flex justify-between text-[8px] text-slate-400 font-mono mt-1">
                      <span>{purpose === 'Buy' ? '₹10L' : '₹5k'}</span>
                      <span>{purpose === 'Buy' ? '₹5 Cr' : '₹1.5L'}</span>
                      <span>{purpose === 'Buy' ? '₹10 Cr' : '₹3L'}</span>
                    </div>
                  </div>
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-emerald-950 font-bold py-3 px-5 rounded-lg shadow-md transition-all duration-200 hover:-translate-y-0.5"
                  >
                    <Search className="w-4 h-4 shrink-0" />
                    <span className="tracking-wide text-xs">Explore Curated Listings</span>
                  </button>
                </div>

              </form>
            </div>
          </div>

          {/* Right Column: Premium Warm Image of Indian Family (ordered first on mobile) */}
          <div className="order-1 lg:order-2 lg:col-span-5 xl:col-span-6 relative flex justify-center lg:justify-end">
            <div className="relative max-w-md md:max-w-lg lg:max-w-full w-full">
              {/* Decorative behind image frame */}
              <div className="absolute -inset-2 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-emerald-800/10 to-transparent blur-lg" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 border-b-2 border-l-2 border-amber-500/30 rounded-bl-xl" />
              <div className="absolute -top-4 -right-4 w-24 h-24 border-t-2 border-r-2 border-amber-500/30 rounded-tr-xl" />

              {/* Core Image Container */}
              <div className="relative rounded-2xl overflow-hidden border border-amber-500/20 md:border-2 shadow-2xl bg-emerald-900/10">
                <img
                  src="/src/assets/images/happy_indian_family_new_home_1782440518011.jpg"
                  alt="Happy Indian family in front of their new premium modern villa, golden hour lighting"
                  className="w-full h-[280px] sm:h-[350px] lg:h-[450px] object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  referrerPolicy="no-referrer"
                />
                
                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/70 via-transparent to-transparent" />
                
                {/* Floating Stats / Trust indicators */}
                <div className="absolute bottom-4 left-4 right-4 bg-emerald-950/95 backdrop-blur-sm border border-amber-500/20 rounded-xl p-3 flex items-center justify-between">
                  <div className="text-left">
                    <p className="text-amber-400 font-serif font-bold text-sm md:text-base">100% Verified</p>
                    <p className="text-[9px] text-emerald-200/80 font-medium">Clear Title deeds & physical inspection</p>
                  </div>
                  <div className="h-6 w-[1px] bg-emerald-800" />
                  <div className="text-right">
                    <p className="text-white font-bold font-mono text-sm md:text-base">4.9 ★★★★★</p>
                    <p className="text-[9px] text-emerald-200/80 font-medium">Customer trust index</p>
                  </div>
                </div>
              </div>

              {/* Floating micro-badge */}
              <div className="absolute -top-3 -left-3 bg-gradient-to-r from-amber-500 to-yellow-600 text-emerald-950 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow-lg rotate-[-2deg] tracking-wide uppercase">
                ✦ Trusted by 2,000+ Families
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
