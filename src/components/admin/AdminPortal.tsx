import React, { useState } from 'react';
import { TourPackage, Booking, CustomYatraRequest } from '../../types/yatra';
import {
  LayoutDashboard,
  CalendarCheck,
  Package,
  Users,
  MessageSquare,
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  IndianRupee,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Download,
  Share2,
  Lock
} from 'lucide-react';

interface AdminPortalProps {
  packages: TourPackage[];
  bookings: Booking[];
  customRequests: CustomYatraRequest[];
  onUpdateBookings: (updated: Booking[]) => void;
  onUpdatePackages: (updated: TourPackage[]) => void;
  onUpdateCustomRequests: (updated: CustomYatraRequest[]) => void;
  onViewTicket: (booking: Booking) => void;
  onSwitchToCustomerView: () => void;
  onLockAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  packages,
  bookings,
  customRequests,
  onUpdateBookings,
  onUpdatePackages,
  onUpdateCustomRequests,
  onViewTicket,
  onSwitchToCustomerView,
  onLockAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'packages' | 'travelers' | 'inquiries'>('overview');

  // Bookings Filter & Search
  const [bookingSearch, setBookingSearch] = useState('');
  const [bookingStatusFilter, setBookingStatusFilter] = useState<string>('All');

  // New Tour Package Modal Form State
  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState<string | null>(null);

  const [pkgFormTitle, setPkgFormTitle] = useState('');
  const [pkgFormCategory, setPkgFormCategory] = useState<any>('Chardham Yatra');
  const [pkgFormDuration, setPkgFormDuration] = useState('7 Nights / 8 Days');
  const [pkgFormPrice, setPkgFormPrice] = useState(25000);
  const [pkgFormOriginalPrice, setPkgFormOriginalPrice] = useState(30000);
  const [pkgFormSeats, setPkgFormSeats] = useState(25);
  const [pkgFormDates, setPkgFormDates] = useState('2026-05-15, 2026-06-01');
  const [pkgFormSubtitle, setPkgFormSubtitle] = useState('');
  const [pkgFormCities, setPkgFormCities] = useState('Haridwar, Delhi');

