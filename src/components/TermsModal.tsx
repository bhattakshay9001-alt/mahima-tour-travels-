import React from 'react';
import { X, ShieldCheck, AlertCircle } from 'lucide-react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TermsModal: React.FC<TermsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2 text-slate-900 font-bold font-spiritual text-base">
            <ShieldCheck className="w-5 h-5 text-amber-600" />
            <span>Mahima Tour & Travels - Policy & Guidelines</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6 text-xs sm:text-sm text-slate-700 space-y-5 leading-relaxed">
          <div>
            <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              1. Pilgrimage Booking & Token Payments
            </h3>
            <p>
              To confirm reservations, a minimum 25% non-refundable advance token is collected. The remaining 75% balance is due on or before departure day upon reporting to the tour escort. All rates include 5% GST as per Government of India norms.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              2. Cancellation & Refund Matrix
            </h3>
            <div className="border border-slate-200 rounded-lg overflow-hidden my-2 text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold text-slate-700">
                  <tr>
                    <th className="p-2 border-b">Time Prior to Departure</th>
                    <th className="p-2 border-b">Refund Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2">30 days or more</td>
                    <td className="p-2 font-semibold text-emerald-700">90% of Total Fare Refunded</td>
                  </tr>
                  <tr>
                    <td className="p-2">15 to 29 days</td>
                    <td className="p-2 font-semibold text-amber-700">70% of Total Fare Refunded</td>
                  </tr>
                  <tr>
                    <td className="p-2">7 to 14 days</td>
                    <td className="p-2 font-semibold text-amber-800">50% of Total Fare Refunded</td>
                  </tr>
                  <tr>
                    <td className="p-2">Less than 7 days</td>
                    <td className="p-2 text-rose-700">Non-refundable (Credit voucher issued)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              3. Unforeseen Mountain Inclement Weather
            </h3>
            <p>
              In case of sudden landslides, snowfall, or government road closures in the Himalayan sectors (Kedarnath/Badrinath), the tour escort will coordinate alternate safe sanctums. Extra overnight accommodation due to force majeure will be arranged at standard nominal cost.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 mb-1 text-sm sm:text-base">
              4. Code of Sacred Conduct & Satvik Purity
            </h3>
            <p>
              Mahima Tour & Travels maintains a strict policy of Satvik purity. Consumption of alcohol, tobacco, non-vegetarian food, and narcotics is strictly prohibited inside our tour vehicles and reserved properties.
            </p>
          </div>
        </div>

        <div className="p-4 border-t border-slate-200 bg-slate-50 text-right">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
