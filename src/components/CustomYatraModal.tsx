import React, { useState } from 'react';
import { CustomYatraRequest } from '../types/yatra';
import { X, Send, CheckCircle2, Car, Users, Sparkles, Building2 } from 'lucide-react';

interface CustomYatraModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitRequest: (request: CustomYatraRequest) => void;
}

export const CustomYatraModal: React.FC<CustomYatraModalProps> = ({
  isOpen,
  onClose,
  onSubmitRequest,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [destination, setDestination] = useState('Chardham Yatra (Private Family Innova)');
  const [preferredMonth, setPreferredMonth] = useState('May 2026');
  const [travelDurationDays, setTravelDurationDays] = useState(10);
  const [adultCount, setAdultCount] = useState(4);
  const [seniorCount, setSeniorCount] = useState(2);
  const [childCount, setChildCount] = useState(0);
  const [vehicleType, setVehicleType] = useState<'Innova Crysta' | 'Tempo Traveller (12-Seater)' | 'Tempo Traveller (17-Seater)' | 'Luxury Coach' | 'Helicopter Special'>('Innova Crysta');
  const [hotelPreference, setHotelPreference] = useState<'Deluxe (3 Star)' | 'Heritage / Premium' | 'Budget Ashram / Guest House'>('Deluxe (3 Star)');
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [budgetPerPerson, setBudgetPerPerson] = useState('₹25,000 - ₹35,000');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) return;

    const newReq: CustomYatraRequest = {
      id: `CYR-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      fullName,
      phone,
      email: email || 'contact@pilgrim.in',
      destination,
      preferredMonth,
      travelDurationDays,
      adultCount,
      seniorCount,
      childCount,
      vehicleType,
      hotelPreference,
      specialRequirements,
      budgetPerPerson,
      status: 'New',
    };

    onSubmitRequest(newReq);
    setIsSuccess(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-amber-50/70 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-spiritual font-bold flex items-center justify-center text-sm">
              ॐ
            </div>
            <div>
              <h3 className="font-spiritual text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Customized Family & Private Yatra Planner
              </h3>
              <p className="text-xs text-amber-900 font-medium">
                Tailored pilgrimage schedule, dedicated priest, and private sanitized vehicle
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isSuccess ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h4 className="font-spiritual text-xl font-bold text-slate-900">
              Custom Yatra Request Received!
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
              Our Senior Pilgrimage Consultant & Priest will review your family’s requirements and dispatch a detailed customized itinerary quote on WhatsApp / Phone within 2 hours.
            </p>
            <div className="p-3 bg-amber-50 rounded-lg text-xs text-amber-900 font-medium inline-block border border-amber-200">
              For immediate urgency, call our 24x7 desk at <strong>+91 99287 52158</strong>
            </div>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Return to Website
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name of Family Head *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Mahendra Singhania"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  WhatsApp / Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98101 44789"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@domain.com"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Desired Pilgrimage Circuit
                </label>
                <select
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                >
                  <option value="Chardham Yatra (Private Family Innova)">Chardham Yatra (Private Innova / Tempo)</option>
                  <option value="Chardham Helicopter Charter (Same Day / 5 Days)">Chardham Helicopter Charter (VIP)</option>
                  <option value="12 Jyotirlinga (Custom Multi-State Circuit)">12 Jyotirlinga (Multi-State Circuit)</option>
                  <option value="Kashi, Ayodhya, Prayagraj & Gaya Pind Daan">Kashi, Ayodhya, Prayagraj & Gaya</option>
                  <option value="Tamil Nadu & South Divya Desam">South India Temple Circuit</option>
                  <option value="Vaishno Devi & Golden Temple Circuit">Vaishno Devi & Amritsar Circuit</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Preferred Travel Month
                </label>
                <select
                  value={preferredMonth}
                  onChange={(e) => setPreferredMonth(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                >
                  <option value="April 2026">April 2026</option>
                  <option value="May 2026">May 2026</option>
                  <option value="June 2026">June 2026</option>
                  <option value="July 2026">July 2026 (Shravan)</option>
                  <option value="August 2026">August 2026</option>
                  <option value="September 2026">September 2026</option>
                  <option value="October 2026">October 2026</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  min={2}
                  max={25}
                  value={travelDurationDays}
                  onChange={(e) => setTravelDurationDays(parseInt(e.target.value) || 5)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Vehicle Preference
                </label>
                <select
                  value={vehicleType}
                  onChange={(e) => setVehicleType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                >
                  <option value="Innova Crysta">Toyota Innova Crysta (Up to 6 Pax)</option>
                  <option value="Tempo Traveller (12-Seater)">AC Tempo Traveller (12-Seater)</option>
                  <option value="Tempo Traveller (17-Seater)">AC Tempo Traveller (17-Seater)</option>
                  <option value="Luxury Coach">27/35 Seater Luxury Coach</option>
                  <option value="Helicopter Special">VIP Helicopter Charter</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Accommodation Style
                </label>
                <select
                  value={hotelPreference}
                  onChange={(e) => setHotelPreference(e.target.value as any)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none cursor-pointer"
                >
                  <option value="Deluxe (3 Star)">Deluxe 3-Star (Clean, comfortable, hot water)</option>
                  <option value="Heritage / Premium">4-Star Heritage / Luxury Resorts</option>
                  <option value="Budget Ashram / Guest House">Peaceful Temple Ashram / Guest House</option>
                </select>
              </div>
            </div>

            {/* Travelers Composition */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
                Group Size Composition
              </label>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <span className="text-[10px] text-slate-500 block">Adults</span>
                  <input
                    type="number"
                    min={1}
                    value={adultCount}
                    onChange={(e) => setAdultCount(parseInt(e.target.value) || 1)}
                    className="w-full text-center py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-amber-700 font-semibold block">Seniors (60+)</span>
                  <input
                    type="number"
                    min={0}
                    value={seniorCount}
                    onChange={(e) => setSeniorCount(parseInt(e.target.value) || 0)}
                    className="w-full text-center py-1 bg-white border border-amber-300 rounded text-xs font-bold text-amber-900"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-500 block">Children</span>
                  <input
                    type="number"
                    min={0}
                    value={childCount}
                    onChange={(e) => setChildCount(parseInt(e.target.value) || 0)}
                    className="w-full text-center py-1 bg-white border border-slate-200 rounded text-xs font-bold"
                  />
                </div>
              </div>
            </div>

            {/* Special Puja / Needs */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Special Pooja, Rituals or Wheelchair Requirements
              </label>
              <textarea
                rows={2}
                value={specialRequirements}
                onChange={(e) => setSpecialRequirements(e.target.value)}
                placeholder="e.g. Wish to perform Rudrabhishek at Kedarnath, need palki for grandparents, pure Jain food without onion/garlic..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="py-2.5 px-4 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="py-2.5 px-6 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Custom Yatra Request</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
