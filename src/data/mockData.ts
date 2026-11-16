import { TourPackage, Booking, CustomYatraRequest, Testimonial, FAQItem } from '../types/yatra';

export const INITIAL_PACKAGES: TourPackage[] = [
  {
    id: 'pkg-chardham-complete',
    title: 'Divine Chardham Yatra Deluxe Circuit',
    subtitle: 'Yamunotri, Gangotri, Kedarnath & Badrinath with Haridwar Ganga Aarti',
    category: 'Chardham Yatra',
    duration: '11 Nights / 12 Days',
    pricePerPerson: 34500,
    originalPrice: 42000,
    rating: 4.9,
    reviewCount: 342,
    badge: 'Most Revered',
    image: '/src/assets/images/tour_chardham_kedarnath_1793710765876.jpg',
    startingCities: ['Haridwar', 'Delhi', 'Dehradun', 'Rishikesh'],
    departureDates: ['2026-05-10', '2026-05-18', '2026-06-02', '2026-06-15', '2026-09-08', '2026-09-22'],
    totalSeats: 30,
    availableSeats: 8,
    vehicleType: '2x2 AC Pushback Luxury Coach & 4x4 Hill Shuttles',
    hotelCategory: 'Sanitized 3-Star & Heritage Ashrams with Geyser & Heating',
    inclusions: [
      '11 Nights Accommodation in Verified Hotels / Ashrams',
      'All Pure Satvik Meals (Breakfast, Lunch & Dinner - Onion/Garlic Free available)',
      'AC Transport from Haridwar to Haridwar (AC off in hills as per rule)',
      'Kedarnath VIP Darshan Pass Assistance & Shuttle Support',
      'Oxygen Cylinder & First Aid Kit in every vehicle',
      'Experienced Garhwali Chauffeur & Dedicated Mahima Yatra Manager'
    ],
    exclusions: [
      'Helicopter tickets, Pony, Palki & Doli charges (assistance provided)',
      'Personal pooja dakshina or specialized temple offerings',
      'Extra mineral water and laundry costs'
    ],
    highlights: [
      'Darshan of all 4 sacred Himalayan Dhams with verified priests',
      'Holy dip at Yamunotri Surya Kund & Gangotri Bhagirathi Ghat',
      'Overnight holy stay at Kedarnath dham with evening Aarti',
      'Maha Abhishek at Badrinath with Tapt Kund snan',
      'Complimentary Holy Gangajal brass urn container for each pilgrim family'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Haridwar Arrival & Barkot Via Mussoorie Kempty Falls',
        description: 'Depart Haridwar early morning for Barkot through scenic foothills. Check-in to comfortable hotel in Barkot. Evening briefing for next day trek.',
        distance: '215 km (7-8 hrs drive)',
        stay: 'Barkot Mountain Retreat',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Barkot to Yamunotri Dham Darshan & Return',
        description: 'Drive to Janki Chatti and trek 6 km to sacred Yamunotri. Holy dip at Jamunabai Kund, cooking rice in Surya Kund for prasad. Divine darshan of Maa Yamuna.',
        distance: '45 km drive + 6 km trek each way',
        stay: 'Barkot Mountain Retreat',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Barkot to Uttarkashi (Kashi Vishwanath Temple)',
        description: 'Scenic journey to Uttarkashi nestled on the banks of Bhagirathi. Evening visit to ancient Kashi Vishwanath temple and Shakti temple with sacred trident.',
        distance: '100 km (4 hrs drive)',
        stay: 'Uttarkashi Divine Riverside Inn',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Uttarkashi to Gangotri Dham & Return',
        description: 'Early morning drive to Gangotri through breathtaking Harsil valley. Holy bath in Bhagirathi, special puja at Gangotri temple. Return to Uttarkashi.',
        distance: '100 km each way',
        stay: 'Uttarkashi Divine Riverside Inn',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Uttarkashi to Guptkashi / Sitapur',
        description: 'Drive along Mandakini river via Tilwara. View majestic confluence at Rudraprayag. Arrive Guptkashi, medical verification check for Kedarnath trek.',
        distance: '220 km (8 hrs drive)',
        stay: 'Sitapur Valley Camp & Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 6,
        title: 'Sitapur to Kedarnath Dham (Trek / Helipad)',
        description: 'Drive to Sonprayag/Gaurikund. Ascend the sacred trail to Kedarnath (16 km trek, or pre-arranged heli/palki). Evening divine Kedarnath Temple Aarti.',
        distance: '16 km pilgrimage path',
        stay: 'Kedarnath Pilgrim Complex / GMVN',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 7,
        title: 'Kedarnath Darshan & Descent to Guptkashi',
        description: 'Early morning Mahamrityunjaya Darshan of Baba Kedar. Descend to Gaurikund and transfer to Sitapur/Guptkashi for restful night.',
        distance: '16 km descent',
        stay: 'Sitapur Valley Camp & Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 8,
        title: 'Guptkashi to Badrinath via Joshimath',
        description: 'Drive through beautiful Chopta meadow views and Joshimath. Reach sacred Badrinath dham. Evening darshan of Lord Badri Vishal and Tapt Kund bath.',
        distance: '190 km (7 hrs drive)',
        stay: 'Badrinath Pilgrim Residency',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 9,
        title: 'Badrinath Darshan, Mana Village & Pipalkoti',
        description: 'Morning Abhishek pooja at Badrinath. Visit Mana (first Indian village), Vyas Gufa, Ganesh Gufa & Bhim Pul. Afternoon drive to Pipalkoti.',
        distance: '80 km drive',
        stay: 'Pipalkoti Comfort Inn',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 10,
        title: 'Pipalkoti to Rishikesh & Haridwar Drop',
        description: 'Drive past Devprayag (confluence of Alaknanda & Bhagirathi). Visit Ram Jhula, Laxman Jhula & Parmarth Niketan. Conclude sacred yatra with blessing.',
        distance: '220 km (7 hrs drive)',
        stay: 'Departure',
        meals: 'Breakfast'
      }
    ],
    featured: true
  },
  {
    id: 'pkg-kashi-ayodhya-prayag',
    title: 'Kashi Vishwanath, Ayodhya Ram Mandir & Triveni Sangam',
    subtitle: 'The Sacred Trimurti Spiritual Tour of Uttar Pradesh with VIP Darshan',
    category: 'River Ghats & Shrines',
    duration: '4 Nights / 5 Days',
    pricePerPerson: 16900,
    originalPrice: 21500,
    rating: 5.0,
    reviewCount: 418,
    badge: 'High Demand',
    image: '/src/assets/images/tour_ayodhya_ram_mandir_1793710766648.jpg',
    startingCities: ['Varanasi', 'Lucknow', 'Prayagraj'],
    departureDates: ['2026-04-12', '2026-04-24', '2026-05-08', '2026-05-22', '2026-06-10'],
    totalSeats: 25,
    availableSeats: 6,
    vehicleType: 'AC Toyota Crysta / AC Tempo Traveller',
    hotelCategory: '4-Star & Deluxe Heritage Hotels near Mandir corridors',
    inclusions: [
      '4 Nights Deluxe AC Hotel Stay (Varanasi 2N, Ayodhya 1N, Prayagraj 1N)',
      'All Pure Satvik Breakfasts & Traditional Dinners included',
      'Exclusive Sunrise & Evening Ganga Aarti Private Boat in Varanasi',
      'VIP Darshan facilitation at newly consecrated Ayodhya Ram Janmabhoomi Mandir',
      'Private Boat for Holy Snan at Triveni Sangam (Ganga-Yamuna-Saraswati)',
      'Kashi Vishwanath Corridor & Annapurna Devi VIP entry pass assistance',
      'Accompanied by Vedic Scholar / Certified Spiritual Guide'
    ],
    exclusions: [
      'Personal pooja samagri charges and special Sankalp donations',
      'Train or flight tickets to and from Varanasi / Lucknow'
    ],
    highlights: [
      'Special Darshan at Bhavya Ram Lalla idol in Ayodhya',
      'Evening Dashashwamedh Ghat Aarti from VIP river deck',
      'Kashi Vishwanath Sparsh Darshan / Sugam Darshan assistance',
      'Triveni Sangam holy dip and visit to sacred Akshayavat & Hanuman temple',
      'Hanuman Garhi, Kanak Bhawan & Saryu River Aarti in Ayodhya'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Varanasi Arrival & Grand Evening Ganga Aarti',
        description: 'Pick up from Varanasi airport or railway station. Check-in to hotel. Relax, then proceed to Dashashwamedh Ghat for a private decorated boat to witness the mesmerizing Ganga Aarti.',
        stay: 'Varanasi Kashi Heritage Hotel',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Kashi Vishwanath Sugam Darshan, Sarnath & Ghats',
        description: 'Early morning holy bath and Mangla/Sugam Darshan at Kashi Vishwanath. Visit Annapurna Mata and Kaal Bhairav temple. Afternoon excursion to holy Sarnath.',
        stay: 'Varanasi Kashi Heritage Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Varanasi to Prayagraj Triveni Sangam Snan & Anand Bhawan',
        description: 'Drive to Prayagraj (125 km). Proceed to Triveni Sangam by motorboat for holy bath. Visit Bade Hanuman Ji and Patalpuri Temple. Overnight stay in Prayagraj.',
        distance: '125 km (3 hrs drive)',
        stay: 'Prayagraj Riverfront Grand',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Prayagraj to Holy Ayodhya Dham & Saryu Aarti',
        description: 'Depart for sacred Ayodhya. Visit Hanuman Garhi and Kanak Bhawan. Evening attend holy Saryu Aarti at Ram Ki Paidi with thousands of earthen lamps.',
        distance: '165 km (3.5 hrs drive)',
        stay: 'Ayodhya Shri Ram Deluxe Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Ayodhya Ram Janmabhoomi VIP Darshan & Departure',
        description: 'Morning blessed Darshan of Shri Ram Lalla at the grand Ram Mandir. Visit Dasaratha Mahal. Afternoon drop at Ayodhya or Lucknow Airport.',
        stay: 'Departure',
        meals: 'Breakfast'
      }
    ],
    featured: true
  },
  {
    id: 'pkg-somnath-dwarka-jyotirlinga',
    title: 'Saurashtra Jyotirlinga Special: Somnath, Nageshwar & Dwarkadhish',
    subtitle: 'First of the 12 Jyotirlingas with sacred Mokshapuri Dwarka and Bet Dwarka',
    category: '12 Jyotirlinga',
    duration: '4 Nights / 5 Days',
    pricePerPerson: 18500,
    originalPrice: 23000,
    rating: 4.9,
    reviewCount: 289,
    badge: 'Senior Citizen Special',
    image: '/src/assets/images/tour_jyotirlinga_somnath_1793710766874.jpg',
    startingCities: ['Ahmedabad', 'Rajkot', 'Jamnagar'],
    departureDates: ['2026-04-18', '2026-05-05', '2026-05-20', '2026-06-08', '2026-08-14'],
    totalSeats: 26,
    availableSeats: 11,
    vehicleType: 'AC Premium Tempo Traveller / Innova Crysta',
    hotelCategory: 'Sea-facing 3-Star & 4-Star Deluxe properties with elevator access',
    inclusions: [
      '4 Nights Deluxe Hotel Stay (Dwarka 2N, Somnath 2N)',
      'Pure Gujarati & North Indian Satvik Meals (Breakfast & Dinner)',
      'Full AC Transportation throughout Saurashtra circuit',
      'VIP Darshan arrangements at Somnath & Dwarkadhish temple',
      'Ferry tickets for Bet Dwarka island visit',
      'Sound & Light Show tickets at Somnath Temple sea-shore',
      'Wheelchair assistance available at temples for senior citizens'
    ],
    exclusions: [
      'Air/Train fare to Rajkot/Ahmedabad',
      'Personal puja rituals or individual priest dakshina'
    ],
    highlights: [
      'Aarti at Somnath - The First Jyotirlinga on the Arabian Sea coast',
      'Darshan of Dwarkadhish Jagat Mandir (Moksha Dham)',
      'Nageshwar Jyotirlinga - Darshan of Lord Shiva with huge outdoor statue',
      'Bet Dwarka island visit where Lord Krishna resided',
      'Rukmini Devi Temple and sacred Gomti river snan ghat'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival Rajkot / Ahmedabad & Transfer to Dwarka',
        description: 'Pickup from Rajkot/Ahmedabad airport. Drive through pleasant Saurashtra roads to Holy Dwarka. Evening attend Sandhya Aarti at Dwarkadhish Jagat Mandir.',
        distance: '230 km from Rajkot',
        stay: 'Dwarka Ocean Breeze Resort',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Bet Dwarka, Nageshwar Jyotirlinga & Rukmini Temple',
        description: 'Morning ferry to Bet Dwarka. Visit ancient Krishna temple. On return, visit Nageshwar Jyotirlinga and Gopi Talav. Evening holy dip at Gomti Ghat.',
        stay: 'Dwarka Ocean Breeze Resort',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Dwarka to Porbandar & Holy Somnath Shore',
        description: 'Depart for Somnath via Porbandar (visit Kirti Mandir & Sudama Temple). Reach Somnath by afternoon. Evening Aarti and Sound & Light show at Somnath Mandir.',
        distance: '235 km (4.5 hrs)',
        stay: 'Somnath Sagar Darshan Deluxe',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Somnath Mahapuja, Bhalka Tirth & Triveni Sangam',
        description: 'Morning Rudrabhishek pooja at Somnath. Visit Bhalka Tirth (where Lord Krishna ended his earthly avatar) and Somnath Triveni Sangam.',
        stay: 'Somnath Sagar Darshan Deluxe',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Somnath to Junagadh / Rajkot Departure',
        description: 'After breakfast, visit Junagadh (Upperkot fort / Girnar foothills) and drop at Rajkot airport or railway station.',
        stay: 'Departure',
        meals: 'Breakfast'
      }
    ],
    featured: false
  },
  {
    id: 'pkg-mahakal-omkareshwar',
    title: 'Mahakaleshwar Bhasma Aarti & Omkareshwar Jyotirlinga Tour',
    subtitle: 'Two Sacred Jyotirlingas in Madhya Pradesh with Ujjain Heritage & Maheshwar Ghats',
    category: '12 Jyotirlinga',
    duration: '3 Nights / 4 Days',
    pricePerPerson: 14200,
    originalPrice: 17800,
    rating: 4.9,
    reviewCount: 310,
    badge: 'Bhasma Aarti Guarantee',
    image: '/src/assets/images/tour_varanasi_ganga_aarti_1793710767096.jpg',
    startingCities: ['Indore', 'Ujjain'],
    departureDates: ['2026-04-10', '2026-04-20', '2026-05-02', '2026-05-16', '2026-06-05'],
    totalSeats: 22,
    availableSeats: 5,
    vehicleType: 'AC Ertiga / Innova Crysta / AC Winger',
    hotelCategory: '3-Star Deluxe & Mahakal Corridor Boutique Hotels',
    inclusions: [
      '3 Nights AC Hotel Stay (Ujjain 2N, Indore 1N)',
      'Mahakaleshwar Bhasma Aarti Registration Assistance',
      'VIP Darshan at Omkareshwar & Mamleshwar Jyotirlinga across Narmada',
      'Narmada River Boat Ride at Omkareshwar island',
      'All Pure Satvik Meals (Breakfast & Dinner)',
      'Ujjain local sightseeing: Kal Bhairav, Harsiddhi Mata, Ram Ghat, Sandipani Ashram',
      '24/7 dedicated Mahima Tour escort'
    ],
    exclusions: ['Pooja samagri, personal expenses, train/air tickets'],
    highlights: [
      'Early morning divine 4:00 AM Bhasma Aarti at Mahakaleshwar',
      'Newly inaugurated grand Mahakal Lok Corridor illumination walk',
      'Holy bath in Shipra river at Ram Ghat',
      'Mamleshwar & Omkareshwar island parikrama by boat',
      'Famous 56 Dukaan & Sarafa pure vegetarian street food tour in Indore'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Indore Arrival & Transfer to Holy Ujjain',
        description: 'Pick up from Indore. Drive 55 km to Ujjain. Check in to hotel. Evening walk through the illuminated Mahakal Lok corridor and attend Sandhya Aarti.',
        stay: 'Ujjain Mahakal Lok Palace',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Bhasma Aarti, Kal Bhairav & Shipra Ram Ghat',
        description: '3:30 AM reporting for the mystical Bhasma Aarti of Lord Mahakal. Post breakfast, visit Kaal Bhairav temple, Mangalnath and Harsiddhi Shaktipeeth.',
        stay: 'Ujjain Mahakal Lok Palace',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Ujjain to Sacred Omkareshwar Jyotirlinga',
        description: 'Drive to holy Omkareshwar on Mandhata island (140 km). Holy dip in sacred Narmada, boat ride, and Darshan at Omkareshwar & Mamleshwar Jyotirlingas.',
        distance: '140 km (3.5 hrs)',
        stay: 'Indore Regency Grand',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Indore Heritage Tour & Departure',
        description: 'Visit Rajwada Palace and Lal Bagh in Indore. Drop at Indore Airport or Railway Station with divine blessings.',
        stay: 'Departure',
        meals: 'Breakfast'
      }
    ],
    featured: false
  },
  {
    id: 'pkg-rameshwaram-madurai-south',
    title: 'Rameshwaram Jyotirlinga, Madurai Meenakshi & Kanyakumari',
    subtitle: 'The Southern Char Dham pilgrimage touching Indian Ocean & sacred 22 Theerthams',
    category: 'South India Circuit',
    duration: '5 Nights / 6 Days',
    pricePerPerson: 22800,
    originalPrice: 28500,
    rating: 4.8,
    reviewCount: 195,
    badge: 'Coastal Pilgrimage',
    image: '/src/assets/images/tour_jyotirlinga_somnath_1793710766874.jpg',
    startingCities: ['Madurai', 'Chennai', 'Bangalore'],
    departureDates: ['2026-04-15', '2026-05-12', '2026-06-01', '2026-07-10'],
    totalSeats: 24,
    availableSeats: 9,
    vehicleType: 'AC Tempo Traveller / AC Luxury Coach',
    hotelCategory: 'Comfortable 3-Star & 4-Star hotels with lift and hot water',
    inclusions: [
      '5 Nights AC Hotel Stay (Madurai 1N, Rameshwaram 2N, Kanyakumari 2N)',
      'Traditional South & North Indian Pure Veg Meals',
      'VIP Darshan at Madurai Meenakshi Amman Temple',
      'Ramanathaswamy Jyotirlinga Darshan & 22 Sacred Wells Snan assistance',
      'Visit Dhanushkodi ghost town & Rama Setu viewpoint',
      'Vivekananda Rock Memorial ferry & sunrise at Kanyakumari Triveni'
    ],
    exclusions: ['Temple pooja tickets, laundry, personal purchases'],
    highlights: [
      'Holy snan at 22 wells (Theerthams) inside Rameshwaram temple',
      'Awe-inspiring 1000-pillar hall of Meenakshi Amman Temple',
      'Crossing the historic Pamban sea bridge',
      'Witnessing both Sunrise and Sunset at Kanyakumari tip',
      'Suchindram Thanumalayan Temple darshan'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Arrival Madurai & Meenakshi Amman Temple Darshan',
        description: 'Arrive at Madurai. Check in. Afternoon visit to the world-renowned Meenakshi Sundareswarar Temple and witness the royal evening procession.',
        stay: 'Madurai Heritage Residency',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Madurai to Rameshwaram via Pamban Bridge',
        description: 'Drive across the engineering marvel Pamban Bridge into Rameshwaram island. Evening visit Agni Theertham and attend Ramanathaswamy Temple Aarti.',
        distance: '175 km (3.5 hrs)',
        stay: 'Rameshwaram Temple View Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: '22 Theerthams Holy Bath & Dhanushkodi Rama Setu',
        description: 'Early morning holy bath in the 22 consecrated temple wells followed by Jyotirlinga darshan. Afternoon excursion to Dhanushkodi and Ramar Patham.',
        stay: 'Rameshwaram Temple View Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 4,
        title: 'Rameshwaram to Kanyakumari & Sunset View',
        description: 'Scenic coastal drive to Kanyakumari, the southernmost tip of mainland India. Visit Bhagavati Amman temple and sunset point.',
        distance: '310 km (5.5 hrs)',
        stay: 'Kanyakumari Ocean Front Resort',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 5,
        title: 'Vivekananda Rock Memorial & Triveni Sangam',
        description: 'Watch golden sunrise. Ferry to Vivekananda Rock Memorial and Thiruvalluvar Statue. Afternoon visit Gandhi Memorial and wax museum.',
        stay: 'Kanyakumari Ocean Front Resort',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 6,
        title: 'Suchindram Temple & Trivandrum / Madurai Drop',
        description: 'Visit Suchindram Thanumalayan Temple (unique shrine for Brahma-Vishnu-Shiva). Drop at Trivandrum or Madurai airport.',
        stay: 'Departure',
        meals: 'Breakfast'
      }
    ],
    featured: false
  },
  {
    id: 'pkg-custom-family-special',
    title: 'Customized Family & Senior Citizen Spiritual Yatra',
    subtitle: 'Tailored private itinerary, dedicated pandit, wheelchair / palki priority & private vehicle',
    category: 'Customized Family',
    duration: 'Flexible (3 to 15 Days)',
    pricePerPerson: 19500,
    originalPrice: 24000,
    rating: 5.0,
    reviewCount: 156,
    badge: 'Private & Customized',
    image: '/src/assets/images/hero_spiritual_yatra_1793710765055.jpg',
    startingCities: ['Delhi', 'Haridwar', 'Mumbai', 'Ahmedabad', 'Bangalore', 'Kolkata'],
    departureDates: ['Daily Departures on Request'],
    totalSeats: 40,
    availableSeats: 25,
    vehicleType: 'Private Toyota Innova Crysta / Luxury Urbania / Tempo Traveller',
    hotelCategory: 'Custom Choice: 3-Star, 4-Star Heritage or Ashram Comfort',
    inclusions: [
      '100% Private Sanitized Vehicle with verified veteran mountain driver',
      'Customized Satvik meal plan suited for elders, diabetics, and children',
      'Personal Priest / Panda arrangements for personalized Shraddha, Pind Daan or Abhishek',
      'Pre-booked Wheelchair / Palki / Pony arrangements for senior family members',
      'Portable Medical Oxygen cylinders in high-altitude zones',
      'Flexible start time and rest intervals suited for your family'
    ],
    exclusions: ['Flight/Train tickets, specialized temple offering donations'],
    highlights: [
      'Zero rush travel pace designed specifically for elderly parents',
      'Private Rudrabhishek and personalized archana at sacred sanctums',
      'Doorstep pickup from your home or local airport',
      'Dedicated 24x7 Mahima Tour Concierge for your family'
    ],
    itinerary: [
      {
        day: 1,
        title: 'Private Chauffeur Pickup & Welcome Blessing',
        description: 'Personalized airport or doorstep pickup in an AC luxury vehicle. Welcome garland and blessing kit with itinerary walkthrough.',
        stay: 'Handpicked Deluxe Hotel',
        meals: 'Dinner'
      },
      {
        day: 2,
        title: 'Sacred Temples & Private Family Pooja',
        description: 'VIP expedited darshan coordinated with pre-booked Pandas. Special family sankalp pooja with certified pandit.',
        stay: 'Handpicked Deluxe Hotel',
        meals: 'Breakfast & Dinner'
      },
      {
        day: 3,
        title: 'Scenic Spiritual Excursions & Evening Aarti',
        description: 'Peaceful sightseeing paced according to family energy levels. Reserved front-row seats for evening temple/ghat aarti.',
        stay: 'Handpicked Deluxe Hotel',
        meals: 'Breakfast & Dinner'
      }
    ],
    featured: true
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'MTT-2026-CH842',
    createdAt: '2026-04-01T10:15:00Z',
    packageId: 'pkg-chardham-complete',
    packageTitle: 'Divine Chardham Yatra Deluxe Circuit',
    packageCategory: 'Chardham Yatra',
    departureDate: '2026-05-18',
    boardingPoint: 'Haridwar Railway Station (Gate No. 1)',
    adultCount: 2,
    childCount: 0,
    seniorCount: 2,
    roomType: 'Twin Sharing',
    passengers: [
      { name: 'Rameshwar Prasad Sharma', age: 67, gender: 'Male', idType: 'Aadhar Card', isSenior: true, specialAssistance: true },
      { name: 'Pushpa Devi Sharma', age: 63, gender: 'Female', idType: 'Aadhar Card', isSenior: true, specialAssistance: true },
      { name: 'Alok Sharma', age: 38, gender: 'Male', idType: 'Aadhar Card', isSenior: false },
      { name: 'Sunita Sharma', age: 36, gender: 'Female', idType: 'Aadhar Card', isSenior: false }
    ],
    contactName: 'Alok Sharma',
    contactEmail: 'alok.sharma.blr@gmail.com',
    contactPhone: '+91 98451 22890',
    emergencyContact: '+91 94140 88219 (Vikas Sharma - Brother)',
    specialRequests: 'Need palki / pony booking assistance for elderly parents at Kedarnath and Yamunotri. Onion-garlic free satvik food requested.',
    baseFare: 138000,
    gstAmount: 6900,
    discountAmount: 2000,
    couponCode: 'DIVINE500',
    totalAmount: 142900,
    advancePaid: 35725,
    balanceDue: 107175,
    paymentMethod: 'Advance Token (25%)',
    paymentStatus: 'Partial (25%)',
    bookingStatus: 'Confirmed',
    assignedGuide: 'Pandit Jagdish Semwal',
    guidePhone: '+91 98971 44520'
  },
  {
    id: 'MTT-2026-VR195',
    createdAt: '2026-04-03T14:40:00Z',
    packageId: 'pkg-kashi-ayodhya-prayag',
    packageTitle: 'Kashi Vishwanath, Ayodhya Ram Mandir & Triveni Sangam',
    packageCategory: 'River Ghats & Shrines',
    departureDate: '2026-04-24',
    boardingPoint: 'Varanasi Babatpur Airport (Arrival Hall)',
    adultCount: 2,
    childCount: 1,
    seniorCount: 0,
    roomType: 'Triple Sharing',
    passengers: [
      { name: 'Siddharth Trivedi', age: 42, gender: 'Male', idType: 'Aadhar Card' },
      { name: 'Bhavna Trivedi', age: 39, gender: 'Female', idType: 'Aadhar Card' },
      { name: 'Ananya Trivedi', age: 11, gender: 'Female', idType: 'Aadhar Card' }
    ],
    contactName: 'Siddharth Trivedi',
    contactEmail: 'siddharth.trivedi@outlook.com',
    contactPhone: '+91 98200 45192',
    emergencyContact: '+91 98190 77312 (Dr. Trivedi - Father)',
    specialRequests: 'Special desire for Mangla Aarti pass in Kashi Vishwanath and Ram Lalla early morning slot in Ayodhya.',
    baseFare: 50700,
    gstAmount: 2535,
    discountAmount: 1500,
    couponCode: 'RAMLALLA',
    totalAmount: 51735,
    advancePaid: 51735,
    balanceDue: 0,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    assignedGuide: 'Shastri Govind Shastri',
    guidePhone: '+91 94501 88921'
  },
  {
    id: 'MTT-2026-SM403',
    createdAt: '2026-04-05T09:20:00Z',
    packageId: 'pkg-somnath-dwarka-jyotirlinga',
    packageTitle: 'Saurashtra Jyotirlinga Special: Somnath, Nageshwar & Dwarkadhish',
    packageCategory: '12 Jyotirlinga',
    departureDate: '2026-05-05',
    boardingPoint: 'Ahmedabad Kalupur Railway Station',
    adultCount: 2,
    childCount: 0,
    seniorCount: 2,
    roomType: 'Twin Sharing',
    passengers: [
      { name: 'Dineshbhai Patel', age: 69, gender: 'Male', idType: 'Aadhar Card', isSenior: true },
      { name: 'Jasumatiben Patel', age: 66, gender: 'Female', idType: 'Aadhar Card', isSenior: true },
      { name: 'Ketan Patel', age: 41, gender: 'Male', idType: 'Aadhar Card' },
      { name: 'Megha Patel', age: 38, gender: 'Female', idType: 'Aadhar Card' }
    ],
    contactName: 'Ketan Patel',
    contactEmail: 'ketan.patel.amd@yahoo.com',
    contactPhone: '+91 98982 77103',
    emergencyContact: '+91 98250 11984',
    specialRequests: 'Pure Jain / Swaminarayan food required (no root vegetables / garlic). Wheelchair assistance needed at Somnath.',
    baseFare: 74000,
    gstAmount: 3700,
    discountAmount: 2000,
    couponCode: 'SENIORBLESSING',
    totalAmount: 75700,
    advancePaid: 75700,
    balanceDue: 0,
    paymentMethod: 'Net Banking',
    paymentStatus: 'Paid',
    bookingStatus: 'Confirmed',
    assignedGuide: 'Bhavesh Vyas (Dwarka Panda)',
    guidePhone: '+91 97241 33201'
  }
];

