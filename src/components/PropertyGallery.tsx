import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PropertyGalleryProps {
  images: string[];
}

export default function PropertyGallery({ images }: PropertyGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // If no images provided, use a high quality real estate fallback
  const list = images && images.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80'];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? list.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === list.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="space-y-3">
      {/* Active Main Viewport */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-900 border border-slate-200 shadow-sm group">
        <img
          src={list[currentIndex]}
          alt={`Property Image ${currentIndex + 1}`}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover transition-all duration-300"
        />

        {/* Carousel Overlay Nav (Arrows) - visible on hover or mobile always */}
        {list.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-950 p-2 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-emerald-950 p-2 rounded-full shadow-md hover:scale-105 transition-all cursor-pointer"
              aria-label="Next image"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Page Slide Count Badge */}
        <div className="absolute bottom-4 right-4 bg-emerald-950/80 backdrop-blur-xs text-white text-xs font-mono px-3 py-1.5 rounded-full font-medium">
          {currentIndex + 1} / {list.length}
        </div>
      </div>

      {/* Clickable Multi-Thumbnails Selector Row */}
      {list.length > 1 && (
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {list.map((imgUrl, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative aspect-[4/3] rounded-lg overflow-hidden border-2 bg-slate-100 transition-all ${
                currentIndex === idx 
                  ? 'border-amber-500 ring-2 ring-amber-500/10 scale-[0.98]' 
                  : 'border-transparent hover:border-slate-300'
              }`}
            >
              <img
                src={imgUrl}
                alt={`Thumbnail image ${idx + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
