import React from 'react';
import { BedDouble, Bath, Square, MapPin, Tag } from 'lucide-react';
import { Property } from '../types';
import { formatIndianPrice } from '../utils/pricing';

interface PropertyCardProps {
  property: Property;
  onSelect: (id: string) => void;
  key?: string | number;
}

export default function PropertyCard({ property, onSelect }: PropertyCardProps) {
  // Use the first image or a beautiful high-res real estate fallback
  const displayImage = property.images && property.images.length > 0 
    ? property.images[0] 
    : 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80';

  return (
    <div className="bg-white rounded-xl shadow-md border border-slate-100 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      
      {/* Property Thumbnail */}
      <div className="relative h-56 w-full overflow-hidden shrink-0 bg-slate-100">
        <img
          src={displayImage}
          alt={property.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Purpose Badge (Buy/Rent) */}
        <div className="absolute top-4 left-4 bg-emerald-950 text-white font-mono text-xs tracking-wider uppercase font-semibold px-3 py-1 rounded shadow-md border border-amber-500/30">
          For {property.purpose}
        </div>

        {/* Property Type Badge */}
        <div className="absolute top-4 right-4 bg-amber-500 text-emerald-950 font-semibold text-[10px] tracking-widest uppercase px-2.5 py-1 rounded shadow-md">
          {property.type}
        </div>
      </div>

      {/* Property Content */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Price & Location */}
        <div className="mb-2">
          <span className="text-xl sm:text-2xl font-serif font-black text-emerald-900 tracking-tight">
            {formatIndianPrice(property.price, property.purpose)}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-slate-800 font-serif font-semibold text-base mb-2 group-hover:text-emerald-800 transition-colors line-clamp-1">
          {property.title}
        </h3>

        {/* Location Address */}
        <div className="flex items-center space-x-1.5 text-xs text-slate-500 mb-4 font-sans">
          <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
          <span className="truncate">{property.location}</span>
        </div>

        {/* Key Metrics / Specs */}
        <div className="grid grid-cols-3 gap-2 py-3 px-2 border-t border-b border-slate-50 text-slate-600 text-xs font-medium font-sans mb-5 bg-slate-50/50 rounded-lg shrink-0">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-slate-800 mb-0.5">
              <BedDouble className="w-3.5 h-3.5 text-emerald-800" />
              <span className="font-bold">{property.bhk || '--'}</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase">BHK</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center border-l border-r border-slate-200/60">
            <div className="flex items-center gap-1 text-slate-800 mb-0.5">
              <Bath className="w-3.5 h-3.5 text-emerald-800" />
              <span className="font-bold">{property.bathrooms || '--'}</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase">Baths</span>
          </div>

          <div className="flex flex-col items-center justify-center text-center">
            <div className="flex items-center gap-1 text-slate-800 mb-0.5">
              <Square className="w-3.5 h-3.5 text-emerald-800" />
              <span className="font-bold font-mono text-[11px]">{property.sqft || '--'}</span>
            </div>
            <span className="text-[10px] text-slate-400 uppercase">Sq.Ft</span>
          </div>
        </div>

        {/* View Details CTA */}
        <div className="mt-auto">
          <button
            onClick={() => onSelect(property.id)}
            className="w-full text-center bg-slate-50 border border-emerald-950/10 hover:bg-emerald-950 hover:text-white hover:border-emerald-950 text-emerald-950 font-semibold py-2.5 rounded-lg text-sm transition-all duration-150 cursor-pointer"
          >
            View Full Details
          </button>
        </div>
      </div>
    </div>
  );
}
