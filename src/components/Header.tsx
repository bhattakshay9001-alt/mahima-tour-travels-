import React from 'react';
import { Phone, MessageCircle, ShieldCheck, Compass, LayoutDashboard, UserCheck, Lock } from 'lucide-react';

interface HeaderProps {
  currentView: 'customer' | 'admin';
  onViewChange: (view: 'customer' | 'admin') => void;
  onOpenBooking: () => void;
  onOpenTrackBooking: () => void;
  onOpenCustomYatra: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  onViewChange,
  onOpenBooking,
  onOpenTrackBooking,
  onOpenCustomYatra,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#FCFAF7]/95 backdrop-blur-md border-b border-amber-900/10 transition-colors">
      {/* Top Reassurance & 24x7 Helpline Bar */}
      <div className="bg-[#172554] text-amber-100 text-xs py-2 px-4 md:px-8 border-b border-blue-900/40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-amber-300 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              Govt. Registered Spiritual Tour Operator · Lic #UK-TRV-2024-8842
            </span>
            <span className="hidden sm:inline text-blue-300">·</span>
            <span className="hidden sm:inline text-blue-200">
              100% Satvik Pure Veg Catering
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="tel:+919928752158"
              className="flex items-center gap-1.5 text-slate-200 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold">+91 99287 52158</span>
              <span className="text-[10px] text-amber-300/80">(24x7 Helpline)</span>
            </a>
            <span className="text-blue-300/60">·</span>
            <a
              href="https://wa.me/919928752158?text=Namaste!%20I%20would%20like%20to%20inquire%20about%20spiritual%20yatra%20packages%20with%20Mahima%20Tour%20%26%20Travels."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors font-medium"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Navigation (Strict 3-Zone Contract) */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3.5 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onViewChange('customer');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-slate-900 group"
          >
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-white shadow-sm ring-1 ring-amber-600/30">
              <Compass className="w-5 h-5 text-white transform group-hover:rotate-45 transition-transform duration-300" />
            </div>
            <div className="flex flex-col">
              <span className="font-spiritual text-xl font-bold tracking-tight text-slate-900 group-hover:text-amber-700 transition-colors">
                Mahima Tour & Travels
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-amber-800/80 -mt-0.5">
                Devotional & Pilgrimage Yatras
              </span>
            </div>
          </a>
        </div>

        {/* Zone 2: Concise Nav Links (Single Line, Desktop) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-700">
          <a
            href="#packages"
            className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
          >
            Pilgrimage Packages
          </a>
          <button
            onClick={onOpenCustomYatra}
            className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Custom Family Yatra
          </button>
          <a
            href="#why-mahima"
            className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
          >
            The Sacred Promise
          </a>
          <a
            href="#testimonials"
            className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
          >
            Pilgrim Reviews
          </a>
          <a
            href="#faqs"
            className="hover:text-amber-700 transition-colors whitespace-nowrap shrink-0"
          >
            Yatra FAQs
          </a>
          <button
            onClick={onOpenTrackBooking}
            className="text-amber-800 hover:text-amber-950 font-semibold transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <span>Track Booking / Ticket</span>
          </button>
        </nav>

        {/* Zone 3: Primary Action & Mode Switcher */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Admin Switcher Toggle */}
          <button
            onClick={() => onViewChange(currentView === 'customer' ? 'admin' : 'customer')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all flex items-center gap-1.5 cursor-pointer ${
              currentView === 'admin'
                ? 'bg-blue-900 text-amber-200 border-blue-800 shadow-sm'
                : 'bg-amber-50 text-amber-900 border-amber-200 hover:bg-amber-100'
            }`}
            title="Toggle between Pilgrim View and Admin Portal"
          >
            {currentView === 'admin' ? (
              <>
                <UserCheck className="w-3.5 h-3.5 text-amber-300" />
                <span className="hidden sm:inline">Pilgrim View</span>
              </>
            ) : (
              <>
                <Lock className="w-3.5 h-3.5 text-amber-700" />
                <span className="hidden sm:inline">Admin Portal</span>
              </>
            )}
          </button>

          {/* Primary CTA */}
          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs md:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-sm hover:shadow transition-all whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-1.5"
          >
            <span>Book Your Yatra</span>
          </button>
        </div>
      </div>
    </header>
  );
};
