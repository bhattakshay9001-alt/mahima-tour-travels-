import React, { useState, useEffect } from 'react';
import { TourPackage, Booking, CustomYatraRequest } from './types/yatra';
import { INITIAL_PACKAGES, INITIAL_BOOKINGS, INITIAL_CUSTOM_REQUESTS } from './data/mockData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PackageShowcase } from './components/PackageShowcase';
import { ItineraryModal } from './components/ItineraryModal';
import { BookingWizardModal } from './components/BookingWizardModal';
import { ETicketModal } from './components/ETicketModal';
import { TrackBookingModal } from './components/TrackBookingModal';
import { CustomYatraModal } from './components/CustomYatraModal';
import { TrustSection } from './components/TrustSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FAQSection } from './components/FAQSection';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { TermsModal } from './components/TermsModal';
import { AdminPortal } from './components/admin/AdminPortal';
import { AdminPinModal } from './components/admin/AdminPinModal';

export default function App() {
  // Persistent State via LocalStorage
  const [packages, setPackages] = useState<TourPackage[]>(() => {
    const saved = localStorage.getItem('mtt_packages');
    return saved ? JSON.parse(saved) : INITIAL_PACKAGES;
  });

  const [bookings, setBookings] = useState<Booking[]>(() => {
    const saved = localStorage.getItem('mtt_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [customRequests, setCustomRequests] = useState<CustomYatraRequest[]>(() => {
    const saved = localStorage.getItem('mtt_custom_requests');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOM_REQUESTS;
  });

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('mtt_packages', JSON.stringify(packages));
  }, [packages]);

  useEffect(() => {
    localStorage.setItem('mtt_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('mtt_custom_requests', JSON.stringify(customRequests));
  }, [customRequests]);

  // View Mode: Customer Site or Admin Management
  const [currentView, setCurrentView] = useState<'customer' | 'admin'>('customer');

  // Admin PIN Security State (Master PIN: 9928)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    return sessionStorage.getItem('mtt_admin_authenticated') === 'true';
  });
  const [isAdminPinModalOpen, setIsAdminPinModalOpen] = useState(false);

  const handleViewChange = (targetView: 'customer' | 'admin') => {
    if (targetView === 'admin') {
      if (isAdminAuthenticated) {
        setCurrentView('admin');
      } else {
        setIsAdminPinModalOpen(true);
      }
    } else {
      setCurrentView('customer');
    }
  };

  const handleAdminPinSuccess = () => {
    setIsAdminAuthenticated(true);
    sessionStorage.setItem('mtt_admin_authenticated', 'true');
    setIsAdminPinModalOpen(false);
    setCurrentView('admin');
  };

  const handleLockAdmin = () => {
    setIsAdminAuthenticated(false);
    sessionStorage.removeItem('mtt_admin_authenticated');
    setCurrentView('customer');
  };

  // Filter States
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [cityFilter, setCityFilter] = useState<string>('All');

  // Modals
  const [isBookingWizardOpen, setIsBookingWizardOpen] = useState(false);
  const [selectedTourForBooking, setSelectedTourForBooking] = useState<TourPackage | null>(null);

  const [isItineraryOpen, setIsItineraryOpen] = useState(false);
  const [selectedTourForItinerary, setSelectedTourForItinerary] = useState<TourPackage | null>(null);

  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [activeBookingForTicket, setActiveBookingForTicket] = useState<Booking | null>(null);

  const [isTrackBookingOpen, setIsTrackBookingOpen] = useState(false);
  const [isCustomYatraOpen, setIsCustomYatraOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Booking Handlers
  const handleOpenBooking = (tour?: TourPackage) => {
    setSelectedTourForBooking(tour || packages[0]);
    setIsBookingWizardOpen(true);
  };

  const handleViewItinerary = (tour: TourPackage) => {
    setSelectedTourForItinerary(tour);
    setIsItineraryOpen(true);
  };

  const handleBookingComplete = (newBooking: Booking) => {
    // Add to bookings
    const updated = [newBooking, ...bookings];
    setBookings(updated);

    // Update package available seats
    setPackages((prev) =>
      prev.map((p) => {
        if (p.id === newBooking.packageId) {
          return {
            ...p,
            availableSeats: Math.max(0, p.availableSeats - newBooking.passengers.length),
          };
        }
        return p;
      })
    );

    // Close wizard and open official ticket modal
    setIsBookingWizardOpen(false);
    setActiveBookingForTicket(newBooking);
    setIsTicketModalOpen(true);
  };

  const handleCustomRequestSubmit = (request: CustomYatraRequest) => {
    setCustomRequests([request, ...customRequests]);
  };

  const handleSearchFilterFromHero = (category: string, city: string) => {
    setSelectedCategory(category);
    setCityFilter(city);
  };

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setCityFilter('All');
  };

  return (
    <div className="min-h-screen bg-[#FCFAF7] text-slate-800 flex flex-col font-sans">
      {currentView === 'admin' ? (
        <AdminPortal
          packages={packages}
          bookings={bookings}
          customRequests={customRequests}
          onUpdateBookings={setBookings}
          onUpdatePackages={setPackages}
          onUpdateCustomRequests={setCustomRequests}
          onViewTicket={(b) => {
            setActiveBookingForTicket(b);
            setIsTicketModalOpen(true);
          }}
          onSwitchToCustomerView={() => setCurrentView('customer')}
          onLockAdmin={handleLockAdmin}
        />
      ) : (
        <>
          {/* Main Pilgrim Website */}
          <Header
            currentView={currentView}
            onViewChange={handleViewChange}
            onOpenBooking={() => handleOpenBooking()}
            onOpenTrackBooking={() => setIsTrackBookingOpen(true)}
            onOpenCustomYatra={() => setIsCustomYatraOpen(true)}
          />

          <main className="flex-1">
            {/* Hero Section with Quick Search & Reassurance Strip */}
            <Hero
              onExplorePackages={() => {
                const el = document.getElementById('packages');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookYatra={() => handleOpenBooking()}
              onCustomYatra={() => setIsCustomYatraOpen(true)}
              onSearchFilter={handleSearchFilterFromHero}
            />

            {/* Filterable Package Showcase Grid */}
            <PackageShowcase
              packages={packages}
              onSelectPackage={(tour) => handleOpenBooking(tour)}
              onViewItinerary={handleViewItinerary}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              cityFilter={cityFilter}
              onResetFilters={handleResetFilters}
            />

            {/* The Mahima Sacred Promise (Safety & Trust) */}
            <TrustSection />

            {/* Blessed Pilgrim Testimonials */}
            <TestimonialsSection />

            {/* Frequently Asked Questions */}
            <FAQSection />
          </main>

          {/* Footer */}
          <Footer
            onOpenBooking={() => handleOpenBooking()}
            onOpenCustomYatra={() => setIsCustomYatraOpen(true)}
            onOpenTrackBooking={() => setIsTrackBookingOpen(true)}
            onOpenTerms={() => setIsTermsOpen(true)}
          />

          {/* Floating WhatsApp Quick-Chat */}
          <FloatingWhatsApp />
        </>
      )}

      {/* MODALS */}
      {/* 1. Step-by-Step Customer Booking Wizard */}
      {isBookingWizardOpen && (
        <BookingWizardModal
          packages={packages}
          initialTour={selectedTourForBooking}
          isOpen={isBookingWizardOpen}
          onClose={() => setIsBookingWizardOpen(false)}
          onBookingComplete={handleBookingComplete}
        />
      )}

      {/* 2. Detailed Day-by-Day Itinerary Modal */}
      {isItineraryOpen && selectedTourForItinerary && (
        <ItineraryModal
          tour={selectedTourForItinerary}
          onClose={() => setIsItineraryOpen(false)}
          onBookNow={(tour) => handleOpenBooking(tour)}
        />
      )}

      {/* 3. Printable / Downloadable Sacred E-Ticket Modal */}
      {isTicketModalOpen && activeBookingForTicket && (
        <ETicketModal
          booking={activeBookingForTicket}
          onClose={() => setIsTicketModalOpen(false)}
        />
      )}

      {/* 4. Track Booking & Ticket Lookup Modal */}
      {isTrackBookingOpen && (
        <TrackBookingModal
          isOpen={isTrackBookingOpen}
          onClose={() => setIsTrackBookingOpen(false)}
          bookings={bookings}
          onViewTicket={(b) => {
            setActiveBookingForTicket(b);
            setIsTicketModalOpen(true);
          }}
        />
      )}

      {/* 5. Custom Family Yatra Request Modal */}
      {isCustomYatraOpen && (
        <CustomYatraModal
          isOpen={isCustomYatraOpen}
          onClose={() => setIsCustomYatraOpen(false)}
          onSubmitRequest={handleCustomRequestSubmit}
        />
      )}

      {/* 6. Terms & Cancellation Policy Modal */}
      {isTermsOpen && (
        <TermsModal
          isOpen={isTermsOpen}
          onClose={() => setIsTermsOpen(false)}
        />
      )}

      {/* 7. Admin PIN Security Gateway Modal (PIN: 9928) */}
      {isAdminPinModalOpen && (
        <AdminPinModal
          isOpen={isAdminPinModalOpen}
          onClose={() => setIsAdminPinModalOpen(false)}
          onSuccess={handleAdminPinSuccess}
        />
      )}
    </div>
  );
}