export const INITIAL_CUSTOM_REQUESTS: CustomYatraRequest[] = [
  {
    id: 'CYR-101',
    createdAt: '2026-04-06T11:00:00Z',
    fullName: 'Mahendra Singhania',
    phone: '+91 98101 44789',
    email: 'm.singhania@groupcorp.in',
    destination: 'Chardham by Helicopter + VIP Darshan',
    preferredMonth: 'June 2026',
    travelDurationDays: 6,
    adultCount: 4,
    seniorCount: 2,
    childCount: 0,
    vehicleType: 'Helicopter Special',
    hotelPreference: 'Heritage / Premium',
    specialRequirements: 'Charter helicopter for 6 family members from Dehradun Sahastradhara helipad. Both parents aged 74 with mobility issues.',
    budgetPerPerson: '₹1,20,000 - ₹1,50,000',
    status: 'Quote Sent'
  },
  {
    id: 'CYR-102',
    createdAt: '2026-04-06T15:30:00Z',
    fullName: 'Anuradha Venkataraman',
    phone: '+91 94440 12893',
    email: 'anuradha.venkat@chennai.edu',
    destination: 'Kashi Vishwanath, Ayodhya, Gaya Pind Daan Circuit',
    preferredMonth: 'July 2026',
    travelDurationDays: 7,
    adultCount: 3,
    seniorCount: 3,
    childCount: 1,
    vehicleType: 'Tempo Traveller (12-Seater)',
    hotelPreference: 'Deluxe (3 Star)',
    specialRequirements: 'Need traditional Vedic priest for Father Pitru Shraddha at Gaya Phalgu river and Kashi Manikarnika Ghat.',
    budgetPerPerson: '₹20,000 - ₹25,000',
    status: 'New'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Shri Babulal & Kanta Agarwal',
    location: 'Surat, Gujarat',
    tourName: 'Chardham Yatra Deluxe',
    rating: 5,
    comment: 'At 71 years of age, going to Kedarnath was my lifelong dream but I was fearful of high altitude. Mahima Tour & Travels made it heavenly. The oxygen cylinder was in the vehicle, driver Bhupender was so careful on the hills, and the satvik Gujarati food in Barkot and Guptkashi felt like home.',
    date: 'October 2025',
    verified: true,
    avatarText: 'BA'
  },
  {
    id: 't-2',
    name: 'Dr. Vivek & Swati Chaturvedi',
    location: 'Lucknow, Uttar Pradesh',
    tourName: 'Ayodhya & Kashi Vishwanath VIP Circuit',
    rating: 5,
    comment: 'The Sugam Darshan assistance in Kashi and the seamless VIP entry for Ram Lalla in Ayodhya saved us hours of standing in queue. Our private priest guided us through the rituals with deep spiritual explanations. Remarkable professionalism!',
    date: 'January 2026',
    verified: true,
    avatarText: 'VC'
  },
  {
    id: 't-3',
    name: 'Rajeshwari Iyer & Family',
    location: 'Bengaluru, Karnataka',
    tourName: 'Saurashtra Jyotirlinga (Somnath & Dwarka)',
    rating: 5,
    comment: 'Traveling with my 78-year-old mother was worry-free because the Mahima team provided wheelchair assistance right up to the sanctum door at Somnath. Truly a blessed and divine journey. Highly recommended for families with elders.',
    date: 'December 2025',
    verified: true,
    avatarText: 'RI'
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'Yatra Preparation',
    question: 'Is biometric registration mandatory for Chardham Yatra 2026?',
    answer: 'Yes, Uttarakhand Tourism requires all pilgrims to undergo official biometric/photometric registration. When you book with Mahima Tour & Travels, our operational desk registers your entire group on the official government portal free of charge and provides your official Yatra E-Pass before boarding.'
  },
  {
    id: 'faq-2',
    category: 'Senior Citizens',
    question: 'What special assistance do you provide for senior citizens and elders?',
    answer: 'We treat our senior pilgrims like revered family members. Every coach carries portable oxygen cylinders and primary medical kits. In advance, our tour managers coordinate pony, palki (doli), or helicopter tickets for difficult ascents. We assign lower berths/ground floor rooms where available and maintain an unhurried, peaceful travel schedule.'
  },
  {
    id: 'faq-3',
    category: 'Meals & Stays',
    question: 'What kind of food is served? Can we get Jain or strictly onion-garlic free food?',
    answer: 'All meals served across our pilgrimage tours are 100% Satvik Pure Vegetarian prepared in hygienic, dedicated kitchens. We gladly provide strictly Jain (no root vegetables, onion, or garlic) meals upon request at zero extra charge. Pure RO filtered drinking water is always ensured.'
  },
  {
    id: 'faq-4',
    category: 'Booking & Payments',
    question: 'Can I confirm my booking by paying only a 25% advance token?',
    answer: 'Yes! To make divine pilgrimages accessible, you can secure your confirmed seats by paying only a 25% advance token through UPI, Net Banking, or Debit/Credit Card. The remaining 75% balance can be cleared upon boarding or reaching your primary hotel on Day 1.'
  },
  {
    id: 'faq-5',
    category: 'Yatra Preparation',
    question: 'What items and clothing should I pack for high-altitude Himalayan tours?',
    answer: 'For Kedarnath and Badrinath, pack thermal inners, a heavy windproof fleece jacket, woolen socks, gloves, a rain poncho/umbrella, comfortable grip trekking shoes, personal prescribed medicines (minimum 15 days quota), and your original government ID card (Aadhar Card or Voter ID).'
  },
  {
    id: 'faq-6',
    category: 'Booking & Payments',
    question: 'What is your cancellation and refund policy if weather changes our plans?',
    answer: 'If roads or passes are closed due to natural landslides or inclement weather, our local tour coordinators reroute itineraries to safe alternative temples without extra tour management fees. For cancellations made 15 days before departure, 90% of the tour token is refunded promptly.'
  }
];