  // Calculated Metrics
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.bookingStatus !== 'Cancelled' ? b.totalAmount : 0), 0);
  const totalCollected = bookings.reduce((sum, b) => sum + (b.bookingStatus !== 'Cancelled' ? b.advancePaid : 0), 0);
  const totalPilgrims = bookings.reduce((sum, b) => sum + (b.bookingStatus !== 'Cancelled' ? b.passengers.length : 0), 0);
  const confirmedBookingsCount = bookings.filter((b) => b.bookingStatus === 'Confirmed').length;
  const pendingInquiriesCount = customRequests.filter((r) => r.status === 'New').length;

  // Bookings Actions
  const handleUpdateBookingStatus = (bookingId: string, newStatus: Booking['bookingStatus']) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return {
          ...b,
          bookingStatus: newStatus,
          paymentStatus: newStatus === 'Confirmed' && b.balanceDue === 0 ? 'Paid' : b.paymentStatus,
        };
      }
      return b;
    });
    onUpdateBookings(updated);
  };

  const handleUpdatePaymentStatus = (bookingId: string, newPaymentStatus: Booking['paymentStatus']) => {
    const updated = bookings.map((b) => {
      if (b.id === bookingId) {
        return {
          ...b,
          paymentStatus: newPaymentStatus,
          advancePaid: newPaymentStatus === 'Paid' ? b.totalAmount : b.advancePaid,
          balanceDue: newPaymentStatus === 'Paid' ? 0 : b.balanceDue,
        };
      }
      return b;
    });
    onUpdateBookings(updated);
  };

  // Delete Confirmation State
  const [deleteConfirmTarget, setDeleteConfirmTarget] = useState<{
    type: 'package' | 'booking' | 'inquiry';
    id: string;
    name: string;
  } | null>(null);

  const confirmDelete = () => {
    if (!deleteConfirmTarget) return;

    if (deleteConfirmTarget.type === 'package') {
      const updated = packages.filter((p) => p.id !== deleteConfirmTarget.id);
      onUpdatePackages(updated);
    } else if (deleteConfirmTarget.type === 'booking') {
      const updated = bookings.filter((b) => b.id !== deleteConfirmTarget.id);
      onUpdateBookings(updated);
    } else if (deleteConfirmTarget.type === 'inquiry') {
      const updated = customRequests.filter((r) => r.id !== deleteConfirmTarget.id);
      onUpdateCustomRequests(updated);
    }

    setDeleteConfirmTarget(null);
  };

  const handleSavePackage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pkgFormTitle) return;

    if (editingPackageId) {
      // Edit existing
      const updated = packages.map((p) => {
        if (p.id === editingPackageId) {
          return {
            ...p,
            title: pkgFormTitle,
            category: pkgFormCategory,
            duration: pkgFormDuration,
            pricePerPerson: Number(pkgFormPrice),
            originalPrice: Number(pkgFormOriginalPrice),
            availableSeats: Number(pkgFormSeats),
            subtitle: pkgFormSubtitle || p.subtitle,
            departureDates: pkgFormDates.split(',').map((d) => d.trim()),
            startingCities: pkgFormCities.split(',').map((c) => c.trim()),
          };
        }
        return p;
      });
      onUpdatePackages(updated);
      setEditingPackageId(null);
    } else {
      // Add new
      const newPkg: TourPackage = {
        id: `pkg-${Date.now()}`,
        title: pkgFormTitle,
        subtitle: pkgFormSubtitle || 'Sacred pilgrimage circuit with verified arrangements',
        category: pkgFormCategory,
        duration: pkgFormDuration,
        pricePerPerson: Number(pkgFormPrice),
        originalPrice: Number(pkgFormOriginalPrice),
        rating: 5.0,
        reviewCount: 1,
        image: '/src/assets/images/hero_spiritual_yatra_1793710765055.jpg',
        startingCities: pkgFormCities.split(',').map((c) => c.trim()),
        departureDates: pkgFormDates.split(',').map((d) => d.trim()),
        totalSeats: Number(pkgFormSeats),
        availableSeats: Number(pkgFormSeats),
        vehicleType: 'AC Sanitized Coach / Innova Crysta',
        hotelCategory: 'Deluxe 3-Star & Sanitized Ashrams',
        inclusions: [
          'Sanitized Accommodation & Pure Satvik Meals',
          'VIP Darshan Pass coordination',
          'Experienced Chauffeur & Verified Guide'
        ],
        exclusions: ['Personal pooja items', 'Air/Train tickets'],
        highlights: ['Sacred darshan at sanctum sanctorum', 'Holy snan and evening aarti'],
        itinerary: [
          { day: 1, title: 'Arrival & Welcome Pooja', description: 'Reporting at hub city and welcome aarti.', stay: 'Deluxe Hotel', meals: 'Dinner' },
          { day: 2, title: 'Sacred Temple Darshan', description: 'Early morning VIP Abhishek and temple parikrama.', stay: 'Deluxe Hotel', meals: 'Breakfast & Dinner' },
        ],
        featured: false,
      };
      onUpdatePackages([newPkg, ...packages]);
    }

    setIsAddPackageOpen(false);
    // Reset form
    setPkgFormTitle('');
    setPkgFormSubtitle('');
  };

  const handleOpenEditPackage = (pkg: TourPackage) => {
    setEditingPackageId(pkg.id);
    setPkgFormTitle(pkg.title);
    setPkgFormCategory(pkg.category);
    setPkgFormDuration(pkg.duration);
    setPkgFormPrice(pkg.pricePerPerson);
    setPkgFormOriginalPrice(pkg.originalPrice);
    setPkgFormSeats(pkg.availableSeats);
    setPkgFormDates(pkg.departureDates.join(', '));
    setPkgFormSubtitle(pkg.subtitle);
    setPkgFormCities(pkg.startingCities.join(', '));
    setIsAddPackageOpen(true);
  };

  const handleUpdateInquiryStatus = (id: string, newStatus: CustomYatraRequest['status']) => {
    const updated = customRequests.map((r) => (r.id === id ? { ...r, status: newStatus } : r));
    onUpdateCustomRequests(updated);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      bookingSearch === '' ||
      b.id.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.contactName.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.contactPhone.toLowerCase().includes(bookingSearch.toLowerCase()) ||
      b.packageTitle.toLowerCase().includes(bookingSearch.toLowerCase());

    const matchesStatus =
      bookingStatusFilter === 'All' || b.bookingStatus === bookingStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Admin Top Navigation */}
      <div className="bg-[#0B132B] border-b border-slate-800 px-4 md:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-amber-600 flex items-center justify-center text-white font-spiritual font-bold text-lg shadow">
            ॐ
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-spiritual text-base font-bold text-white tracking-tight">
                Mahima Tour & Travels
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                Operations Portal
              </span>
            </div>
            <div className="text-[11px] text-slate-400">
              Agency Master Console · Haridwar Central Desk
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onSwitchToCustomerView}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Exit to Pilgrim Website</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={onLockAdmin}
            className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900/80 text-rose-300 hover:text-rose-200 rounded-lg text-xs font-semibold border border-rose-800/80 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="Lock Admin Portal and require PIN 9928"
          >
            <Lock className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Lock Portal</span>
          </button>
        </div>
      </div>

      {/* Admin Subheader Navigation Tabs */}
      <div className="bg-[#0D1B3E] border-b border-slate-800 px-4 md:px-8 overflow-x-auto">
        <div className="flex items-center gap-1 py-2 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Overview</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Booking Management ({bookings.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Tour Packages ({packages.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('inquiries')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'inquiries'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Custom Inquiries ({customRequests.length})</span>
            {pendingInquiriesCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] flex items-center justify-center font-bold">
                {pendingInquiriesCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('travelers')}
            className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 cursor-pointer ${
              activeTab === 'travelers'
                ? 'bg-amber-600 text-white shadow'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Pilgrim Master DB</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
        {/* TAB 1: OVERVIEW DASHBOARD */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* 4 Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
                  <span>Total Tour Bookings</span>
                  <CalendarCheck className="w-4 h-4 text-amber-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {bookings.length}
                </div>
                <div className="text-xs text-emerald-400 mt-1">
                  {confirmedBookingsCount} Confirmed & Issued
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
                  <span>Gross Tour Revenue</span>
                  <IndianRupee className="w-4 h-4 text-emerald-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  ₹{totalRevenue.toLocaleString('en-IN')}
                </div>
                <div className="text-xs text-slate-300 mt-1">
                  Collected: ₹{totalCollected.toLocaleString('en-IN')}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
                  <span>Pilgrims Traveling</span>
                  <Users className="w-4 h-4 text-blue-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {totalPilgrims} Devotees
                </div>
                <div className="text-xs text-amber-300 mt-1">
                  Across 6 Shrines & Dhams
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700/80 shadow">
                <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase mb-2">
                  <span>Pending Inquiries</span>
                  <MessageSquare className="w-4 h-4 text-rose-400" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  {pendingInquiriesCount}
                </div>
                <div className="text-xs text-rose-300 mt-1">
                  Private family customized yatras
                </div>
              </div>
            </div>

            {/* Recent Bookings & Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left 2 cols: Recent Reservations */}
              <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-800/90 border border-slate-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-spiritual text-base font-bold text-white">
                    Recent Customer Reservations
                  </h3>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className="text-xs text-amber-400 hover:underline cursor-pointer"
                  >
                    View All →
                  </button>
                </div>

                <div className="space-y-3">
                  {bookings.slice(0, 4).map((b) => (
                    <div
                      key={b.id}
                      className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono font-bold text-amber-300">{b.id}</span>
                          <span className="text-slate-400">·</span>
                          <span className="font-semibold text-slate-200">{b.contactName}</span>
                          <span className="text-slate-500">({b.contactPhone})</span>
                        </div>
                        <div className="text-slate-300 font-medium">{b.packageTitle}</div>
                        <div className="text-[11px] text-slate-500">
                          Dep: {new Date(b.departureDate).toLocaleDateString('en-IN')} · {b.passengers.length} Pilgrims · {b.boardingPoint}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1.5 shrink-0">
                        <span className="text-xs font-bold text-emerald-400 tabular-nums">
                          ₹{b.totalAmount.toLocaleString('en-IN')}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                            b.bookingStatus === 'Confirmed' ? 'bg-emerald-900/60 text-emerald-300 border border-emerald-700' : 'bg-amber-900/60 text-amber-300 border border-amber-700'
                          }`}>
                            {b.bookingStatus}
                          </span>
                          <button
                            onClick={() => onViewTicket(b)}
                            className="p-1 text-slate-300 hover:text-amber-300 hover:bg-slate-800 rounded transition-colors"
                            title="Print E-Ticket"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right 1 col: Upcoming Departures Dispatch List */}
              <div className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 space-y-4">
                <h3 className="font-spiritual text-base font-bold text-white">
                  Upcoming Departure Batches
                </h3>

                <div className="space-y-3 text-xs">
                  {packages.slice(0, 4).map((p) => (
                    <div key={p.id} className="p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                      <div className="font-bold text-slate-200 mb-1">{p.title}</div>
                      <div className="flex items-center justify-between text-slate-400 text-[11px]">
                        <span>Next: {new Date(p.departureDates[0] || '2026-05-18').toLocaleDateString('en-IN')}</span>
                        <span className="text-amber-300 font-medium">{p.availableSeats} seats left</span>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                        <span className="text-slate-500">Hub: {p.startingCities[0]}</span>
                        <button
                          onClick={() => handleOpenEditPackage(p)}
                          className="text-amber-400 hover:underline cursor-pointer"
                        >
                          Manage Batch
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: BOOKING MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-spiritual text-xl font-bold text-white">
                  Customer Pilgrimage Bookings ({filteredBookings.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Verify traveler IDs, modify reservations, track payments and issue official tickets
                </p>
              </div>

              {/* Search & Filter */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <input
                    type="text"
                    value={bookingSearch}
                    onChange={(e) => setBookingSearch(e.target.value)}
                    placeholder="Search by ID, name or phone..."
                    className="pl-8 pr-3 py-1.5 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-400 outline-none w-52 sm:w-64 focus:border-amber-500"
                  />
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
                </div>

                <select
                  value={bookingStatusFilter}
                  onChange={(e) => setBookingStatusFilter(e.target.value)}
                  className="py-1.5 px-3 bg-slate-800 border border-slate-700 rounded-lg text-xs text-white outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Pending Review">Pending Review</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            {/* Bookings Table */}
            <div className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-800/90 shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Booking Ref</th>
                      <th className="p-3.5">Lead Pilgrim & Phone</th>
                      <th className="p-3.5">Tour Circuit & Departure</th>
                      <th className="p-3.5">Pax</th>
                      <th className="p-3.5">Amount / Payment</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {filteredBookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-700/30 transition-colors">
                        <td className="p-3.5 font-mono font-bold text-amber-300">
                          {b.id}
                          <div className="text-[10px] font-sans text-slate-500">
                            {new Date(b.createdAt).toLocaleDateString('en-IN')}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-white">{b.contactName}</div>
                          <div className="text-slate-400 text-[11px]">{b.contactPhone}</div>
                          <div className="text-slate-500 text-[10px]">{b.contactEmail}</div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-medium text-slate-200 line-clamp-1">{b.packageTitle}</div>
                          <div className="text-amber-400/90 text-[11px]">
                            Dep: {new Date(b.departureDate).toLocaleDateString('en-IN')}
                          </div>
                          <div className="text-slate-500 text-[10px]">{b.boardingPoint}</div>
                        </td>
                        <td className="p-3.5">
                          <span className="font-semibold text-white">{b.passengers.length}</span>
                          <div className="text-[10px] text-slate-400">
                            ({b.seniorCount} Seniors)
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-white tabular-nums">
                            ₹{b.totalAmount.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[11px] text-emerald-400 tabular-nums">
                            Paid: ₹{b.advancePaid.toLocaleString('en-IN')}
                          </div>
                          {b.balanceDue > 0 && (
                            <div className="text-[10px] text-amber-400 tabular-nums">
                              Due: ₹{b.balanceDue.toLocaleString('en-IN')}
                            </div>
                          )}
                          <div className="mt-1">
                            <select
                              value={b.paymentStatus}
                              onChange={(e) => handleUpdatePaymentStatus(b.id, e.target.value as any)}
                              className="bg-slate-900 border border-slate-700 text-[10px] rounded px-1.5 py-0.5 text-slate-300 outline-none"
                            >
                              <option value="Paid">Paid Full</option>
                              <option value="Partial (25%)">Partial 25%</option>
                              <option value="Pending">Pending</option>
                            </select>
                          </div>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={b.bookingStatus}
                            onChange={(e) => handleUpdateBookingStatus(b.id, e.target.value as any)}
                            className={`text-xs font-semibold px-2 py-1 rounded border outline-none cursor-pointer ${
                              b.bookingStatus === 'Confirmed'
                                ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                                : b.bookingStatus === 'Cancelled'
                                ? 'bg-rose-950 text-rose-300 border-rose-800'
                                : 'bg-amber-950 text-amber-300 border-amber-800'
                            }`}
                          >
                            <option value="Confirmed">Confirmed</option>
                            <option value="Pending Review">Pending Review</option>
                            <option value="Completed">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => onViewTicket(b)}
                              className="px-2 py-1 bg-amber-600/80 hover:bg-amber-600 text-white rounded text-[11px] font-medium transition-colors flex items-center gap-1 cursor-pointer"
                              title="View & Print E-Ticket"
                            >
                              <FileText className="w-3 h-3" />
                              <span>E-Ticket</span>
                            </button>
                            <a
                              href={`https://wa.me/${b.contactPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${b.contactName} ji! This is regarding your Mahima Tour & Travels booking ${b.id} for ${b.packageTitle}.`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="p-1 text-emerald-400 hover:text-emerald-300 hover:bg-slate-700 rounded transition-colors"
                              title="Message on WhatsApp"
                            >
                              <Share2 className="w-3.5 h-3.5" />
                            </a>
                            <button
                              onClick={() => setDeleteConfirmTarget({ type: 'booking', id: b.id, name: `Booking ${b.id} (${b.contactName})` })}
                              className="p-1 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded transition-colors cursor-pointer"
                              title="Delete Booking"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: TOUR PACKAGE MANAGEMENT */}
        {activeTab === 'packages' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-spiritual text-xl font-bold text-white">
                  Pilgrimage Packages Management ({packages.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Update seat capacities, rates, seasonal batches, and full itineraries
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingPackageId(null);
                  setPkgFormTitle('');
                  setPkgFormSubtitle('');
                  setPkgFormPrice(25000);
                  setPkgFormSeats(25);
                  setIsAddPackageOpen(true);
                }}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold rounded-lg flex items-center gap-2 cursor-pointer transition-colors shadow"
              >
                <Plus className="w-4 h-4" />
                <span>Create New Pilgrimage Tour</span>
              </button>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-amber-400 font-semibold mb-1">
                      <span>{pkg.category}</span>
                      <span className="text-slate-400">{pkg.duration}</span>
                    </div>

                    <h4 className="font-spiritual text-base font-bold text-white mb-2 leading-snug">
                      {pkg.title}
                    </h4>

                    <p className="text-xs text-slate-400 line-clamp-2 mb-4">
                      {pkg.subtitle}
                    </p>

                    <div className="space-y-2 text-xs text-slate-300 border-t border-slate-700 pt-3 mb-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Rate per Person:</span>
                        <strong className="text-white tabular-nums">₹{pkg.pricePerPerson.toLocaleString('en-IN')}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Available Seats:</span>
                        <strong className="text-amber-400 tabular-nums">{pkg.availableSeats} of {pkg.totalSeats}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Departures:</span>
                        <span className="text-[11px] text-slate-300">{pkg.departureDates.length} upcoming batches</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Starting Cities:</span>
                        <span className="text-[11px] text-slate-300">{pkg.startingCities.join(', ')}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-700 flex items-center justify-between">
                    <button
                      onClick={() => handleOpenEditPackage(pkg)}
                      className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Edit className="w-3.5 h-3.5" />
                      <span>Edit Package</span>
                    </button>

                    <button
                      onClick={() => setDeleteConfirmTarget({ type: 'package', id: pkg.id, name: pkg.title })}
                      className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded transition-colors cursor-pointer"
                      title="Delete Package"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: CUSTOM YATRA INQUIRIES */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-spiritual text-xl font-bold text-white">
                Private & Family Custom Yatra Inquiries ({customRequests.length})
              </h3>
              <p className="text-xs text-slate-400">
                Inquiries from families requesting private vehicles, senior citizen assistance, and tailored poojas
              </p>
            </div>

            <div className="space-y-4">
              {customRequests.map((req) => (
                <div
                  key={req.id}
                  className="p-5 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs text-slate-300 space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-700 pb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono font-bold text-amber-400 text-sm">{req.id}</span>
                      <span className="font-semibold text-white text-sm">{req.fullName}</span>
                      <span className="text-slate-400">({req.phone})</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400">
                        Received: {new Date(req.createdAt).toLocaleDateString('en-IN')}
                      </span>
                      <select
                        value={req.status}
                        onChange={(e) => handleUpdateInquiryStatus(req.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2 py-1 rounded border outline-none cursor-pointer ${
                          req.status === 'New'
                            ? 'bg-rose-950 text-rose-300 border-rose-800'
                            : req.status === 'Converted'
                            ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                            : 'bg-amber-950 text-amber-300 border-amber-800'
                        }`}
                      >
                        <option value="New">New Lead</option>
                        <option value="Quote Sent">Quote Sent</option>
                        <option value="Converted">Converted to Yatra</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-300">
                    <div>
                      <span className="text-slate-500 text-[11px] block">Circuit:</span>
                      <strong className="text-white">{req.destination}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Month & Duration:</span>
                      <strong className="text-white">{req.preferredMonth} ({req.travelDurationDays} Days)</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Travelers:</span>
                      <strong className="text-white">
                        {req.adultCount} Adults, {req.seniorCount} Seniors, {req.childCount} Kids
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-500 text-[11px] block">Vehicle Choice:</span>
                      <strong className="text-white">{req.vehicleType}</strong>
                    </div>
                  </div>

                  {req.specialRequirements && (
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300">
                      <strong className="text-amber-400 block text-[11px] mb-0.5">Special Rituals / Needs:</strong>
                      {req.specialRequirements}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-700">
                    <span className="text-slate-400">
                      Target Budget: <strong className="text-white">{req.budgetPerPerson}</strong>
                    </span>

                    <div className="flex items-center gap-2">
                      <a
                        href={`https://wa.me/${req.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Namaste ${req.fullName} ji! Regarding your custom inquiry for ${req.destination} with Mahima Tour & Travels, we have tailored your private family itinerary.`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1.5 transition-colors"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Send WhatsApp Quote</span>
                      </a>
                      <button
                        onClick={() => setDeleteConfirmTarget({ type: 'inquiry', id: req.id, name: `Inquiry ${req.id} (${req.fullName})` })}
                        className="p-1.5 text-rose-400 hover:text-rose-300 hover:bg-slate-700 rounded transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: PILGRIM MASTER DATABASE */}
        {activeTab === 'travelers' && (
          <div className="space-y-6">
            <div>
              <h3 className="font-spiritual text-xl font-bold text-white">
                Pilgrim Master Database & Manifest
              </h3>
              <p className="text-xs text-slate-400">
                Centralized registry of devotees, medical emergency contacts, and holy pilgrimage records
              </p>
            </div>

            <div className="border border-slate-700 rounded-2xl overflow-hidden bg-slate-800/90 shadow">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900 text-slate-400 font-semibold uppercase tracking-wider text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Lead Contact</th>
                      <th className="p-3.5">Tour Circuit</th>
                      <th className="p-3.5">Travelers Manifest</th>
                      <th className="p-3.5">Emergency Contact</th>
                      <th className="p-3.5">Dietary / Palki Notes</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {bookings.map((b) => (
                      <tr key={b.id} className="hover:bg-slate-700/30">
                        <td className="p-3.5">
                          <div className="font-bold text-white">{b.contactName}</div>
                          <div className="text-slate-400 text-[11px]">{b.contactPhone}</div>
                          <div className="text-slate-500 text-[10px]">{b.contactEmail}</div>
                          <span className="font-mono text-[10px] text-amber-300">{b.id}</span>
                        </td>
                        <td className="p-3.5">
                          <div className="font-semibold text-slate-200">{b.packageTitle}</div>
                          <div className="text-slate-400 text-[11px]">
                            {new Date(b.departureDate).toLocaleDateString('en-IN')}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <ul className="space-y-1">
                            {b.passengers.map((p, i) => (
                              <li key={i} className="text-[11px] text-slate-300">
                                • {p.name} ({p.age}y, {p.gender})
                                {p.age >= 60 && <span className="text-amber-400 ml-1 font-semibold">[Sr. 60+]</span>}
                              </li>
                            ))}
                          </ul>
                        </td>
                        <td className="p-3.5 text-slate-300">
                          {b.emergencyContact || 'Not Specified'}
                        </td>
                        <td className="p-3.5 text-slate-300 max-w-xs">
                          {b.specialRequests || 'Standard 100% Satvik Pure Veg Meals'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* CREATE / EDIT TOUR PACKAGE MODAL */}
      {isAddPackageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl my-auto text-slate-200">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-5">
              <h3 className="font-spiritual text-lg font-bold text-white">
                {editingPackageId ? 'Edit Pilgrimage Package' : 'Create New Pilgrimage Tour Package'}
              </h3>
              <button
                onClick={() => setIsAddPackageOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePackage} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Package Title *</label>
                <input
                  type="text"
                  required
                  value={pkgFormTitle}
                  onChange={(e) => setPkgFormTitle(e.target.value)}
                  placeholder="e.g. Kedarnath & Badrinath Do Dham Yatra"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Subtitle / Circuit Description</label>
                <input
                  type="text"
                  value={pkgFormSubtitle}
                  onChange={(e) => setPkgFormSubtitle(e.target.value)}
                  placeholder="e.g. Sacred Himalayan shrines with VIP darshan passes"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 mb-1">Circuit Category</label>
                  <select
                    value={pkgFormCategory}
                    onChange={(e) => setPkgFormCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none cursor-pointer"
                  >
                    <option value="Chardham Yatra">Chardham Yatra</option>
                    <option value="12 Jyotirlinga">12 Jyotirlinga</option>
                    <option value="River Ghats & Shrines">River Ghats & Shrines</option>
                    <option value="South India Circuit">South India Circuit</option>
                    <option value="Customized Family">Customized Family</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Duration</label>
                  <input
                    type="text"
                    value={pkgFormDuration}
                    onChange={(e) => setPkgFormDuration(e.target.value)}
                    placeholder="e.g. 5 Nights / 6 Days"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Discounted Rate per Person (₹)</label>
                  <input
                    type="number"
                    value={pkgFormPrice}
                    onChange={(e) => setPkgFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    value={pkgFormOriginalPrice}
                    onChange={(e) => setPkgFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Available Seats</label>
                  <input
                    type="number"
                    value={pkgFormSeats}
                    onChange={(e) => setPkgFormSeats(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-400 mb-1">Starting Cities (comma separated)</label>
                  <input
                    type="text"
                    value={pkgFormCities}
                    onChange={(e) => setPkgFormCities(e.target.value)}
                    placeholder="Haridwar, Delhi, Dehradun"
                    className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Departure Dates (comma separated YYYY-MM-DD)</label>
                <input
                  type="text"
                  value={pkgFormDates}
                  onChange={(e) => setPkgFormDates(e.target.value)}
                  placeholder="2026-05-18, 2026-06-02"
                  className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white outline-none"
                />
              </div>

              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddPackageOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-lg cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteConfirmTarget && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-sm w-full p-6 shadow-2xl text-slate-200">
            <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-500 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="font-spiritual text-base font-bold text-white text-center mb-2">
              Delete {deleteConfirmTarget.type === 'package' ? 'Tour Package' : deleteConfirmTarget.type === 'booking' ? 'Reservation' : 'Inquiry'}?
            </h3>
            <p className="text-xs text-slate-400 text-center mb-6 leading-relaxed">
              Are you sure you want to permanently delete <strong className="text-white font-semibold">{deleteConfirmTarget.name}</strong>? This action will remove it immediately from the portal.
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmTarget(null)}
                className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
