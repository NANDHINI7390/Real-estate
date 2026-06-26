import React, { useState, useEffect } from 'react';
import { PageView, Property, PropertyFilters } from './types';
import { getProperties } from './supabaseClient';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppWidget from './components/WhatsAppWidget';

// Page Views
import Home from './pages/Home';
import Listings from './pages/Listings';
import PropertyDetail from './pages/PropertyDetail';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

const defaultFilters: PropertyFilters = {
  purpose: 'All',
  city: 'All',
  type: 'All',
  minPrice: 0,
  maxPrice: 1000, // 10 Cr or 3 Lakh rent max
  bhk: 'All',
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageView>('home');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<PropertyFilters>(defaultFilters);

  // Load properties on startup
  useEffect(() => {
    loadPropertiesList();
  }, []);

  const loadPropertiesList = async () => {
    setLoading(true);
    try {
      const data = await getProperties();
      setProperties(data);
    } catch (e) {
      console.error('Failed to load properties list:', e);
    } finally {
      setLoading(false);
    }
  };

  // Switch filter values
  const handleFilterChange = (newFilters: PropertyFilters) => {
    setFilters(newFilters);
  };

  // Reset filter values
  const handleClearFilters = () => {
    setFilters(defaultFilters);
  };

  // Trigger search from Home hero panel
  const handleSearchSubmit = (searchFilters: PropertyFilters) => {
    setFilters(searchFilters);
    setSelectedPropertyId(null);
    setCurrentPage('listings');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle viewing specific property detail
  const handleSelectProperty = (id: string | null) => {
    setSelectedPropertyId(id);
    if (id) {
      setCurrentPage('detail');
    } else {
      setCurrentPage('listings');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Resolve active property details object
  const activeProperty = properties.find((p) => p.id === selectedPropertyId);

  // Render active page view
  const renderPage = () => {
    if (loading && properties.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] bg-slate-50">
          <div className="h-10 w-10 border-4 border-emerald-950 border-t-amber-500 rounded-full animate-spin mb-4" />
          <p className="text-slate-500 font-serif font-semibold tracking-wide">Syncing Indian Metropolitan Database...</p>
        </div>
      );
    }

    // Direct detail deep-link routing
    if (currentPage === 'detail' && activeProperty) {
      return (
        <PropertyDetail
          property={activeProperty}
          allProperties={properties}
          onBack={() => handleSelectProperty(null)}
          onSelectProperty={(id) => handleSelectProperty(id)}
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return (
          <Home
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onNavigateToPage={(page) => {
              setCurrentPage(page);
              setSelectedPropertyId(null);
            }}
            onSearchSubmit={handleSearchSubmit}
          />
        );
      case 'listings':
        return (
          <Listings
            properties={properties}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClearFilters={handleClearFilters}
            onSelectProperty={handleSelectProperty}
          />
        );
      case 'contact':
        return <Contact />;
      case 'admin':
        return (
          <Admin
            properties={properties}
            onRefreshProperties={loadPropertiesList}
          />
        );
      default:
        return (
          <Home
            properties={properties}
            onSelectProperty={handleSelectProperty}
            onNavigateToPage={(page) => {
              setCurrentPage(page);
              setSelectedPropertyId(null);
            }}
            onSearchSubmit={handleSearchSubmit}
          />
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 selection:bg-amber-500/30 selection:text-emerald-950">
      {/* Universal Sticky Navbar */}
      <Navbar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        onSelectProperty={setSelectedPropertyId}
      />

      {/* Main Dynamically Switched Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Universal Footer */}
      <Footer
        onPageChange={setCurrentPage}
        onSelectProperty={setSelectedPropertyId}
      />

      {/* Floating WhatsApp Widget */}
      <WhatsAppWidget />
    </div>
  );
}
