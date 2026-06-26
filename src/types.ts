export interface Property {
  id: string;
  title: string;
  price: number; // in Lakhs, e.g., 45 = 45 Lakhs, 150 = 1.5 Cr
  location: string;
  city: string; // "Bengaluru", "Mumbai", "Delhi NCR", "Pune"
  bhk: number;
  bathrooms: number;
  sqft: number;
  type: 'Apartment' | 'Villa' | 'Plot' | 'Commercial';
  purpose: 'Buy' | 'Rent';
  description: string;
  images: string[];
  amenities: string[];
  agent_name: string;
  agent_phone: string;
  created_at?: string;
  facing?: string;
  floor?: string;
}

export interface Enquiry {
  id?: string;
  name: string;
  phone: string;
  message: string;
  property_id: string;
  property_title?: string; // helper for admin view
  created_at?: string;
}

export interface PropertyFilters {
  purpose: 'Buy' | 'Rent' | 'All';
  city: string;
  type: string; // 'All' or specific type
  minPrice: number;
  maxPrice: number;
  bhk: string; // 'All', '1', '2', '3', '4+'
}

export type SortOption = 'price-asc' | 'price-desc' | 'newest';

export type PageView = 'home' | 'listings' | 'detail' | 'contact' | 'admin';
