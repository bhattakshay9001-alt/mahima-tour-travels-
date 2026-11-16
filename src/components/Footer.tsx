import React from 'react';
import { Compass, Phone, Mail, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenCustomYatra: () => void;
  onOpenTrackBooking: () => void;
  onOpenTerms: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBooking,
  onOpenCustomYatra,
  onOpenTrackBooking,
  onOpenTerms,
}) => {
  return (
    <footer className="bg-[#0A1128] text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1 & 2: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-amber-600 flex items-center justify-center text-white font-spiritual font-bold text-lg shadow-md">
                ॐ
              </div>
              <div>
                <span className="font-spiritual text-xl font-bold tracking-tight text-white block">
                  Mahima Tour & Travels
                </span>
                <span className="text-xs uppercase tracking-wider text-amber-400 font-semibold block">
                  Devotional & Pilgrimage Yatras
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Serving devotees of Sanatana Dharma with pure reverence, 100% Satvik kitchens, reliable hill drivers, and dedicated personal assistance for elderly parents across Chardham, Jyotirlingas, and holy river ghats.
            </p>

            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <div className="flex items-center gap-2 text-amber-300 font-medium">
                <ShieldCheck className="w-4 h-4 text-amber-400" />
                <span>Uttarakhand Tourism Dept. Reg: #UK-TRV-2024-8842</span>
              </div>
              <div className="text-[11px] text-slate-500">
                GSTIN: 05AAECM9124L1Z2 · Member of IATO (Indian Association of Tour Operators)
              </div>
            </div>
          </div>

          {/* Col 3: Pilgrimage Circuits */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Sacred Yatras
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  Chardham Deluxe Yatra (12D)
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  Kedarnath & Badrinath Do Dham
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  Kashi Vishwanath & Ayodhya Ram Mandir
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  12 Jyotirlinga Darshan Tours
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  Somnath & Dwarkadhish Circuit
                </a>
              </li>
              <li>
                <a href="#packages" className="hover:text-amber-300 transition-colors">
                  Rameshwaram & South Divya Desams
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Pilgrim Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button onClick={onOpenBooking} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Online Booking System
                </button>
              </li>
              <li>
                <button onClick={onOpenCustomYatra} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Custom Family Yatra Planner
                </button>
              </li>
              <li>
                <button onClick={onOpenTrackBooking} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Download E-Ticket / Track Yatra
                </button>
              </li>
              <li>
                <a href="#why-mahima" className="hover:text-amber-300 transition-colors">
                  The Mahima Sacred Promise
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-amber-300 transition-colors">
                  Mandatory Biometric Rules 2026
                </a>
              </li>
              <li>
                <button onClick={onOpenTerms} className="hover:text-amber-300 transition-colors cursor-pointer text-left">
                  Cancellation & Refund Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Head & Regional Offices */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
              Registered Offices
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Head Office (Haridwar)</strong>
                  <span>Plot 14, Upper Road, Near Har Ki Pauri, Haridwar, Uttarakhand - 249401</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Delhi Hub Office</strong>
                  <span>204, Antriksh Bhawan, KG Marg, Connaught Place, New Delhi - 110001</span>
                </div>
              </div>

              <div className="pt-1 space-y-1">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <a href="tel:+919928752158" className="text-slate-200 hover:text-amber-300">
                    +91 99287 52158
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-amber-400" />
                  <a href="mailto:yatra@mahimatravels.in" className="text-slate-200 hover:text-amber-300">
                    yatra@mahimatravels.in
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sacred Sanskrit Shloka Blessing */}
        <div className="py-6 border-y border-slate-800 text-center text-xs text-amber-300/90 font-spiritual tracking-wide">
          ॐ सर्वे भवन्तु सुखिनः सर्वे सन्तु निरामयाः । सर्वे भद्राणि पश्यन्तु मा कश्चिद्दुःखभाग्भवेत् ॥
          <span className="block text-[11px] text-slate-400 font-sans mt-1">
            "May all beings be happy, may all beings be free from illness, may all see what is auspicious."
          </span>
        </div>

        {/* Bottom Copyright & Legal Links */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Mahima Tour & Travels Pvt. Ltd. All Sacred Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-xs">
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer">
              Terms & Conditions
            </button>
            <span>·</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <span>·</span>
            <button onClick={onOpenTerms} className="hover:text-slate-300 transition-colors cursor-pointer">
              Refund & Cancellation
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
