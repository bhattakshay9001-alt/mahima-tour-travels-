import React, { useState } from 'react';
import { MessageCircle, Phone, X, Sparkles } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const phone = '919928752158';
  const quickMessages = [
    'Namaste! I want details on 2026 Chardham Yatra packages.',
    'Jai Bhole! Please share 12 Jyotirlinga schedule and pricing.',
    'I need custom itinerary for senior citizen parents (wheelchair/palki).',
    'How do I book Ayodhya Ram Mandir & Kashi VIP darshan tour?'
  ];

  const handleSendWhatsApp = (msg: string) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Quick Message Menu */}
      {isOpen && (
        <div className="mb-3 bg-white rounded-2xl shadow-2xl border border-slate-200 p-4 w-72 sm:w-80 text-slate-800 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center">
                <MessageCircle className="w-4 h-4" />
              </div>
              <div>
                <span className="text-xs font-bold block text-slate-900">Mahima Yatra Helpdesk</span>
                <span className="text-[10px] text-emerald-600 font-semibold block">Usually replies instantly</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-slate-600 p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-600 mb-3">
            Hare Krishna! Choose a topic to chat directly with our Pilgrimage Coordinator:
          </p>

          <div className="space-y-1.5 mb-3">
            {quickMessages.map((qm, i) => (
              <button
                key={i}
                onClick={() => handleSendWhatsApp(qm)}
                className="w-full text-left text-xs p-2 rounded-lg bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-900 border border-slate-200 hover:border-emerald-200 transition-colors cursor-pointer"
              >
                {qm}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <a
              href="tel:+919928752158"
              className="flex items-center gap-1 text-slate-700 hover:text-amber-800 font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Helpline</span>
            </a>
            <span className="text-[11px] text-emerald-700 font-semibold">24x7 Assistance</span>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 group cursor-pointer border-2 border-white ring-2 ring-emerald-600/30"
        title="Chat on WhatsApp with Mahima Tour & Travels"
      >
        <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
        <span className="text-xs font-bold hidden sm:inline">WhatsApp Expert</span>
      </button>
    </div>
  );
};
