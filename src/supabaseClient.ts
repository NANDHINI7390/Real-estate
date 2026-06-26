import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Property, Enquiry } from './types';
import { SAMPLE_PROPERTIES } from './data/sampleData';

// Safe extraction of keys from import.meta.env
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseAnonKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

export let supabase: SupabaseClient | null = null;

// Initialize Supabase if keys are available
if (supabaseUrl && supabaseAnonKey) {
  try {
    supabase = createClient(supabaseUrl, supabaseAnonKey);
    console.log('Supabase client initialized successfully!');
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
  }
} else {
  console.log('Supabase credentials not configured. Running in high-performance offline mode (localStorage).');
}

// Ensure local storage has sample data
const LOCAL_STORAGE_PROPERTIES_KEY = 'elite_realty_properties';
const LOCAL_STORAGE_ENQUIRIES_KEY = 'elite_realty_enquiries';

function getLocalProperties(): Property[] {
  const data = localStorage.getItem(LOCAL_STORAGE_PROPERTIES_KEY);
  if (!data) {
    localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(SAMPLE_PROPERTIES));
    return SAMPLE_PROPERTIES;
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return SAMPLE_PROPERTIES;
  }
}

function saveLocalProperties(properties: Property[]) {
  localStorage.setItem(LOCAL_STORAGE_PROPERTIES_KEY, JSON.stringify(properties));
}

function getLocalEnquiries(): Enquiry[] {
  const data = localStorage.getItem(LOCAL_STORAGE_ENQUIRIES_KEY);
  if (!data) {
    return [];
  }
  try {
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function saveLocalEnquiries(enquiries: Enquiry[]) {
  localStorage.setItem(LOCAL_STORAGE_ENQUIRIES_KEY, JSON.stringify(enquiries));
}

// DATABASE METHODS WITH TRANSPARENT FALLBACK
export async function getProperties(): Promise<Property[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      if (data && data.length > 0) {
        return data as Property[];
      }
      // If table is empty, seed with sample data for high quality preview
      return getLocalProperties();
    } catch (e) {
      console.warn('Supabase fetch failed, falling back to local database:', e);
      return getLocalProperties();
    }
  } else {
    return getLocalProperties();
  }
}

export async function addProperty(property: Omit<Property, 'id'>): Promise<Property> {
  const newProperty: Property = {
    ...property,
    id: `prop-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .insert([newProperty])
        .select();

      if (error) throw error;
      if (data && data[0]) {
        return data[0] as Property;
      }
    } catch (e) {
      console.error('Supabase insert failed, saving locally:', e);
    }
  }

  // Local Save
  const current = getLocalProperties();
  current.unshift(newProperty);
  saveLocalProperties(current);
  return newProperty;
}

export async function updateProperty(property: Property): Promise<Property> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('properties')
        .update(property)
        .eq('id', property.id)
        .select();

      if (error) throw error;
      if (data && data[0]) {
        return data[0] as Property;
      }
    } catch (e) {
      console.error('Supabase update failed, saving locally:', e);
    }
  }

  // Local Save
  const current = getLocalProperties();
  const index = current.findIndex(p => p.id === property.id);
  if (index !== -1) {
    current[index] = property;
    saveLocalProperties(current);
  }
  return property;
}

export async function deleteProperty(id: string): Promise<boolean> {
  let deletedFromSupabase = false;

  if (supabase) {
    try {
      const { error } = await supabase
        .from('properties')
        .delete()
        .eq('id', id);

      if (error) throw error;
      deletedFromSupabase = true;
    } catch (e) {
      console.error('Supabase delete failed, removing locally:', e);
    }
  }

  // Local Delete
  const current = getLocalProperties();
  const filtered = current.filter(p => p.id !== id);
  saveLocalProperties(filtered);
  return true;
}

export async function getEnquiries(): Promise<Enquiry[]> {
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return (data || []) as Enquiry[];
    } catch (e) {
      console.warn('Supabase fetch enquiries failed, falling back to local:', e);
      return getLocalEnquiries();
    }
  } else {
    return getLocalEnquiries();
  }
}

export async function addEnquiry(enquiry: Omit<Enquiry, 'id' | 'created_at'>): Promise<Enquiry> {
  const newEnquiry: Enquiry = {
    ...enquiry,
    id: `enq-${Date.now()}`,
    created_at: new Date().toISOString(),
  };

  if (supabase) {
    try {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([newEnquiry])
        .select();

      if (error) throw error;
      if (data && data[0]) {
        return data[0] as Enquiry;
      }
    } catch (e) {
      console.error('Supabase insert enquiry failed, saving locally:', e);
    }
  }

  // Local Save
  const current = getLocalEnquiries();
  current.unshift(newEnquiry);
  saveLocalEnquiries(current);
  return newEnquiry;
}

export async function deleteEnquiry(id: string): Promise<boolean> {
  if (supabase) {
    try {
      const { error } = await supabase
        .from('enquiries')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (e) {
      console.error('Supabase delete enquiry failed, removing locally:', e);
    }
  }

  const current = getLocalEnquiries();
  const filtered = current.filter(e => e.id !== id);
  saveLocalEnquiries(filtered);
  return true;
}
