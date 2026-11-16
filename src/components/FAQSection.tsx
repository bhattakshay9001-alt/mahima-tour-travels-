import React, { useState } from 'react';
import { FAQS } from '../data/mockData';
import { ChevronDown, HelpCircle, PhoneCall } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string>('faq-1');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Yatra Preparation', 'Senior Citizens', 'Booking & Payments', 'Meals & Stays'];

  const filteredFaqs = activeCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === activeCategory);

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? '' : id));
  };

  return (
    <section id="faqs" className="py-16 md:py-24 bg-white border-t border-slate-200">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-800 uppercase tracking-widest mb-2.5">
            <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
            <span>Spiritual Tour Queries</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-spiritual font-bold text-slate-900 tracking-tight text-balance mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Essential information regarding mandatory biometric passes, high-altitude health precautions, pure satvik food, and booking schedules.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 mb-8 gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                activeCategory === c
                  ? 'bg-amber-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className="rounded-xl border border-slate-200/90 overflow-hidden bg-slate-50/50 transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50 transition-colors"
                >
                  <span className="font-spiritual text-sm sm:text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                  <div className={`w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-amber-600' : 'text-slate-400'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/50 bg-white">
                    <p>{faq.answer}</p>
                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Category: <strong>{faq.category}</strong></span>
                      <span>Need more guidance? Call <strong>+91 99287 52158</strong></span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Contact banner */}
        <div className="mt-10 p-4 rounded-xl bg-amber-50/70 border border-amber-200 flex items-center justify-between text-xs text-amber-950">
          <div className="flex items-center gap-2">
            <PhoneCall className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Have a specific medical query or custom itinerary request?</span>
          </div>
          <a
            href="tel:+919928752158"
            className="font-bold text-amber-800 hover:text-amber-950 underline underline-offset-2 shrink-0 ml-2"
          >
            Speak with Panditji & Team →
          </a>
        </div>
      </div>
    </section>
  );
};
