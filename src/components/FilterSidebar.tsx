import React from 'react';
import { Filter, X, RefreshCw, IndianRupee, MapPin, Landmark, BedDouble } from 'lucide-react';
import { PropertyFilters } from '../types';
import { AVAILABLE_CITIES } from '../data/sampleData';

interface FilterSidebarProps {
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
  onClear: () => void;
}

export default function FilterSidebar({ filters, onFilterChange, onClear }: FilterSidebarProps) {
  const handleSelectChange = (key: keyof PropertyFilters, value: any) => {
    onFilterChange({
      ...filters,
      [key]: value
    });
  };

  // Switch budget range labels dynamically based on Buy/Rent purpose
  const getPriceLabel = (val: number) => {
    if (filters.purpose === 'Rent') {
      return val >= 100 ? `₹${(val / 100).toFixed(1)} Lakh` : `₹${val}k`;
    } else {
      return val >= 100 ? `₹${(val / 100).toFixed(2)} Cr` : `₹${val} Lakhs`;
    }
  };

  const getPriceRangeLimits = () => {
    if (filters.purpose === 'Rent') {
      return { min: 5, max: 300, step: 5 };
    } else {
      return { min: 10, max: 1000, step: 10 };
    }
  };

  const limits = getPriceRangeLimits();

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-sm space-y-6">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-emerald-950" />
          <h2 className="font-serif font-bold text-lg text-emerald-950">Filter Properties</h2>
        </div>
        <button
          onClick={onClear}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-900 bg-slate-50 hover:bg-emerald-50 px-2.5 py-1.5 rounded transition-all cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Reset All</span>
        </button>
      </div>

      {/* Filter 1: Purpose (Buy vs Rent) */}
      <div className="space-y-2">
        <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase">
          Transaction Type
        </label>
        <div className="grid grid-cols-3 gap-1.5 bg-slate-100 p-1 rounded-lg">
          {(['All', 'Buy', 'Rent'] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => handleSelectChange('purpose', type)}
              className={`py-1.5 rounded-md text-xs font-semibold text-center tracking-wide transition-all ${
                filters.purpose === type
                  ? 'bg-emerald-950 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Filter 2: Metro Location */}
      <div className="space-y-2">
        <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
          <MapPin className="w-3.5 h-3.5 text-amber-500" />
          Metro City
        </label>
        <select
          value={filters.city}
          onChange={(e) => handleSelectChange('city', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950"
        >
          {AVAILABLE_CITIES.map((city) => (
            <option key={city} value={city}>
              {city === 'All' ? 'All Metros' : city}
            </option>
          ))}
        </select>
      </div>

      {/* Filter 3: Property Format */}
      <div className="space-y-2">
        <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
          <Landmark className="w-3.5 h-3.5 text-amber-500" />
          Format Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => handleSelectChange('type', e.target.value)}
          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-950"
        >
          <option value="All">All Formats</option>
          <option value="Apartment">Apartment</option>
          <option value="Villa">Villa / Row House</option>
          <option value="Plot">Residential Plot</option>
          <option value="Commercial">Commercial Office</option>
        </select>
      </div>

      {/* Filter 4: BHK Specification */}
      <div className="space-y-2">
        <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
          <BedDouble className="w-3.5 h-3.5 text-amber-500" />
          BHK Configuration
        </label>
        <div className="grid grid-cols-5 gap-1">
          {['All', '1', '2', '3', '4+'].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => handleSelectChange('bhk', val)}
              className={`py-1.5 rounded-md text-xs font-bold text-center tracking-tight transition-all border ${
                filters.bhk === val
                  ? 'bg-emerald-950 border-emerald-950 text-white shadow-sm'
                  : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {val === 'All' ? 'All' : val}
            </button>
          ))}
        </div>
      </div>

      {/* Filter 5: Budget range (Max Price) */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase flex items-center gap-1">
            <IndianRupee className="w-3.5 h-3.5 text-amber-500" />
            Max Price Limit
          </label>
          <span className="text-xs font-bold font-mono text-emerald-950">
            {getPriceLabel(filters.maxPrice)}
          </span>
        </div>
        <div className="pt-2 px-1">
          <input
            type="range"
            min={limits.min}
            max={limits.max}
            step={limits.step}
            value={filters.maxPrice}
            onChange={(e) => handleSelectChange('maxPrice', Number(e.target.value))}
            className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-emerald-900"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono mt-1.5">
            <span>{getPriceLabel(limits.min)}</span>
            <span>{getPriceLabel(limits.max)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
