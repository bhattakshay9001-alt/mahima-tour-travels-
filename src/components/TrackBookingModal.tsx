import React, { useState } from 'react';
import { Booking } from '../types/yatra';
import { X, Search, FileText, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TrackBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookings: Booking[];
  onViewTicket: (booking: Booking) => void;
}

export const TrackBookingModal: React.FC<TrackBookingModalProps> = ({
  isOpen,
  onClose,
  bookings,
  onViewTicket,
}) => {
  const [lookupQuery, setLookupQuery] = useState('');
  const [searched, setSearched] = useState(false);
  const [foundBookings, setFoundBookings] = useState<Booking[]>([]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!lookupQuery.trim()) return;

    const q = lookupQuery.trim().toLowerCase();
    const results = bookings.filter(
      (b) =>
        b.id.toLowerCase().includes(q) ||
        b.contactPhone.toLowerCase().includes(q) ||
        b.contactEmail.toLowerCase().includes(q) ||
        b.contactName.toLowerCase().includes(q)
    );
    setFoundBookings(results);
    setSearched(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden my-auto">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="font-spiritual text-base font-bold text-slate-900">
              Track Yatra Reservation / E-Ticket
            </h3>
            <p className="text-xs text-slate-500">
              Enter your Booking ID (e.g. MTT-2026-CH842) or registered phone
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Search Box */}
        <div className="p-5">
          <form onSubmit={handleSearch} className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <input
                type="text"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                placeholder="Booking ID or Mobile Number"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            </div>
            <button
              type="submit"
              className="py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg text-xs transition-colors cursor-pointer"
            >
              Search
            </button>
          </form>

          {/* Quick Demo Hint */}
          <div className="text-[11px] text-slate-500 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60 mb-4 flex items-center justify-between">
            <span>Try sample booking: <strong>MTT-2026-CH842</strong></span>
            <button
              type="button"
              onClick={() => {
                setLookupQuery('MTT-2026-CH842');
                const sample = bookings.filter((b) => b.id === 'MTT-2026-CH842');
                setFoundBookings(sample);
                setSearched(true);
              }}
              className="text-amber-800 font-bold hover:underline cursor-pointer"
            >
              Fill & View
            </button>
          </div>

          {/* Search Results */}
          {searched && (
            <div className="space-y-3 mt-4">
              {foundBookings.length > 0 ? (
                foundBookings.map((b) => (
                  <div
                    key={b.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-amber-50/40 transition-colors"
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="font-mono text-xs font-bold text-slate-900">{b.id}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        b.bookingStatus === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {b.bookingStatus}
                      </span>
                    </div>

                    <h4 className="font-spiritual text-xs sm:text-sm font-bold text-slate-900 mb-1">
                      {b.packageTitle}
                    </h4>

                    <div className="text-[11px] text-slate-500 mb-3 flex flex-wrap gap-x-3 gap-y-1">
                      <span>Traveler: {b.contactName}</span>
                      <span>·</span>
                      <span>Departure: {new Date(b.departureDate).toLocaleDateString('en-IN')}</span>
                      <span>·</span>
                      <span>Pilgrims: {b.passengers.length}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-slate-200">
                      <div className="text-xs">
                        <span className="text-slate-500">Paid: </span>
                        <strong className="text-emerald-700 tabular-nums">₹{b.advancePaid.toLocaleString('en-IN')}</strong>
                        {b.balanceDue > 0 && (
                          <span className="text-slate-400 text-[10px] ml-1">
                            (Due: ₹{b.balanceDue.toLocaleString('en-IN')})
                          </span>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onViewTicket(b);
                        }}
                        className="py-1 px-3 bg-amber-600 hover:bg-amber-700 text-white rounded text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
                      >
                        <FileText className="w-3 h-3" />
                        <span>View E-Ticket</span>
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-slate-500 text-xs">
                  <AlertCircle className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  No reservation found matching "{lookupQuery}". Please check your Booking ID or mobile number.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
