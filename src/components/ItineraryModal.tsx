import React from 'react';
import { TourPackage } from '../types/yatra';
import { X, Clock, MapPin, Check, AlertCircle, ArrowRight, Bed, Utensils, Star, Calendar } from 'lucide-react';

interface ItineraryModalProps {
  tour: TourPackage | null;
  onClose: () => void;
  onBookNow: (tour: TourPackage) => void;
}

export const ItineraryModal: React.FC<ItineraryModalProps> = ({
  tour,
  onClose,
  onBookNow,
}) => {
  if (!tour) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto">
        {/* Modal Top Header with Tour Image Banner */}
        <div className="relative h-60 sm:h-72 w-full bg-slate-900">
          <img
            src={tour.image}
            alt={tour.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src = '/src/assets/images/hero_spiritual_yatra_1793710765055.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Banner Details */}
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center gap-3 text-xs text-amber-300 font-medium mb-1.5">
              <span>{tour.category}</span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{tour.duration}</span>
              </span>
              <span aria-hidden="true">·</span>
              <span className="flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{tour.rating} ({tour.reviewCount} reviews)</span>
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-spiritual font-bold text-white mb-2 leading-tight">
              {tour.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-200 max-w-2xl line-clamp-2">
              {tour.subtitle}
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 sm:p-8 space-y-8">
          {/* Quick Overview Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-xl bg-amber-50/60 border border-amber-200/60 text-slate-800">
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                Starting Points
              </span>
              <span className="text-xs font-medium text-slate-700">
                {tour.startingCities.join(', ')}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                Vehicle Type
              </span>
              <span className="text-xs font-medium text-slate-700">
                {tour.vehicleType}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                Accommodation
              </span>
              <span className="text-xs font-medium text-slate-700">
                {tour.hotelCategory}
              </span>
            </div>
            <div>
              <span className="text-[11px] uppercase tracking-wider text-amber-800 font-semibold block mb-0.5">
                Meals Provided
              </span>
              <span className="text-xs font-medium text-slate-700">
                100% Satvik Pure Veg
              </span>
            </div>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="font-spiritual text-base sm:text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
              <span>Sacred Highlights of the Yatra</span>
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {tour.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                  <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Day by Day Itinerary */}
          <div>
            <h3 className="font-spiritual text-base sm:text-lg font-bold text-slate-900 mb-4">
              Detailed Day-by-Day Sacred Schedule
            </h3>
            <div className="space-y-4">
              {tour.itinerary.map((item) => (
                <div
                  key={item.day}
                  className="p-4 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-lg bg-amber-600 text-white font-bold text-xs flex items-center justify-center shrink-0">
                        D{item.day}
                      </span>
                      <h4 className="text-sm sm:text-base font-semibold text-slate-900">
                        {item.title}
                      </h4>
                    </div>
                    {item.distance && (
                      <span className="text-[11px] font-medium text-slate-500 shrink-0 bg-white px-2 py-0.5 rounded border border-slate-200">
                        {item.distance}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 mb-3 leading-relaxed pl-9">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pl-9 pt-2 border-t border-slate-200/60">
                    <span className="flex items-center gap-1.5">
                      <Bed className="w-3.5 h-3.5 text-amber-600" />
                      <span>Stay: <strong>{item.stay}</strong></span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Utensils className="w-3.5 h-3.5 text-amber-600" />
                      <span>Meals: <strong>{item.meals}</strong></span>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2.5 text-emerald-800 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>What is Included</span>
              </h4>
              <ul className="space-y-2">
                {tour.inclusions.map((inc, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="text-emerald-500 font-bold">✓</span>
                    <span>{inc}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-bold text-slate-900 mb-2.5 text-rose-800 flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>What is Excluded</span>
              </h4>
              <ul className="space-y-2">
                {tour.exclusions.map((exc, i) => (
                  <li key={i} className="text-xs text-slate-600 flex items-start gap-2">
                    <span className="text-rose-400 font-bold">✗</span>
                    <span>{exc}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Modal Footer CTA */}
          <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 sticky bottom-0 bg-white py-3">
            <div>
              <span className="text-xs text-slate-500 block">Total Package Fare per Pilgrim</span>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-slate-900 tabular-nums">
                  ₹{tour.pricePerPerson.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through tabular-nums">
                  ₹{tour.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-semibold text-emerald-600">
                  (Save ₹{(tour.originalPrice - tour.pricePerPerson).toLocaleString('en-IN')})
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="py-2.5 px-4 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer w-1/2 sm:w-auto"
              >
                Back to Tours
              </button>
              <button
                onClick={() => {
                  onClose();
                  onBookNow(tour);
                }}
                className="py-2.5 px-6 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 w-1/2 sm:w-auto"
              >
                <span>Proceed to Book Yatra</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
