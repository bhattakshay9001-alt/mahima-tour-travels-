import React from 'react';
import { TESTIMONIALS } from '../data/mockData';
import { Star, Quote, CheckCircle2, Heart } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-16 md:py-24 max-w-7xl mx-auto px-4 md:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2.5">
          <Heart className="w-3.5 h-3.5 text-amber-600 fill-amber-600" />
          <span>Voices of Blessed Devotees</span>
        </div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-spiritual font-bold text-slate-900 tracking-tight text-balance mb-4">
          Heartfelt Pilgrim Testimonials & Experiences
        </h2>
        <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
          Over 18,400 devotees have journeyed with us across the sacred Himalayas and ancient temple corridors. Here is what they cherish about their yatra.
        </p>
      </div>

      {/* Testimonials 3-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {TESTIMONIALS.map((t) => (
          <div
            key={t.id}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Star Rating & Quote Mark */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <Quote className="w-6 h-6 text-amber-200" />
              </div>

              {/* Comment */}
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-6 italic">
                "{t.comment}"
              </p>
            </div>

            {/* Author Lockup */}
            <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-600 to-amber-800 text-white font-bold text-xs flex items-center justify-center shrink-0">
                {t.avatarText}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {t.name}
                  </span>
                  {t.verified && (
                    <span title="Verified Pilgrim">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 truncate">
                  {t.location} · <span className="text-amber-800 font-medium">{t.tourName}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
