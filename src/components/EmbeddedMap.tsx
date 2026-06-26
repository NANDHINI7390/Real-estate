import React from 'react';
import { MapPin } from 'lucide-react';

interface EmbeddedMapProps {
  location: string;
}

export default function EmbeddedMap({ location }: EmbeddedMapProps) {
  const mapUrl = `https://maps.google.com/maps?q=${encodeURIComponent(
    location
  )}&t=&z=14&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden p-4">
      {/* Map Header */}
      <div className="flex items-center space-x-2 mb-3.5">
        <MapPin className="w-5 h-5 text-amber-500 shrink-0" />
        <h3 className="font-serif font-bold text-base text-emerald-950">
          Geographic Location
        </h3>
        <span className="text-xs text-slate-400 font-sans truncate">
          — {location}
        </span>
      </div>

      {/* Map Content */}
      <div className="relative w-full h-[280px] rounded-lg overflow-hidden bg-slate-100 border border-slate-200/80">
        <iframe
          title="Google Map location pin"
          src={mapUrl}
          width="100%"
          height="100%"
          className="border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
}
