import React, { useEffect } from 'react';
import { 
  ArrowLeft, BedDouble, Bath, Square, Compass, Layers, 
  Car, ChevronsUpDown, Dumbbell, Shield, Zap, Droplets, 
  Home, Trees, Wind, Coffee, User, Check, MessageSquare, PhoneCall 
} from 'lucide-react';
import { Property } from '../types';
import PropertyGallery from '../components/PropertyGallery';
import EmbeddedMap from '../components/EmbeddedMap';
import EnquiryForm from '../components/EnquiryForm';
import PropertyCard from '../components/PropertyCard';
import { formatIndianPrice } from '../utils/pricing';

interface PropertyDetailProps {
  property: Property;
  allProperties: Property[];
  onBack: () => void;
  onSelectProperty: (id: string) => void;
}

// Map amenity names to beautiful Lucide icons
function getAmenityIcon(name: string) {
  const norm = name.toLowerCase().trim();
  if (norm.includes('parking') || norm.includes('car')) return Car;
  if (norm.includes('lift') || norm.includes('elevator')) return ChevronsUpDown;
  if (norm.includes('gym') || norm.includes('fitness')) return Dumbbell;
  if (norm.includes('security') || norm.includes('cctv')) return Shield;
  if (norm.includes('power') || norm.includes('backup') || norm.includes('generator')) return Zap;
  if (norm.includes('pool') || norm.includes('swimming')) return Droplets; // Waves not in base sometimes, Droplets is safe
  if (norm.includes('clubhouse') || norm.includes('club')) return Home;
  if (norm.includes('garden') || norm.includes('park') || norm.includes('green')) return Trees;
  if (norm.includes('ac') || norm.includes('air') || norm.includes('conditioning')) return Wind;
  if (norm.includes('cafe') || norm.includes('cafeteria') || norm.includes('food')) return Coffee;
  if (norm.includes('servant') || norm.includes('helper')) return User;
  return Check;
}

