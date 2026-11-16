import React, { useState, useEffect } from 'react';
import { TourPackage, Booking, Passenger } from '../types/yatra';
import { X, Calendar, MapPin, Users, Check, ArrowRight, ArrowLeft, ShieldCheck, QrCode, CreditCard, Building2, Sparkles, AlertCircle } from 'lucide-react';

interface BookingWizardModalProps {
  packages: TourPackage[];
  initialTour: TourPackage | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: (newBooking: Booking) => void;
}

export const BookingWizardModal: React.FC<BookingWizardModalProps> = ({
  packages,
  initialTour,
  isOpen,
  onClose,
  onBookingComplete,
}) => {
  // Step state: 1: Package & Date, 2: Count & Pick-up, 3: Passenger Details, 4: Summary & Payment
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Form selections
  const [selectedPackageId, setSelectedPackageId] = useState<string>(
    initialTour?.id || packages[0]?.id || ''
  );
  const activePackage = packages.find((p) => p.id === selectedPackageId) || packages[0];

  const [departureDate, setDepartureDate] = useState<string>(
    activePackage?.departureDates[0] || '2026-05-18'
  );
  const [boardingPoint, setBoardingPoint] = useState<string>(
    activePackage?.startingCities[0] ? `${activePackage.startingCities[0]} Central Station` : 'Haridwar Railway Station'
  );

  // Counts
  const [adultCount, setAdultCount] = useState<number>(2);
  const [seniorCount, setSeniorCount] = useState<number>(0);
  const [childCount, setChildCount] = useState<number>(0);
  const [roomType, setRoomType] = useState<'Twin Sharing' | 'Triple Sharing' | 'Single Supplement'>('Twin Sharing');

  // Contact details
  const [contactName, setContactName] = useState<string>('');
  const [contactEmail, setContactEmail] = useState<string>('');
  const [contactPhone, setContactPhone] = useState<string>('');
  const [emergencyContact, setEmergencyContact] = useState<string>('');
  const [specialRequests, setSpecialRequests] = useState<string>('');

  // Passenger Array
  const totalTravelers = adultCount + seniorCount + childCount;
  const [passengers, setPassengers] = useState<Passenger[]>([
    { name: '', age: 35, gender: 'Male', idType: 'Aadhar Card', isSenior: false },
    { name: '', age: 32, gender: 'Female', idType: 'Aadhar Card', isSenior: false },
  ]);

  // Sync passengers count when adults/seniors/children change
  useEffect(() => {
    setPassengers((prev) => {
      const next: Passenger[] = [];
      let seniorRemaining = seniorCount;
      let childRemaining = childCount;

      for (let i = 0; i < totalTravelers; i++) {
        if (prev[i]) {
          next.push(prev[i]);
        } else {
          const isSenior = seniorRemaining > 0;
          const isChild = !isSenior && childRemaining > 0;
          if (isSenior) seniorRemaining--;
          if (isChild) childRemaining--;

          next.push({
            name: '',
            age: isSenior ? 65 : isChild ? 8 : 35,
            gender: 'Male',
            idType: 'Aadhar Card',
            isSenior,
          });
        }
      }
      return next;
    });
  }, [totalTravelers, seniorCount, childCount]);

  // Payment method
  const [paymentOption, setPaymentOption] = useState<'UPI' | 'Razorpay / Card' | 'Net Banking' | 'Advance Token (25%)'>('Advance Token (25%)');
  const [couponCode, setCouponCode] = useState<string>('');
  const [couponApplied, setCouponApplied] = useState<boolean>(false);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  // Calculations
  const farePerPerson = activePackage?.pricePerPerson || 25000;
  // Children under 12 get 30% concession
  const baseFare = (adultCount * farePerPerson) + (seniorCount * farePerPerson) + (childCount * Math.round(farePerPerson * 0.7));
  const gstAmount = Math.round(baseFare * 0.05); // 5% GST for pilgrimage tour packages
  const totalAmount = Math.max(0, baseFare + gstAmount - couponDiscount);
  const advanceAmount = Math.round(totalAmount * 0.25);
  const dueAmount = paymentOption === 'Advance Token (25%)' ? totalAmount - advanceAmount : 0;

  const handleApplyCoupon = () => {
    if (couponCode.trim().toUpperCase() === 'DIVINE500') {
      setCouponDiscount(1500);
      setCouponApplied(true);
      setErrorMessage('');
    } else if (couponCode.trim().toUpperCase() === 'SENIORBLESSING') {
      setCouponDiscount(2000);
      setCouponApplied(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid coupon code. Try "DIVINE500" or "SENIORBLESSING".');
    }
  };

  const updatePassenger = (index: number, field: keyof Passenger, value: any) => {
    setPassengers((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      if (field === 'age') {
        copy[index].isSenior = Number(value) >= 60;
      }
      return copy;
    });
  };

  const handleNextFromStep1 = () => {
    if (!departureDate) {
      setErrorMessage('Please select a valid departure date.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(2);
  };

  const handleNextFromStep2 = () => {
    if (totalTravelers < 1) {
      setErrorMessage('Please add at least 1 traveler.');
      return;
    }
    if (!boardingPoint.trim()) {
      setErrorMessage('Please specify your pick-up / boarding location.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(3);
  };

  const handleNextFromStep3 = () => {
    if (!contactName.trim()) {
      setErrorMessage('Please enter the primary traveler / contact name.');
      return;
    }
    if (!contactPhone.trim() || contactPhone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile contact number.');
      return;
    }
    if (!contactEmail.trim() || !contactEmail.includes('@')) {
      setErrorMessage('Please enter a valid email address for receiving E-Tickets.');
      return;
    }
    // Check passenger names
    for (let i = 0; i < passengers.length; i++) {
      if (!passengers[i].name.trim()) {
        setErrorMessage(`Please enter the full name for Traveler #${i + 1}.`);
        return;
      }
    }
    setErrorMessage('');
    setCurrentStep(4);
  };

  const handleCompleteBooking = () => {
    setIsSubmitting(true);
    setErrorMessage('');

    setTimeout(() => {
      const randomRef = `MTT-2026-${activePackage.category.slice(0, 2).toUpperCase()}${Math.floor(100 + Math.random() * 900)}`;
      
      const newBooking: Booking = {
        id: randomRef,
        createdAt: new Date().toISOString(),
        packageId: activePackage.id,
        packageTitle: activePackage.title,
        packageCategory: activePackage.category,
        departureDate,
        boardingPoint,
        passengers,
        adultCount,
        childCount,
        seniorCount,
        roomType,
        contactName,
        contactEmail,
        contactPhone,
        emergencyContact: emergencyContact || '+91 98765 00000',
        specialRequests,
        baseFare,
        gstAmount,
        discountAmount: couponDiscount,
        couponCode: couponApplied ? couponCode.toUpperCase() : undefined,
        totalAmount,
        advancePaid: paymentOption === 'Advance Token (25%)' ? advanceAmount : totalAmount,
        balanceDue: dueAmount,
        paymentMethod: paymentOption,
        paymentStatus: paymentOption === 'Advance Token (25%)' ? 'Partial (25%)' : 'Paid',
        bookingStatus: 'Confirmed',
        assignedGuide: 'Pandit Someshwar Joshi (Haridwar Desk)',
        guidePhone: '+91 99287 52158',
      };

      setIsSubmitting(false);
      onBookingComplete(newBooking);
    }, 700);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[94vh] overflow-y-auto shadow-2xl border border-slate-200 my-auto flex flex-col">
        {/* Modal Header & Stepper Progress */}
        <div className="px-5 py-4 border-b border-slate-200 bg-slate-50/80 flex items-center justify-between sticky top-0 z-20 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-600 text-white font-spiritual font-bold flex items-center justify-center text-sm">
              ॐ
            </div>
            <div>
              <h2 className="font-spiritual text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Devotional Yatra Booking System
              </h2>
              <div className="text-[11px] text-slate-500">
                Step {currentStep} of 4: {
                  currentStep === 1 ? 'Package & Departure Date' :
                  currentStep === 2 ? 'Travelers & Boarding City' :
                  currentStep === 3 ? 'Passenger Details' : 'Summary & Payment'
                }
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Step Indicator Progress Bar */}
        <div className="grid grid-cols-4 border-b border-slate-200 bg-white text-xs">
          {[
            { num: 1, title: 'Package & Date' },
            { num: 2, title: 'Seats & Pickup' },
            { num: 3, title: 'Travelers Info' },
            { num: 4, title: 'Payment & Confirm' },
          ].map((s) => (
            <div
              key={s.num}
              className={`py-2 px-3 text-center border-b-2 font-medium transition-colors ${
                currentStep === s.num
                  ? 'border-amber-600 text-amber-800 bg-amber-50/40'
                  : currentStep > s.num
                  ? 'border-emerald-600 text-emerald-800'
                  : 'border-transparent text-slate-400'
              }`}
            >
              <span className="hidden sm:inline">Step {s.num}: </span>
              <span>{s.title}</span>
            </div>
          ))}
        </div>

        {/* Error message alert */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-lg bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Modal Body / Steps */}
        <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
          {/* STEP 1: Select Tour Package & Departure Date */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Select Holy Pilgrimage Package
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {packages.map((pkg) => {
                    const isSelected = pkg.id === selectedPackageId;
                    return (
                      <div
                        key={pkg.id}
                        onClick={() => {
                          setSelectedPackageId(pkg.id);
                          setDepartureDate(pkg.departureDates[0] || '');
                          if (pkg.startingCities[0]) {
                            setBoardingPoint(`${pkg.startingCities[0]} Central Hub`);
                          }
                        }}
                        className={`p-3.5 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600 shadow-sm'
                            : 'border-slate-200 hover:border-slate-300 bg-white'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-[11px] font-semibold text-amber-700">
                            {pkg.category}
                          </span>
                          <span className="text-xs font-bold text-slate-900 tabular-nums">
                            ₹{pkg.pricePerPerson.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-900 line-clamp-1 mb-1">
                          {pkg.title}
                        </h4>
                        <div className="text-[11px] text-slate-500">
                          {pkg.duration} · {pkg.availableSeats} Seats Left
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Live Availability Check for upcoming tour dates */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-amber-600" />
                    <span>Choose Available Departure Date</span>
                  </label>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    Live Seat Inventory Checked
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {activePackage.departureDates.map((dateStr, idx) => {
                    const isDateSelected = departureDate === dateStr;
                    return (
                      <button
                        type="button"
                        key={dateStr}
                        onClick={() => setDepartureDate(dateStr)}
                        className={`p-3 rounded-lg border text-left transition-all cursor-pointer ${
                          isDateSelected
                            ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                            : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="text-xs font-bold">
                          {new Date(dateStr).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </div>
                        <div className={`text-[10px] ${isDateSelected ? 'text-amber-100' : 'text-slate-500'}`}>
                          Batch #{idx + 1} · {activePackage.availableSeats - (idx % 3)} seats left
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Package Summary Box */}
              <div className="p-3.5 rounded-lg bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950 flex items-center justify-between">
                <div>
                  <span className="font-semibold block">{activePackage.title}</span>
                  <span className="text-[11px] text-amber-800">
                    Includes sanitized accommodation, Satvik pure veg dining, guide & VIP passes.
                  </span>
                </div>
                <div className="text-right shrink-0">
                  <span className="font-bold text-base text-slate-900 tabular-nums">
                    ₹{activePackage.pricePerPerson.toLocaleString('en-IN')}
                  </span>
                  <span className="text-[10px] text-slate-500 block">/ person</span>
                </div>
              </div>
            </div>
          )}

          {/* STEP 2: Passenger Count & Pick-up Location */}
          {currentStep === 2 && (
            <div className="space-y-5">
              {/* Counts */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
                  Traveler Composition
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* Adults */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">Adults</div>
                      <div className="text-xs text-slate-500 mb-3">Ages 12 to 59</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setAdultCount(Math.max(1, adultCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-base text-slate-900 tabular-nums">{adultCount}</span>
                      <button
                        type="button"
                        onClick={() => setAdultCount(adultCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Seniors */}
                  <div className="p-4 rounded-xl border border-amber-300 bg-amber-50/40 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-sm text-amber-950 flex items-center gap-1">
                        <span>Senior Citizens</span>
                        <span className="text-[10px] bg-amber-200/80 text-amber-900 px-1.5 py-0.2 rounded font-semibold">Special Care</span>
                      </div>
                      <div className="text-xs text-amber-800/80 mb-3">Ages 60+ (Priority Palki/O2)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setSeniorCount(Math.max(0, seniorCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-amber-200 text-slate-700 font-bold hover:bg-amber-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-base text-slate-900 tabular-nums">{seniorCount}</span>
                      <button
                        type="button"
                        onClick={() => setSeniorCount(seniorCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-amber-200 text-slate-700 font-bold hover:bg-amber-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Children */}
                  <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
                    <div>
                      <div className="font-bold text-sm text-slate-900">Children</div>
                      <div className="text-xs text-slate-500 mb-3">Under 12 (30% Discount)</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setChildCount(Math.max(0, childCount - 1))}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-bold text-base text-slate-900 tabular-nums">{childCount}</span>
                      <button
                        type="button"
                        onClick={() => setChildCount(childCount + 1)}
                        className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold hover:bg-slate-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Room Occupancy Preference */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Room Accommodation Preference
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'Twin Sharing', label: 'Twin / Double Sharing', desc: 'Standard 2 adults per room' },
                    { id: 'Triple Sharing', label: 'Triple Sharing', desc: 'Family room with extra bed' },
                    { id: 'Single Supplement', label: 'Single Private Room', desc: 'Private room (+₹4,500)' },
                  ].map((r) => (
                    <div
                      key={r.id}
                      onClick={() => setRoomType(r.id as any)}
                      className={`p-3 rounded-xl border cursor-pointer transition-all ${
                        roomType === r.id
                          ? 'border-amber-600 bg-amber-50/50 ring-1 ring-amber-600'
                          : 'border-slate-200 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xs font-bold text-slate-900">{r.label}</div>
                      <div className="text-[11px] text-slate-500">{r.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Boarding / Pick-up Location */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Pick-up / Boarding Location
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={boardingPoint}
                    onChange={(e) => setBoardingPoint(e.target.value)}
                    placeholder="e.g. Haridwar Railway Station / Delhi Airport / Hotel Pickup"
                    className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-amber-500 outline-none"
                  />
                  <MapPin className="w-4 h-4 text-amber-600 absolute left-3 top-3" />
                </div>
                <div className="text-[11px] text-slate-500 mt-1.5">
                  Our tour manager will coordinate with your driver for convenient doorstep or airport/station reception.
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Passenger Details & Medical / Emergency */}
          {currentStep === 3 && (
            <div className="space-y-5">
              {/* Contact Person Details */}
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Lead Pilgrim / Primary Contact Details
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      placeholder="e.g. Alok Sharma"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Mobile / WhatsApp Number *
                    </label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Email Address (for E-Ticket Dispatch) *
                    </label>
                    <input
                      type="email"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="youremail@example.com"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                      Emergency Contact Number (Family Member)
                    </label>
                    <input
                      type="text"
                      value={emergencyContact}
                      onChange={(e) => setEmergencyContact(e.target.value)}
                      placeholder="+91 94140 12345 (Relationship)"
                      className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Individual Passenger Names */}
              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-2.5">
                  Passenger List ({passengers.length} Pilgrims)
                </h4>
                <div className="space-y-3">
                  {passengers.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200/90 bg-white grid grid-cols-1 sm:grid-cols-12 gap-3 items-center"
                    >
                      <div className="sm:col-span-1 text-xs font-bold text-slate-400">
                        #{idx + 1}
                      </div>

                      <div className="sm:col-span-5">
                        <label className="block text-[10px] text-slate-500 mb-0.5">Full Name (As per Aadhar)</label>
                        <input
                          type="text"
                          value={p.name}
                          onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                          placeholder="Passenger Name"
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-0.5">Age</label>
                        <input
                          type="number"
                          value={p.age}
                          onChange={(e) => updatePassenger(idx, 'age', parseInt(e.target.value) || 0)}
                          className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 outline-none focus:border-amber-500"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-0.5">Gender</label>
                        <select
                          value={p.gender}
                          onChange={(e) => updatePassenger(idx, 'gender', e.target.value)}
                          className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded text-xs text-slate-800 outline-none focus:border-amber-500"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-[10px] text-slate-500 mb-0.5">Senior / Palki</label>
                        <span className={`text-[11px] px-2 py-1 rounded block text-center font-medium ${
                          p.age >= 60 ? 'bg-amber-100 text-amber-900' : 'bg-slate-100 text-slate-600'
                        }`}>
                          {p.age >= 60 ? 'Senior (60+)' : 'Standard'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Special Dietary or Medical Needs (Optional)
                </label>
                <textarea
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  placeholder="e.g. Pure Jain / no-onion-garlic meal, ground floor room for grandmother, pre-booking palki/wheelchair at Kedarnath..."
                  rows={2}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:ring-2 focus:ring-amber-500 outline-none"
                />
              </div>
            </div>
          )}

          {/* STEP 4: Booking Summary & Payment Options */}
          {currentStep === 4 && (
            <div className="space-y-5">
              {/* Tour Brief Card */}
              <div className="p-4 rounded-xl bg-amber-50/60 border border-amber-200/80">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-amber-800 tracking-wider">
                      {activePackage.category}
                    </span>
                    <h4 className="text-base font-spiritual font-bold text-slate-900">
                      {activePackage.title}
                    </h4>
                  </div>
                  <span className="text-xs font-semibold text-amber-900 bg-amber-200/70 px-2.5 py-1 rounded">
                    {activePackage.duration}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs text-slate-700 pt-2 border-t border-amber-200/60">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Departure Date:</span>
                    <strong>{new Date(departureDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Boarding Hub:</span>
                    <strong>{boardingPoint}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[11px]">Total Pilgrims:</span>
                    <strong>{passengers.length} ({adultCount} Ad, {seniorCount} Sr, {childCount} Ch)</strong>
                  </div>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between text-slate-600">
                  <span>Base Yatra Fare ({passengers.length} Pilgrims):</span>
                  <span className="tabular-nums font-medium">₹{baseFare.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Govt Yatra GST (5%):</span>
                  <span className="tabular-nums font-medium">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>

                {couponApplied && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Devotional Discount ({couponCode.toUpperCase()}):</span>
                    <span className="tabular-nums">-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                {/* Coupon Code Input */}
                <div className="pt-2 border-t border-slate-200 flex items-center gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon (e.g. DIVINE500)"
                    disabled={couponApplied}
                    className="flex-1 px-3 py-1.5 bg-white border border-slate-200 rounded text-xs uppercase text-slate-800 outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={couponApplied || !couponCode.trim()}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded text-xs font-semibold hover:bg-slate-700 disabled:opacity-50 cursor-pointer"
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>

                <div className="pt-2 border-t border-slate-300 flex justify-between text-base font-bold text-slate-900">
                  <span>Total Tour Fare:</span>
                  <span className="tabular-nums text-amber-800">₹{totalAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Choose Payment Schedule & Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Option A: 25% Advance Token */}
                  <div
                    onClick={() => setPaymentOption('Advance Token (25%)')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentOption === 'Advance Token (25%)'
                        ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-amber-900">
                        Pay 25% Token to Reserve
                      </span>
                      <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                        Most Popular
                      </span>
                    </div>
                    <div className="text-base font-bold text-slate-900 tabular-nums">
                      ₹{advanceAmount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">now</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Pay rest ₹{dueAmount.toLocaleString('en-IN')} upon arrival / boarding.
                    </div>
                  </div>

                  {/* Option B: 100% Full Payment */}
                  <div
                    onClick={() => setPaymentOption('UPI')}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      paymentOption === 'UPI'
                        ? 'border-amber-600 bg-amber-50/60 ring-1 ring-amber-600'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs text-slate-900">
                        Instant UPI / Net Banking
                      </span>
                      <span className="text-[10px] text-slate-500">Zero Convenience Fee</span>
                    </div>
                    <div className="text-base font-bold text-slate-900 tabular-nums">
                      ₹{totalAmount.toLocaleString('en-IN')} <span className="text-xs font-normal text-slate-500">full payment</span>
                    </div>
                    <div className="text-[11px] text-slate-600 mt-1">
                      Instant confirmed status & priority seat allocation.
                    </div>
                  </div>
                </div>

                {/* Simulated Payment Gateway / UPI QR View */}
                <div className="p-4 rounded-xl bg-slate-900 text-white flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 bg-white p-2 rounded-xl flex items-center justify-center shrink-0 shadow">
                    {/* Simulated Authentic UPI QR Graphic */}
                    <div className="w-full h-full border-2 border-slate-900 p-1 flex flex-col justify-between text-slate-900">
                      <div className="flex justify-between">
                        <div className="w-4 h-4 bg-slate-900" />
                        <div className="w-4 h-4 bg-slate-900" />
                      </div>
                      <div className="text-[8px] font-bold text-center tracking-tight text-amber-700">
                        MAHIMA
                      </div>
                      <div className="flex justify-between">
                        <div className="w-4 h-4 bg-slate-900" />
                        <div className="w-2 h-2 bg-slate-900 ml-auto" />
                      </div>
                    </div>
                  </div>

                  <div className="text-xs space-y-1 text-center sm:text-left flex-1">
                    <div className="flex items-center justify-center sm:justify-start gap-1.5 text-amber-400 font-bold">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Razorpay & HDFC Bank Verified Spiritual Gateway</span>
                    </div>
                    <div className="text-slate-300">
                      UPI VPA: <strong className="text-white font-mono">mahima.travels@okhdfcbank</strong>
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Accepted Apps: Google Pay, PhonePe, Paytm, BHIM, Cred & All Debit/Credit Cards.
                    </div>
                  </div>
                </div>
              </div>

              {/* Safety & Cancellation Note */}
              <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-lg border border-slate-200 flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  <strong>Mahima Booking Guarantee:</strong> 90% refund if cancelled up to 15 days before departure. Medical emergencies rescheduled with zero administrative penalties.
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Navigation Buttons */}
        <div className="px-5 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between sticky bottom-0 z-20">
          <div>
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setErrorMessage('');
                  setCurrentStep((prev) => (prev - 1) as any);
                }}
                className="py-2 px-3 text-xs font-semibold text-slate-700 hover:text-slate-900 bg-white border border-slate-200 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            ) : (
              <span className="text-xs text-slate-500">Step 1 of 4</span>
            )}
          </div>

          <div>
            {currentStep === 1 && (
              <button
                type="button"
                onClick={handleNextFromStep1}
                className="py-2.5 px-5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Continue to Passenger Count</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === 2 && (
              <button
                type="button"
                onClick={handleNextFromStep2}
                className="py-2.5 px-5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Enter Pilgrim Names</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === 3 && (
              <button
                type="button"
                onClick={handleNextFromStep3}
                className="py-2.5 px-5 text-xs sm:text-sm font-semibold text-white bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 rounded-lg shadow transition-all cursor-pointer flex items-center gap-1.5"
              >
                <span>Review Fare & Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}

            {currentStep === 4 && (
              <button
                type="button"
                disabled={isSubmitting}
                onClick={handleCompleteBooking}
                className="py-2.5 px-6 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 rounded-lg shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Generating Sacred Ticket...</span>
                ) : (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Confirm Yatra & Generate E-Ticket</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
