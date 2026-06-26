import React, { useState, useEffect } from 'react';
import { 
  Key, ShieldAlert, Plus, Edit, Trash2, CheckCircle, 
  Eye, Archive, MessageSquare, Phone, User, Calendar, LogOut,
  Sparkles, DollarSign, ListOrdered, Landmark
} from 'lucide-react';
import { Property, Enquiry } from '../types';
import { 
  addProperty, updateProperty, deleteProperty, 
  getEnquiries, deleteEnquiry 
} from '../supabaseClient';
import { ALL_AMENITIES, AVAILABLE_CITIES } from '../data/sampleData';
import { formatIndianPrice } from '../utils/pricing';

interface AdminProps {
  properties: Property[];
  onRefreshProperties: () => void;
}

export default function Admin({ properties, onRefreshProperties }: AdminProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard state
  const [activeTab, setActiveTab] = useState<'properties' | 'enquiries'>('properties');
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loadingEnquiries, setLoadingEnquiries] = useState(false);

  // Property Form state
  const [showForm, setShowForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);

  // Form Fields
  const [formTitle, setFormTitle] = useState('');
  const [formPrice, setFormPrice] = useState<number>(100);
  const [formLocation, setFormLocation] = useState('');
  const [formCity, setFormCity] = useState('Bengaluru');
  const [formBhk, setFormBhk] = useState<number>(3);
  const [formBathrooms, setFormBathrooms] = useState<number>(3);
  const [formSqft, setFormSqft] = useState<number>(1800);
  const [formType, setFormType] = useState<Property['type']>('Apartment');
  const [formPurpose, setFormPurpose] = useState<Property['purpose']>('Buy');
  const [formDescription, setFormDescription] = useState('');
  const [formImagesText, setFormImagesText] = useState(''); // comma-separated image URLs
  const [formAmenities, setFormAmenities] = useState<string[]>([]);
  const [formAgentName, setFormAgentName] = useState('Rajesh Sharma');
  const [formAgentPhone, setFormAgentPhone] = useState('+91 98765 43210');
  const [formFacing, setFormFacing] = useState('East');
  const [formFloor, setFormFloor] = useState('14th of 24 Floors');

  const [formMessage, setFormMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch enquiries if authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchEnquiriesList();
    }
  }, [isAuthenticated]);

  const fetchEnquiriesList = async () => {
    setLoadingEnquiries(true);
    try {
      const data = await getEnquiries();
      setEnquiries(data);
    } catch (e) {
      console.error('Failed to load enquiries:', e);
    } finally {
      setLoadingEnquiries(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid access password. Use "admin123" for demo review.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword('');
  };

  // Open form for adding
  const handleOpenAdd = () => {
    setEditingProperty(null);
    setFormTitle('');
    setFormPrice(120);
    setFormLocation('Whitefield, Bengaluru');
    setFormCity('Bengaluru');
    setFormBhk(3);
    setFormBathrooms(3);
    setFormSqft(1650);
    setFormType('Apartment');
    setFormPurpose('Buy');
    setFormDescription('Fully loaded and verified luxury apartment ready for registration.');
    setFormImagesText('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80\nhttps://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80');
    setFormAmenities(['Parking', 'Lift', 'Gym', 'Security', 'Power Backup']);
    setFormAgentName('Rajesh Sharma');
    setFormAgentPhone('+91 98765 43210');
    setFormFacing('East');
    setFormFloor('8th of 20 Floors');
    setFormMessage(null);
    setShowForm(true);
  };

  // Open form for editing
  const handleOpenEdit = (prop: Property) => {
    setEditingProperty(prop);
    setFormTitle(prop.title);
    setFormPrice(prop.price);
    setFormLocation(prop.location);
    setFormCity(prop.city || 'Bengaluru');
    setFormBhk(prop.bhk);
    setFormBathrooms(prop.bathrooms);
    setFormSqft(prop.sqft);
    setFormType(prop.type);
    setFormPurpose(prop.purpose);
    setFormDescription(prop.description);
    setFormImagesText(prop.images.join('\n'));
    setFormAmenities(prop.amenities);
    setFormAgentName(prop.agent_name);
    setFormAgentPhone(prop.agent_phone);
    setFormFacing(prop.facing || 'East');
    setFormFloor(prop.floor || 'G + 2 Floors');
    setFormMessage(null);
    setShowForm(true);
  };

  const handleAmenityCheck = (amenity: string) => {
    if (formAmenities.includes(amenity)) {
      setFormAmenities(formAmenities.filter(a => a !== amenity));
    } else {
      setFormAmenities([...formAmenities, amenity]);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formLocation.trim() || !formDescription.trim()) {
      setFormMessage({ type: 'error', text: 'Please complete all required fields.' });
      return;
    }

    setIsSubmitting(true);
    setFormMessage(null);

    // split image URLs text area lines
    const imageUrls = formImagesText
      .split('\n')
      .map(url => url.trim())
      .filter(url => url.length > 0);

    // Ensure at least 1 image
    if (imageUrls.length === 0) {
      imageUrls.push('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80');
    }

    const payload = {
      title: formTitle.trim(),
      price: Number(formPrice),
      location: formLocation.trim(),
      city: formCity,
      bhk: Number(formBhk),
      bathrooms: Number(formBathrooms),
      sqft: Number(formSqft),
      type: formType,
      purpose: formPurpose,
      description: formDescription.trim(),
      images: imageUrls,
      amenities: formAmenities,
      agent_name: formAgentName.trim(),
      agent_phone: formAgentPhone.trim(),
      facing: formFacing.trim(),
      floor: formFloor.trim()
    };

    try {
      if (editingProperty) {
        await updateProperty({
          ...payload,
          id: editingProperty.id
        });
        setFormMessage({ type: 'success', text: 'Property updated successfully!' });
      } else {
        await addProperty(payload);
        setFormMessage({ type: 'success', text: 'New property published successfully!' });
      }
      onRefreshProperties();
      
      // Auto close modal on success after 1 second
      setTimeout(() => {
        setShowForm(false);
      }, 1200);

    } catch (err) {
      console.error(err);
      setFormMessage({ type: 'error', text: 'Save operation failed. Review your configuration.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProperty = async (id: string) => {
    if (window.confirm('Are you absolutely sure you want to delete this listing permanently?')) {
      try {
        await deleteProperty(id);
        onRefreshProperties();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  const handleDeleteEnquiry = async (id: string) => {
    if (window.confirm('Remove this client enquiry log?')) {
      try {
        await deleteEnquiry(id);
        fetchEnquiriesList();
      } catch (err) {
        console.error('Delete failed:', err);
      }
    }
  };

  // RENDER LOGIN GATE
  if (!isAuthenticated) {
    return (
      <div className="bg-slate-50 min-h-screen py-24 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
            
            {/* Header Banner */}
            <div className="bg-[#FAFAF8] text-slate-800 p-8 border-b border-slate-200 text-center space-y-2">
              <div className="bg-emerald-950 p-3.5 rounded-2xl inline-flex shadow-inner mb-2">
                <Key className="w-6 h-6 text-amber-500" />
              </div>
              <h2 className="font-serif font-black text-2xl tracking-wide text-emerald-950 uppercase">
                Admin Secure Gate
              </h2>
              <p className="text-xs text-slate-500 font-sans">
                Authenticating access for Mailam Properties sales and property managers.
              </p>
            </div>

            {/* Login Form */}
            <div className="p-8">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-xs font-bold tracking-wider text-slate-500 uppercase mb-2">
                    Security Passkey
                  </label>
                  <input
                    type="password"
                    required
                    placeholder="Enter admin password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-lg p-3 text-sm font-semibold tracking-widest text-slate-800 text-center focus:outline-none focus:ring-2 focus:ring-emerald-950 focus:bg-white"
                  />
                  <span className="block text-[11px] text-slate-400 mt-2 text-center">
                    Demo Passkey Hint: <strong className="font-mono text-emerald-900 bg-emerald-50 px-1.5 py-0.5 rounded">admin123</strong>
                  </span>
                </div>

                {loginError && (
                  <div className="bg-red-50 text-red-900 text-xs p-3 rounded-lg border border-red-100 flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-emerald-950 hover:bg-emerald-900 text-white font-bold py-3 px-4 rounded-xl shadow transition-all tracking-wider text-sm cursor-pointer"
                >
                  Verify Credentials
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    );
  }

  // RENDER MAIN ADMIN DASHBOARD
  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Dashboard Header Banner */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="flex items-center space-x-4">
            <div className="bg-emerald-950 text-amber-400 p-3 rounded-xl hidden sm:block">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold font-mono text-amber-600 tracking-wider uppercase block">
                Administrative Back-Office
              </span>
              <h1 className="font-serif font-black text-2xl text-emerald-950 tracking-tight">
                Control Management Panel
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-emerald-950 font-bold py-2 px-4 rounded-lg text-xs shadow tracking-wide cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Publish Property</span>
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 hover:text-red-600 text-slate-600 font-semibold py-2 px-3 rounded-lg text-xs transition-colors cursor-pointer"
            >
              <LogOut className="w-4 h-4" />
              <span>Log Out</span>
            </button>
          </div>
        </div>

        {/* Analytic Cards Summary Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono block">Published Listings</span>
            <span className="text-2xl font-serif font-black text-emerald-950 block mt-1">{properties.length}</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono block">Pending Enquiries</span>
            <span className="text-2xl font-serif font-black text-emerald-950 block mt-1">{enquiries.length}</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono block">Active Sales Metros</span>
            <span className="text-2xl font-serif font-black text-emerald-950 block mt-1">{AVAILABLE_CITIES.length - 1}</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-xs">
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase font-mono block">DB Connection Mode</span>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-100 px-2 py-0.5 rounded inline-block mt-2">
              Hybrid Live Database
            </span>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="flex border-b border-slate-200 mb-8 gap-6">
          <button
            onClick={() => setActiveTab('properties')}
            className={`pb-4 px-1 text-sm font-bold tracking-wide relative cursor-pointer ${
              activeTab === 'properties' ? 'text-emerald-950' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Manage Listed Properties ({properties.length})
            {activeTab === 'properties' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-950" />}
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-4 px-1 text-sm font-bold tracking-wide relative cursor-pointer ${
              activeTab === 'enquiries' ? 'text-emerald-950' : 'text-slate-400 hover:text-slate-600'
            }`}
          >
            Review Customer Enquiries ({enquiries.length})
            {activeTab === 'enquiries' && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-950" />}
          </button>
        </div>

        {/* Tab content 1: PROPERTIES */}
        {activeTab === 'properties' && (
          <div className="bg-white rounded-xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-slate-400 uppercase tracking-wider font-mono font-bold">
                    <th className="p-4">Property</th>
                    <th className="p-4">City</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">BHK / Area</th>
                    <th className="p-4">Price</th>
                    <th className="p-4 text-center">Controls</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {properties.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-10 text-center text-slate-400">
                        No active properties catalogued. Click "Publish Property" to add.
                      </td>
                    </tr>
                  ) : (
                    properties.map((prop) => (
                      <tr key={prop.id} className="hover:bg-slate-50/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <img
                              src={prop.images[0] || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=80&q=80'}
                              alt=""
                              referrerPolicy="no-referrer"
                              className="w-10 h-10 object-cover rounded-md border"
                            />
                            <div>
                              <span className="font-serif font-bold text-slate-800 text-sm line-clamp-1">{prop.title}</span>
                              <span className="text-[10px] text-slate-400 block mt-0.5 truncate">{prop.location}</span>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 font-semibold text-slate-600">{prop.city}</td>
                        <td className="p-4">
                          <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold uppercase text-[9px] tracking-wide">
                            {prop.type}
                          </span>
                        </td>
                        <td className="p-4 font-mono">
                          {prop.bhk ? `${prop.bhk} BHK` : 'Plot'} / {prop.sqft} sq ft
                        </td>
                        <td className="p-4 font-bold text-emerald-900 font-mono">
                          {formatIndianPrice(prop.price, prop.purpose)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center justify-center space-x-2">
                            <button
                              onClick={() => handleOpenEdit(prop)}
                              className="p-1.5 bg-slate-50 hover:bg-amber-50 hover:text-amber-700 border rounded transition-colors cursor-pointer"
                              title="Edit listing details"
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteProperty(prop.id)}
                              className="p-1.5 bg-slate-50 hover:bg-red-50 hover:text-red-600 border rounded transition-colors cursor-pointer"
                              title="Delete listing"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab content 2: CUSTOMER ENQUIRIES */}
        {activeTab === 'enquiries' && (
          <div className="space-y-4">
            {loadingEnquiries ? (
              <div className="bg-white p-12 text-center border rounded-xl text-slate-400 font-medium">
                Syncing database enquiries records...
              </div>
            ) : enquiries.length === 0 ? (
              <div className="bg-white p-16 text-center border rounded-xl flex flex-col items-center max-w-md mx-auto shadow-xs">
                <div className="bg-slate-50 p-4 rounded-full mb-4">
                  <Archive className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="font-serif font-bold text-emerald-950">No Enquiries Received</h3>
                <p className="text-xs text-slate-400 mt-1 font-sans">
                  Submitted requests from property detail pages will populate here instantly.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {enquiries.map((enq) => (
                  <div key={enq.id} className="bg-white border rounded-xl shadow-xs p-6 space-y-4 relative group">
                    {/* Delete button top right */}
                    <button
                      onClick={() => handleDeleteEnquiry(enq.id!)}
                      className="absolute top-4 right-4 p-1 text-slate-400 hover:text-red-600 bg-slate-50 hover:bg-red-50 rounded transition-colors cursor-pointer"
                      title="Delete log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    {/* Metadata Header */}
                    <div className="border-b border-slate-100 pb-3">
                      <span className="text-[9px] font-bold font-mono text-amber-600 uppercase tracking-wide block">Property of Interest</span>
                      <h4 className="font-serif font-black text-slate-800 text-sm line-clamp-1 mt-0.5">
                        {enq.property_title || `Property ID: ${enq.property_id}`}
                      </h4>
                    </div>

                    {/* Customer Info */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex items-center gap-1.5 text-slate-700 font-medium">
                        <User className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                        <span className="truncate">{enq.name}</span>
                      </div>
                      <a
                        href={`tel:${enq.phone}`}
                        className="flex items-center gap-1.5 text-emerald-900 font-semibold hover:underline"
                      >
                        <Phone className="w-3.5 h-3.5 text-emerald-800 shrink-0" />
                        <span className="truncate">{enq.phone}</span>
                      </a>
                    </div>

                    {/* Message Box */}
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 leading-relaxed font-sans font-light italic">
                      "{enq.message}"
                    </div>

                    {/* Footer log time */}
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mt-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {enq.created_at ? new Date(enq.created_at).toLocaleDateString('en-IN', {
                          day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
                        }) : 'Just now'}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-slate-300">Logged Record</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* MODAL FORM: Add / Edit Property */}
        {showForm && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-2xl border shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-fadeIn text-slate-800">
              
              {/* Modal Header */}
              <div className="bg-[#FAFAF8] text-slate-800 p-6 border-b border-slate-200 sticky top-0 z-10 flex justify-between items-center">
                <div>
                  <h3 className="font-serif font-black text-lg text-emerald-950">
                    {editingProperty ? 'Modify Listing Details' : 'Publish New Luxury Listing'}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 font-sans">
                    All updates sync to both dynamic collection lists and offline local caches.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-slate-100 text-slate-600 hover:text-slate-800 hover:bg-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer border border-slate-200"
                >
                  Close
                </button>
              </div>

              {/* Form Content */}
              <form onSubmit={handleFormSubmit} className="p-6 sm:p-8 space-y-6 text-xs">
                
                {/* Section 1: Core Details */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-sm text-emerald-950 border-b pb-1">1. Basic Parameters</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Property Title *</label>
                      <input
                        type="text"
                        required
                        placeholder="E.g., Prestige Lakeside Duplex Penthouse"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-emerald-950"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Purpose *</label>
                        <select
                          value={formPurpose}
                          onChange={(e) => setFormPurpose(e.target.value as Property['purpose'])}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none"
                        >
                          <option value="Buy">For Buy</option>
                          <option value="Rent">For Rent</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Format *</label>
                        <select
                          value={formType}
                          onChange={(e) => setFormType(e.target.value as Property['type'])}
                          className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none"
                        >
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa / Row House</option>
                          <option value="Plot">Residential Plot</option>
                          <option value="Commercial">Commercial Office</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                        {formPurpose === 'Buy' ? 'Price (in ₹ Lakhs) *' : 'Rent Price (₹ Thousands/mo) *'}
                      </label>
                      <input
                        type="number"
                        required
                        min={1}
                        placeholder={formPurpose === 'Buy' ? '120 (= 1.2 Cr)' : '45 (= 45,000/mo)'}
                        value={formPrice}
                        onChange={(e) => setFormPrice(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-mono font-bold focus:outline-none"
                      />
                      <span className="block text-[10px] text-slate-400 mt-1">
                        Formatted value: <strong>{formatIndianPrice(formPrice, formPurpose)}</strong>
                      </span>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">City Metro *</label>
                      <select
                        value={formCity}
                        onChange={(e) => setFormCity(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none"
                      >
                        {AVAILABLE_CITIES.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Address / Location *</label>
                      <input
                        type="text"
                        required
                        placeholder="Whitefield, Bengaluru"
                        value={formLocation}
                        onChange={(e) => setFormLocation(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 2: Specs */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-sm text-emerald-950 border-b pb-1">2. Specifications & Dimensions</h4>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">BHK Configuration</label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={formBhk}
                        onChange={(e) => setFormBhk(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Bathrooms</label>
                      <input
                        type="number"
                        min={0}
                        max={10}
                        value={formBathrooms}
                        onChange={(e) => setFormBathrooms(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Super Area (Sq.Ft) *</label>
                      <input
                        type="number"
                        required
                        min={100}
                        value={formSqft}
                        onChange={(e) => setFormSqft(Number(e.target.value))}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-mono focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Vastu Facing</label>
                      <input
                        type="text"
                        placeholder="East / North-East"
                        value={formFacing}
                        onChange={(e) => setFormFacing(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-medium focus:outline-none"
                      />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1.5">Floor Level Status</label>
                      <input
                        type="text"
                        placeholder="18th of 24 Floors"
                        value={formFloor}
                        onChange={(e) => setFormFloor(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 3: Text content & Image list */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-sm text-emerald-950 border-b pb-1">3. Details & Media Content</h4>
                  
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Property Description Text *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Write an expansive description highlighting surroundings, water sources, furniture fittings, metro rail distance, legal certifications, etc."
                      value={formDescription}
                      onChange={(e) => setFormDescription(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-light leading-relaxed focus:outline-none resize-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">
                      Property Image URLs (One link per line) *
                    </label>
                    <textarea
                      required
                      rows={3}
                      placeholder="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80&#10;https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80"
                      value={formImagesText}
                      onChange={(e) => setFormImagesText(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2 text-xs font-mono focus:outline-none resize-none"
                    />
                    <span className="block text-[10px] text-slate-400 mt-1">
                      Paste high-quality, publicly accessible real estate picture URLs (e.g., from Unsplash). Add multiple images on separate lines.
                    </span>
                  </div>
                </div>

                {/* Section 4: Amenities Checkbox Grid */}
                <div className="space-y-3">
                  <h4 className="font-serif font-bold text-sm text-emerald-950 border-b pb-1">4. Select Included Amenities</h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {ALL_AMENITIES.map((amenity) => {
                      const isChecked = formAmenities.includes(amenity);
                      return (
                        <label
                          key={amenity}
                          className={`flex items-center space-x-2.5 p-2 rounded-lg border transition-all cursor-pointer ${
                            isChecked 
                              ? 'bg-emerald-50 border-emerald-200/80 text-emerald-900 font-semibold' 
                              : 'bg-white border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={() => handleAmenityCheck(amenity)}
                            className="rounded text-emerald-950 focus:ring-0 cursor-pointer h-3.5 w-3.5"
                          />
                          <span>{amenity}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* Section 5: Agent Parameters */}
                <div className="space-y-4">
                  <h4 className="font-serif font-bold text-sm text-emerald-950 border-b pb-1">5. Contact Agent Advisory</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Representative Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Rajesh Sharma"
                        value={formAgentName}
                        onChange={(e) => setFormAgentName(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1.5">Representative Contact Phone *</label>
                      <input
                        type="text"
                        required
                        placeholder="+91 98765 43210"
                        value={formAgentPhone}
                        onChange={(e) => setFormAgentPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg p-2.5 text-sm font-medium focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Save message response banner */}
                {formMessage && (
                  <div className={`p-4 rounded-xl flex items-center gap-2.5 ${
                    formMessage.type === 'success' 
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                      : 'bg-red-50 text-red-900 border border-red-200'
                  }`}>
                    <CheckCircle className={`w-5 h-5 shrink-0 ${
                      formMessage.type === 'success' ? 'text-emerald-600' : 'text-red-600'
                    }`} />
                    <span className="font-semibold">{formMessage.text}</span>
                  </div>
                )}

                {/* Submit Controls */}
                <div className="pt-4 border-t flex justify-end space-x-3.5 sticky bottom-0 bg-white py-4 z-10">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold px-5 py-2.5 rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-emerald-950 font-black px-6 py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer"
                  >
                    {isSubmitting ? 'Saving changes...' : 'Save & Publish'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
