import React from 'react';
import { ShieldCheck, UtensilsCrossed, HeartHandshake, Compass, Award, UserCheck, Stethoscope, Sparkles } from 'lucide-react';

export const TrustSection: React.FC = () => {
  const assurances = [
    {
      icon: UtensilsCrossed,
      title: '100% Satvik Pure Veg Dining',
      description: 'Dedicated vegetarian kitchens during the entire tour. Strict Jain (no onion, no garlic, no root vegetables) meals prepared on request without cross-contamination.',
      badge: 'Certified Purity'
    },
    {
      icon: HeartHandshake,
      title: 'Senior Citizen Care & Priority Palki',
      description: 'Pre-arranged Doli/Palki, ponies, and helicopter ticketing for elderly parents. Ground-floor rooms prioritized, and medical oxygen cylinders carried in high altitude vehicles.',
      badge: 'Elders First'
    },
    {
      icon: Compass,
      title: 'Veteran Himalayan & Highway Chauffeurs',
      description: 'Licensed, hill-expert drivers with a minimum of 10 years of Himalayan driving experience. Vehicles inspected daily with GPS tracking and comprehensive passenger insurance.',
      badge: 'Zero-Compromise Safety'
    },
    {
      icon: Sparkles,
      title: 'VIP Darshan Coordination & Vedic Pandits',
      description: 'Avoid exhausting general queues. Our authorized temple priests facilitate scheduled entry, Sankalp rituals, and holy abhishek poojas with reverence and dignity.',
      badge: 'Pre-reserved Passes'
    },
    {
      icon: Award,
      title: 'Sanitized 3-Star & Heritage Lodgings',
      description: 'Personally vetted hotels and comfortable ashrams featuring 24x7 running hot water, clean geysers, heated bedding in cold mountain regions, and hygienic sanitation.',
      badge: 'Inspected Stays'
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Pricing & Fair Cancellation',
      description: 'Clear itemized billing with zero hidden temple charges or surprise tolls. Flexible reschedule policies for unexpected mountain weather conditions or health concerns.',
      badge: 'Honest Hospitality'
    }
  ];

  return (
    <section id="why-mahima" className="py-16 md:py-24 bg-gradient-to-b from-[#FCFAF7] via-amber-50/30 to-[#FCFAF7] border-y border-amber-900/10">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            <span>The Mahima Sacred Promise</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-spiritual font-bold text-slate-900 tracking-tight text-balance mb-4">
            Pilgrimages Conducted with Utmost Reverence & Care
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Spiritual journeys require more than standard logistics; they demand devotion, safety, and deep empathy for every devotee, from youthful seekers to elderly grandmothers.
          </p>
        </div>

        {/* 6-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {assurances.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-md hover:border-amber-300 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-700 flex items-center justify-center">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200/60">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-spiritual text-base sm:text-lg font-bold text-slate-900 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Reassurance Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#0F172A] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-1 text-center md:text-left">
            <div className="text-amber-400 text-xs font-semibold uppercase tracking-wider">
              Specialized Care for Senior Citizens
            </div>
            <h3 className="font-spiritual text-lg sm:text-xl font-bold">
              Planning to take elderly parents on Chardham or Jyotirlinga?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Our pilgrimage consultants will map an unhurried, step-free itinerary, pre-book palkis and medical oxygen, and assign a dedicated tour escort.
            </p>
          </div>

          <a
            href="tel:+919928752158"
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 shadow-md"
          >
            Speak with Senior Care Specialist
          </a>
        </div>
      </div>
    </section>
  );
};