export default function PropertyDetail({ property, allProperties, onBack, onSelectProperty }: PropertyDetailProps) {
  // Scroll to top when property details mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [property.id]);

  // Find similar properties (same city or same type, excluding current property)
  const similarProperties = allProperties
    .filter((p) => p.id !== property.id && (p.city === property.city || p.type === property.type))
    .slice(0, 3);

  // Setup custom WhatsApp message for Agent
  const agentWhatsappNumber = property.agent_phone.replace(/[^0-9]/g, '');
  const agentWhatsappText = encodeURIComponent(
    `Hello ${property.agent_name}, I am highly interested in your listing: "${property.title}" (${property.location}). Please share availability for a site visit.`
  );
  const agentWhatsappUrl = `https://wa.me/${agentWhatsappNumber}?text=${agentWhatsappText}`;

  return (
    <div className="bg-slate-50 min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-emerald-950 mb-8 cursor-pointer transition-colors bg-white px-4 py-2 rounded-lg shadow-xs border border-slate-200"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Search Listings</span>
        </button>

        {/* Detail Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start mb-16">
          
          {/* LEFT 2-COLUMNS: Gallery & Description Details */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Image Gallery */}
            <PropertyGallery images={property.images} />

            {/* Core Header info */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <span className="inline-flex items-center px-3 py-1 rounded bg-amber-500 text-emerald-950 text-xs font-bold uppercase tracking-wider">
                  For {property.purpose} — {property.type}
                </span>
                <span className="text-sm font-mono text-slate-400 font-semibold">
                  Property ID: {property.id}
                </span>
              </div>

              <h1 className="font-serif font-black text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                {property.title}
              </h1>

              <div className="flex items-center gap-1 text-sm font-medium text-slate-500">
                <span className="text-slate-900 font-semibold">{property.location}</span>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-baseline gap-1">
                <span className="text-3xl sm:text-4xl font-serif font-black text-emerald-900">
                  {formatIndianPrice(property.price, property.purpose)}
                </span>
              </div>
            </div>

            {/* Specification Grid */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-serif font-bold text-base text-emerald-950 mb-5 border-b border-slate-100 pb-3">
                Key Parameters
              </h3>
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                
                {/* Specs 1: BHK */}
                <div className="bg-slate-50 p-3.5 rounded-lg text-center flex flex-col justify-center border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-emerald-950 font-black text-base mb-1">
                    <BedDouble className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{property.bhk || 'N/A'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">BHK Conf</span>
                </div>

                {/* Specs 2: Baths */}
                <div className="bg-slate-50 p-3.5 rounded-lg text-center flex flex-col justify-center border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-emerald-950 font-black text-base mb-1">
                    <Bath className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{property.bathrooms || 'N/A'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Bathrooms</span>
                </div>

                {/* Specs 3: Super Area */}
                <div className="bg-slate-50 p-3.5 rounded-lg text-center flex flex-col justify-center border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-emerald-950 font-mono font-bold text-base mb-1">
                    <Square className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>{property.sqft || 'N/A'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Sq. Ft Area</span>
                </div>

                {/* Specs 4: Facing */}
                <div className="bg-slate-50 p-3.5 rounded-lg text-center flex flex-col justify-center border border-slate-100">
                  <div className="flex items-center justify-center gap-1 text-emerald-950 font-black text-base mb-1">
                    <Compass className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">{property.facing || 'East'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Vastu Facing</span>
                </div>

                {/* Specs 5: Floor */}
                <div className="bg-slate-50 p-3.5 rounded-lg text-center flex flex-col justify-center border border-slate-100 col-span-2 sm:col-span-1">
                  <div className="flex items-center justify-center gap-1 text-emerald-950 font-black text-xs mb-1">
                    <Layers className="w-4 h-4 text-amber-500 shrink-0" />
                    <span className="truncate">{property.floor ? property.floor.split(' ')[0] : 'G+2'}</span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Floor Level</span>
                </div>

              </div>
            </div>

            {/* Description Text */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-4">
              <h3 className="font-serif font-bold text-base text-emerald-950 border-b border-slate-100 pb-3">
                Property Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed font-sans whitespace-pre-line font-light">
                {property.description}
              </p>
            </div>

            {/* Amenities Grid List */}
            {property.amenities && property.amenities.length > 0 && (
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-8">
                <h3 className="font-serif font-bold text-base text-emerald-950 border-b border-slate-100 pb-3 mb-6">
                  Premium Amenities
                </h3>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
                  {property.amenities.map((item, idx) => {
                    const Icon = getAmenityIcon(item);
                    return (
                      <div key={idx} className="flex items-center space-x-3 text-slate-700">
                        <div className="bg-emerald-50 text-emerald-800 p-2.5 rounded-lg border border-emerald-100 shrink-0">
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-xs font-semibold font-sans">{item}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Google Maps Location */}
            <EmbeddedMap location={property.location} />

          </div>

          {/* RIGHT COLUMN: Agent Details & Inquiries Form */}
          <div className="space-y-6">
            
            {/* Agent Contact Card */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-md p-6 space-y-5">
              <div className="flex items-center space-x-4">
                {/* Agent Avatar Placeholder */}
                <div className="w-16 h-16 rounded-full bg-emerald-950 text-amber-400 border border-amber-500/20 flex items-center justify-center shadow font-serif text-xl font-bold shrink-0">
                  {property.agent_name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <span className="text-[10px] font-bold font-mono tracking-wider text-amber-600 uppercase block">
                    Assigned Agent Advisor
                  </span>
                  <h4 className="font-serif font-bold text-lg text-emerald-950">
                    {property.agent_name}
                  </h4>
                  <span className="text-xs text-slate-400 font-sans block mt-0.5">
                    Elite Relationship Executive
                  </span>
                </div>
              </div>

              <div className="space-y-2.5 pt-2 border-t border-slate-100">
                <a
                  href={`tel:${property.agent_phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-slate-50 border border-emerald-950/10 hover:bg-slate-100 text-slate-800 font-semibold py-2.5 rounded-lg text-sm transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4 text-emerald-800" />
                  <span>Call: {property.agent_phone}</span>
                </a>

                <a
                  href={agentWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-2.5 rounded-lg text-sm shadow transition-all cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4 fill-white" />
                  <span>Message on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Enquiry Form Panel */}
            <EnquiryForm propertyId={property.id} propertyTitle={property.title} />

          </div>

        </div>

        {/* Similar Properties Recommendation Panel */}
        {similarProperties.length > 0 && (
          <section className="border-t border-slate-200 pt-16 mb-8">
            <div className="mb-10 text-center sm:text-left">
              <span className="text-xs font-bold font-mono text-amber-600 tracking-wider uppercase block mb-1">
                ✦ Matching Recommendations ✦
              </span>
              <h2 className="font-serif font-black text-2xl sm:text-3xl text-emerald-950 tracking-tight">
                Similar Listings You May Like
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {similarProperties.map((prop) => (
                <PropertyCard
                  key={prop.id}
                  property={prop}
                  onSelect={onSelectProperty}
                />
              ))}
            </div>
          </section>
        )}

      </div>
    </div>
  );
}
