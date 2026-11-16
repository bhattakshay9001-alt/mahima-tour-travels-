import React from 'react';
import { TourPackage } from '../types/yatra';
import { Star, Check, Users, Clock, MapPin, ArrowRight } from 'lucide-react';

interface PackageCardProps {
  tour: TourPackage;
  onSelectPackage: (tour: TourPackage) => void;
  onViewItinerary: (tour: TourPackage) => void;
}

export const PackageCard: React.FC<PackageCardProps> = ({
  tour,
  onSelectPackage,
  onViewItinerary,
}) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Tour Image with fallback */}
      <div className="relative h-56 overflow-hidden bg-slate-900">
        <img
          src={tour.image}
          alt={tour.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            // Styled CSS fallback container as per frontend-design
            (e.currentTarget as HTMLImageElement).src = '/src/assets/images/hero_spiritual_yatra_1793710765055.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

        {/* Clean top category text indicator */}
        <div className="absolute top-3 left-3 text-xs font-semibold text-white bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/20">
          {tour.category}
        </div>

        {/* Available Seats Indicator */}
        <div className="absolute top-3 right-3 text-xs font-medium text-amber-200 bg-amber-950/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-amber-500/30">
          {tour.availableSeats} Seats Left
        </div>

        {/* Bottom overlay: Title & Duration */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <div className="flex items-center gap-2 text-xs text-amber-300 font-medium mb-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{tour.duration}</span>
            <span aria-hidden="true">·</span>
            <span className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-white font-semibold">{tour.rating}</span>
              <span className="text-slate-300">({tour.reviewCount})</span>
            </span>
          </div>
          <h3 className="font-spiritual text-lg font-bold leading-snug line-clamp-1 group-hover:text-amber-200 transition-colors">
            {tour.title}
          </h3>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata row (No pill boxes, clean typographic separators) */}
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
            <span className="flex items-center gap-1 text-slate-700 font-medium">
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              <span>Starts: {tour.startingCities.slice(0, 2).join(', ')}</span>
            </span>
            <span aria-hidden="true">·</span>
            <span>{tour.hotelCategory.split('&')[0]}</span>
          </div>

          <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
            {tour.subtitle}
          </p>

          {/* Key Inclusions Highlights */}
          <div className="space-y-1.5 mb-5 border-t border-slate-100 pt-3">
            {tour.inclusions.slice(0, 3).map((inc, idx) => (
              <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                <Check className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                <span className="line-clamp-1">{inc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing & Actions */}
        <div className="border-t border-slate-100 pt-4 mt-2">
          <div className="flex items-baseline justify-between mb-3.5">
            <div>
              <span className="text-[11px] text-slate-500 block">Per Person (All-Inclusive)</span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-slate-900 tabular-nums">
                  ₹{tour.pricePerPerson.toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-slate-400 line-through tabular-nums">
                  ₹{tour.originalPrice.toLocaleString('en-IN')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-emerald-700 block">
                Save ₹{(tour.originalPrice - tour.pricePerPerson).toLocaleString('en-IN')}
              </span>
              <span className="text-[10px] text-slate-500">25% Token Option</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onViewItinerary(tour)}
              className="py-2.5 px-3 text-xs font-semibold text-slate-700 hover:text-amber-800 bg-slate-100 hover:bg-amber-50 rounded-lg transition-colors border border-slate-200/80 cursor-pointer text-center"
            >
              View Itinerary
            </button>
            <button
              onClick={() => onSelectPackage(tour)}
              className="py-2.5 px-3 text-xs font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Book Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
