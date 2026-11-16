import React from 'react';
import { Booking } from '../types/yatra';
import { X, Printer, Share2, CheckCircle2, ShieldCheck, Phone, MapPin, Calendar, Clock, AlertTriangle, Download } from 'lucide-react';

interface ETicketModalProps {
  booking: Booking | null;
  onClose: () => void;
}

export const ETicketModal: React.FC<ETicketModalProps> = ({
  booking,
  onClose,
}) => {
  if (!booking) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `*Mahima Tour & Travels - Sacred Pilgrimage E-Ticket*\n` +
      `Booking Ref: ${booking.id}\n` +
      `Tour: ${booking.packageTitle}\n` +
      `Departure: ${booking.departureDate}\n` +
      `Boarding Hub: ${booking.boardingPoint}\n` +
      `Pilgrims: ${booking.passengers.length}\n` +
      `Payment Status: ${booking.paymentStatus}\n` +
      `Guide: ${booking.assignedGuide || 'Pandit Someshwar Joshi'}\n` +
      `Helpline: +91 99287 52158\n\n` +
      `Har Har Mahadev! Have a blessed pilgrimage.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[95vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto flex flex-col">
        {/* Action Bar (Not printed) */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between no-print sticky top-0 z-10">
          <div className="flex items-center gap-2 text-emerald-700">
            <CheckCircle2 className="w-5 h-5" />
            <span className="text-xs sm:text-sm font-bold">Booking Confirmed & E-Ticket Issued</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleShareWhatsApp}
              className="p-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer"
              title="Share on WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </button>
            <button
              onClick={handlePrint}
              className="p-2 text-xs font-semibold text-slate-800 bg-white hover:bg-slate-100 rounded-lg border border-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm"
              title="Print or Save as PDF"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* PRINTABLE E-TICKET CONTAINER */}
        <div id="printable-ticket" className="p-6 sm:p-8 space-y-6 bg-white text-slate-800">
          {/* Ticket Header */}
          <div className="border-b-2 border-amber-600/30 pb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white font-spiritual font-bold text-xl flex items-center justify-center shadow-md">
                ॐ
              </div>
              <div>
                <h1 className="font-spiritual text-xl font-bold text-slate-900 tracking-tight">
                  Mahima Tour & Travels
                </h1>
                <div className="text-xs text-amber-800 font-medium">
                  Official Pilgrimage & Devotional Yatra Pass
                </div>
                <div className="text-[10px] text-slate-500">
                  Govt. Registration #UK-TRV-2024-8842 · GSTIN: 05AAECM9124L1Z2
                </div>
              </div>
            </div>

            <div className="text-left sm:text-right bg-amber-50/80 p-2.5 rounded-lg border border-amber-200/80">
              <span className="text-[10px] uppercase font-bold text-amber-800 block">
                Booking Reference ID
              </span>
              <span className="font-mono text-base font-bold text-slate-900 tracking-wider">
                {booking.id}
              </span>
              <div className="text-[10px] text-slate-500">
                Booked on: {new Date(booking.createdAt).toLocaleDateString('en-IN')}
              </div>
            </div>
          </div>

          {/* Tour Title and Status Bar */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-slate-900 to-blue-950 text-white">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider">
                {booking.packageCategory}
              </span>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                booking.paymentStatus === 'Paid'
                  ? 'bg-emerald-500 text-white'
                  : 'bg-amber-400 text-slate-900'
              }`}>
                {booking.paymentStatus}
              </span>
            </div>
            <h2 className="font-spiritual text-lg sm:text-xl font-bold mb-2">
              {booking.packageTitle}
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs text-slate-200 pt-2 border-t border-white/10">
              <div>
                <span className="text-slate-400 text-[10px] block">Departure Date:</span>
                <span className="font-semibold text-white">
                  {new Date(booking.departureDate).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Reporting Time:</span>
                <span className="font-semibold text-white">06:00 AM (Sharp)</span>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] block">Boarding Hub:</span>
                <span className="font-semibold text-white">{booking.boardingPoint}</span>
              </div>
            </div>
          </div>

          {/* Passenger Manifest */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
              Verified Pilgrim Manifest ({booking.passengers.length} Persons)
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-100 text-slate-600 font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Pilgrim Full Name</th>
                    <th className="p-2.5">Age / Gender</th>
                    <th className="p-2.5">ID Verification</th>
                    <th className="p-2.5">Assistance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {booking.passengers.map((p, i) => (
                    <tr key={i} className="hover:bg-slate-50/50">
                      <td className="p-2.5 font-bold text-slate-400">{i + 1}</td>
                      <td className="p-2.5 font-semibold text-slate-800">{p.name}</td>
                      <td className="p-2.5 text-slate-600">{p.age} Yrs · {p.gender}</td>
                      <td className="p-2.5 text-slate-600">{p.idType} (Original Required)</td>
                      <td className="p-2.5">
                        {p.age >= 60 ? (
                          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-medium">
                            Senior / Palki Support
                          </span>
                        ) : (
                          <span className="text-slate-400">Regular</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Contact & Tour Manager Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50">
              <div className="text-[10px] font-bold text-slate-500 uppercase mb-1">
                Lead Traveler & Contacts
              </div>
              <div className="font-bold text-slate-900">{booking.contactName}</div>
              <div className="text-slate-600">{booking.contactPhone}</div>
              <div className="text-slate-600">{booking.contactEmail}</div>
              <div className="text-[11px] text-slate-500 mt-1">
                Emergency Contact: {booking.emergencyContact}
              </div>
            </div>

            <div className="p-3.5 rounded-lg border border-amber-200 bg-amber-50/50">
              <div className="text-[10px] font-bold text-amber-800 uppercase mb-1">
                Assigned Tour Manager / Vedic Escort
              </div>
              <div className="font-bold text-slate-900">{booking.assignedGuide || 'Pandit Someshwar Joshi'}</div>
              <div className="text-amber-900 font-medium">Tel: {booking.guidePhone || '+91 99287 52158'}</div>
              <div className="text-[11px] text-amber-800 mt-1">
                Will coordinate vehicle boarding and temple entry tokens 24 hours prior.
              </div>
            </div>
          </div>

          {/* Financials & Balance Summary */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-wrap items-center justify-between gap-4 text-xs">
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-bold">Total Fare (Incl. GST)</div>
              <div className="text-base font-bold text-slate-900 tabular-nums">
                ₹{booking.totalAmount.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-bold">Paid Amount</div>
              <div className="text-base font-bold text-emerald-700 tabular-nums">
                ₹{booking.advancePaid.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-bold">Balance Due on Arrival</div>
              <div className="text-base font-bold text-amber-800 tabular-nums">
                ₹{booking.balanceDue.toLocaleString('en-IN')}
              </div>
            </div>
            <div>
              <div className="text-slate-500 text-[10px] uppercase font-bold">Payment Method</div>
              <div className="font-semibold text-slate-800">{booking.paymentMethod}</div>
            </div>
          </div>

          {/* Important Guidelines Checklist */}
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/40 text-[11px] text-slate-700 space-y-1">
            <div className="font-bold text-amber-900 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
              <span>Mandatory Yatra Instructions:</span>
            </div>
            <p>1. Carry original government photo ID (Aadhar Card) for mandatory security checkpoint verification.</p>
            <p>2. Keep warm thermal clothing, rain gear/poncho, and personal medicines handy in your small daypack.</p>
            <p>3. 100% Satvik Pure Veg meals are included. Please inform tour manager of special dietary requirements.</p>
            <p>4. 24x7 Mahima Central Operations Helpline: <strong>+91 99287 52158</strong></p>
          </div>

          {/* Security Barcode & Signature Footnote */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400">
            <div>
              <div className="font-mono tracking-widest text-slate-700 font-bold">
                ||||| | |||| || |||||| | ||||| ||| ||||
              </div>
              <span>Digital Security Verification Hash: SHA256-MTT-{booking.id}</span>
            </div>
            <div className="text-right">
              <span className="font-spiritual text-amber-800 font-bold block">ॐ शान्तिः शान्तिः शान्तिः</span>
              <span>Authorized Signature: Mahima Tour Operations</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA for screen */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between no-print sticky bottom-0">
          <span className="text-xs text-slate-500">
            A confirmation copy has been queued for WhatsApp and Email dispatch.
          </span>
          <button
            onClick={onClose}
            className="py-2 px-5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
