import React, { useState } from 'react';
import { Calendar, Users, MapPin, Search, ArrowRight, ShieldCheck, HeartHandshake, UtensilsCrossed, Sparkles } from 'lucide-react';

interface HeroProps {
  onExplorePackages: () => void;
  onBookYatra: () => void;
  onCustomYatra: () => void;
  onSearchFilter: (category: string, city: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExplorePackages,
  onBookYatra,
  onCustomYatra,
  onSearchFilter,
}) => {
  const [selectedCircuit, setSelectedCircuit] = useState('All');
  const [selectedBoardingCity, setSelectedBoardingCity] = useState('All');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchFilter(selectedCircuit, selectedBoardingCity);
    onExplorePackages();
  };

  return (
    <section className="relative overflow-hidden bg-[#0A1128] text-white">
      {/* Background Hero Image with measured scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src="/src/assets/images/hero_spiritual_yatra_1793710765055.jpg"
          alt="Majestic Himalayan Shrines of Chardham at sunrise"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-40 scale-105 transform duration-1000 ease-out"
        />
        {/* Gradients for text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1128] via-[#0A1128]/70 to-[#0A1128]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#0A1128]/30 to-[#0A1128]/80" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 pt-16 md:pt-24 pb-12">
        {/* Top Sacred Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/15 border border-amber-400/30 text-amber-300 text-xs font-semibold mb-6 backdrop-blur-sm">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Chardham & Jyotirlinga Yatra Bookings Open for 2026</span>
        </div>

        {/* Hero Title & Value Proposition */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-spiritual font-bold tracking-tight text-white leading-[1.15] text-balance mb-5">
            Experience Divine Journeys with <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-400 to-amber-200">Mahima Tour & Travels</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-200/90 leading-relaxed max-w-2xl font-normal mb-8">
            Sacred pilgrimages across India’s revered sanctums. Curated with 100% Satvik pure vegetarian meals, verified mountain drivers, VIP darshan coordination, and special medical & palki assistance for senior citizens.
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 mb-12">
            <button
              onClick={onBookYatra}
              className="px-6 py-3.5 bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-600 hover:to-amber-800 text-white font-semibold rounded-xl shadow-lg shadow-amber-900/30 transition-all flex items-center gap-2 cursor-pointer text-sm sm:text-base"
            >
              <span>Book Your Yatra Now</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onExplorePackages}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold rounded-xl border border-white/20 backdrop-blur-sm transition-all cursor-pointer text-sm sm:text-base"
            >
              Explore Pilgrimage Packages
            </button>

            <button
              onClick={onCustomYatra}
              className="px-5 py-3.5 text-amber-300 hover:text-amber-200 font-medium underline underline-offset-4 transition-colors cursor-pointer text-sm"
            >
              Plan Private Family Yatra →
            </button>
          </div>
        </div>

        {/* Quick Search / Yatra Finder Box */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/20 text-slate-800">
          <form onSubmit={handleSearchSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Sacred Circuit / Dham
              </label>
              <div className="relative">
                <select
                  value={selectedCircuit}
                  onChange={(e) => setSelectedCircuit(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all cursor-pointer"
                >
                  <option value="All">All Spiritual Yatras</option>
                  <option value="Chardham Yatra">Chardham Yatra (Uttarakhand)</option>
                  <option value="12 Jyotirlinga">12 Jyotirlinga Specials</option>
                  <option value="River Ghats & Shrines">Kashi, Ayodhya & Prayagraj</option>
                  <option value="South India Circuit">South India Temple Circuit</option>
                  <option value="Customized Family">Customized Family Yatras</option>
                </select>
                <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Preferred Boarding Point
              </label>
              <div className="relative">
                <select
                  value={selectedBoardingCity}
                  onChange={(e) => setSelectedBoardingCity(e.target.value)}
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all cursor-pointer"
                >
                  <option value="All">Any Starting Hub</option>
                  <option value="Haridwar">Haridwar / Rishikesh</option>
                  <option value="Delhi">Delhi NCR</option>
                  <option value="Varanasi">Varanasi</option>
                  <option value="Ahmedabad">Ahmedabad / Rajkot</option>
                  <option value="Indore">Indore / Ujjain</option>
                  <option value="Madurai">Madurai / Chennai</option>
                </select>
                <Calendar className="w-4 h-4 text-amber-600 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 mb-1.5 uppercase tracking-wider">
                Yatra Season
              </label>
              <div className="relative">
                <select
                  defaultValue="May-June 2026"
                  className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 font-medium focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all cursor-pointer"
                >
                  <option value="April 2026">April 2026 (Chaitra Navratri)</option>
                  <option value="May-June 2026">May - June 2026 (Peak Opening)</option>
                  <option value="July-August 2026">July - August 2026 (Shravan Month)</option>
                  <option value="September-October 2026">Sept - Oct 2026 (Autumn Clear Skys)</option>
                </select>
                <Users className="w-4 h-4 text-amber-600 absolute left-3 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-semibold rounded-lg shadow transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Search className="w-4 h-4" />
                <span>Search Holy Packages</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* 4-Item Full-Width Reassurance Strip (Section 5 item 13 compliant) */}
      <div className="relative z-10 border-t border-white/10 bg-[#0B1536]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-slate-300">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">18,400+ Blessed Pilgrims</div>
                <div className="text-xs text-slate-400">Guaranteed Darshan Since 2012</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <UtensilsCrossed className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">100% Satvik Pure Veg</div>
                <div className="text-xs text-slate-400">Jain / Onion-Garlic Free Kitchens</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <HeartHandshake className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">Senior Citizen Priority</div>
                <div className="text-xs text-slate-400">Palki, Oxygen & Wheelchair Care</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
              <div>
                <div className="text-sm font-semibold text-white">VIP Darshan & Pandits</div>
                <div className="text-xs text-slate-400">Pre-booked Passes & Vedic Guides</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
