export interface ItineraryDay {
  day: number;
  title: string;
  description: string;
  distance?: string;
  stay: string;
  meals: string;
}

export interface TourPackage {
  id: string;
  title: string;
  subtitle: string;
  category: 'Chardham Yatra' | '12 Jyotirlinga' | 'River Ghats & Shrines' | 'South India Circuit' | 'Customized Family';
  duration: string;
  pricePerPerson: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  image: string;
  startingCities: string[];
  departureDates: string[];
  totalSeats: number;
  availableSeats: number;
  vehicleType: string;
  hotelCategory: string;
  inclusions: string[];
  exclusions: string[];
  highlights: string[];
  itinerary: ItineraryDay[];
  featured?: boolean;
}

export interface Passenger {
  name: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  idType: 'Aadhar Card' | 'Passport' | 'Voter ID';
  idNumber?: string;
  isSenior?: boolean;
  specialAssistance?: boolean;
}

export interface Booking {
  id: string;
  createdAt: string;
  packageId: string;
  packageTitle: string;
  packageCategory: string;
  departureDate: string;
  boardingPoint: string;
  passengers: Passenger[];
  adultCount: number;
  childCount: number;
  seniorCount: number;
  roomType: 'Twin Sharing' | 'Triple Sharing' | 'Single Supplement';
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  emergencyContact: string;
  specialRequests?: string;
  baseFare: number;
  gstAmount: number;
  discountAmount: number;
  couponCode?: string;
  totalAmount: number;
  advancePaid: number;
  balanceDue: number;
  paymentMethod: 'UPI' | 'Razorpay / Card' | 'Net Banking' | 'Advance Token (25%)';
  paymentStatus: 'Paid' | 'Partial (25%)' | 'Pending';
  bookingStatus: 'Confirmed' | 'Pending Review' | 'Completed' | 'Cancelled';
  assignedGuide?: string;
  guidePhone?: string;
}

export interface CustomYatraRequest {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  destination: string;
  preferredMonth: string;
  travelDurationDays: number;
  adultCount: number;
  seniorCount: number;
  childCount: number;
  vehicleType: 'Innova Crysta' | 'Tempo Traveller (12-Seater)' | 'Tempo Traveller (17-Seater)' | 'Luxury Coach' | 'Helicopter Special';
  hotelPreference: 'Deluxe (3 Star)' | 'Heritage / Premium' | 'Budget Ashram / Guest House';
  specialRequirements: string;
  budgetPerPerson: string;
  status: 'New' | 'Quote Sent' | 'Converted' | 'Closed';
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  tourName: string;
  rating: number;
  comment: string;
  date: string;
  verified: boolean;
  avatarText: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'Yatra Preparation' | 'Senior Citizens' | 'Booking & Payments' | 'Meals & Stays';
}
