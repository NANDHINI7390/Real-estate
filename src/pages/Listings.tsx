import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, RefreshCw, Archive } from 'lucide-react';
import { Property, PropertyFilters, SortOption } from '../types';
import FilterSidebar from '../components/FilterSidebar';
import PropertyCard from '../components/PropertyCard';

interface ListingsProps {
  properties: Property[];
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
  onClearFilters: () => void;
  onSelectProperty: (id: string) => void;
}

export default function Listings({
  properties,
  filters,
  onFilterChange,
  onClearFilters,
  onSelectProperty,
}: ListingsProps) {
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Apply filters to properties list
  const filteredProperties = useMemo(() => {
    return properties.filter((prop) => {
      // 1. Filter by Purpose (Buy/Rent)
      if (filters.purpose !== 'All' && prop.purpose !== filters.purpose) {
        return false;
      }

      // 2. Filter by City
      if (filters.city !== 'All' && prop.city !== filters.city) {
        return false;
      }

      // 3. Filter by Type
      if (filters.type !== 'All' && prop.type !== filters.type) {
        return false;
      }

      // 4. Filter by BHK
      if (filters.bhk !== 'All') {
        if (filters.bhk === '4+') {
          if (prop.bhk < 4) return false;
        } else {
          if (prop.bhk !== Number(filters.bhk)) return false;
        }
      }

      // 5. Filter by Price Range Limit (Max Price)
      if (prop.price > filters.maxPrice) {
        return false;
      }

      return true;
    });
  }, [properties, filters]);

  // Apply sorting option
  const sortedProperties = useMemo(() => {
    const list = [...filteredProperties];
    if (sortOption === 'price-asc') {
      return list.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      return list.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'newest') {
      // If we have created_at, sort by date, otherwise default stable id sort
      return list.sort((a, b) => {
        const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
        const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
        return dateB - dateA;
      });
    }
    return list;
  }, [filteredProperties, sortOption]);

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="border-b border-slate-200 pb-6 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="font-serif font-black text-3xl sm:text-4xl text-emerald-950 tracking-tight">
              Premium Property Catalog
            </h1>
            <p className="text-sm text-slate-500 mt-1.5 font-sans">
              Showing <span className="font-bold text-emerald-950">{filteredProperties.length}</span> verified active properties based on your preference.
            </p>
          </div>

          {/* Mobile Filter Button & Sort Controls */}
          <div className="flex items-center gap-3 self-start md:self-auto w-full md:w-auto">
            <button
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
              className="md:hidden flex-1 flex items-center justify-center gap-2 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold py-2.5 px-4 rounded-lg text-sm shadow cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>{mobileFiltersOpen ? 'Hide Filters' : 'Show Filters'}</span>
            </button>

            <div className="flex items-center gap-2 flex-1 md:flex-initial">
              <span className="hidden sm:inline text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1 shrink-0">
                <ArrowUpDown className="w-3.5 h-3.5 text-amber-500" />
                Sort By:
              </span>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="w-full md:w-48 bg-white border border-slate-200 rounded-lg py-2 px-3 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-emerald-950"
              >
                <option value="newest">Latest First</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Content Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-start">
          
          {/* Filters Sidebar Column - hidden on mobile unless toggled */}
          <div className={`md:col-span-1 ${mobileFiltersOpen ? 'block animate-slideDown' : 'hidden md:block'}`}>
            <FilterSidebar
              filters={filters}
              onFilterChange={onFilterChange}
              onClear={onClearFilters}
            />
          </div>

          {/* Properties Grid Column */}
          <div className="md:col-span-3">
            {sortedProperties.length === 0 ? (
              <div className="bg-white rounded-2xl p-16 border border-slate-200 text-center flex flex-col items-center max-w-xl mx-auto shadow-sm">
                <div className="bg-emerald-50 text-emerald-800 p-4 rounded-full mb-5">
                  <Archive className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-lg text-emerald-950">No Listings Match Your Search</h3>
                <p className="text-xs text-slate-500 mt-2 font-sans leading-relaxed max-w-sm">
                  We currently do not have active listings matching those criteria. Try expanding your location or raising your maximum price budget ceiling.
                </p>
                <button
                  onClick={onClearFilters}
                  className="mt-6 bg-emerald-950 hover:bg-emerald-900 text-white font-semibold py-2.5 px-6 rounded-lg text-sm shadow cursor-pointer transition-all"
                >
                  Clear Search Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedProperties.map((prop) => (
                  <PropertyCard
                    key={prop.id}
                    property={prop}
                    onSelect={onSelectProperty}
                  />
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}
