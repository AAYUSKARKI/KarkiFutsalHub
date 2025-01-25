// Mock data for the futsal management system

export interface Court {
  id: string;
  name: string;
  hourlyRate: number;
  features: string[];
  image: string;
}

export interface TimeSlot {
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  customerName: string;
  phoneNumber: string;
  date: string;
  startTime: string;
  duration: number;
  totalAmount: number;
  isPaid: boolean;
  creditsEarned: number;
  creditsUsed: number;
  createdAt: string;
}

export interface User {
  id: string;
  name: string;
  phoneNumber: string;
  totalCredits: number;
  membershipLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  bookingsCount: number;
}

export const CREDIT_PER_BOOKING = 100;
export const CREDITS_FOR_ONE_HOUR = 10000;
export const MEMBERSHIP_TIERS = {
  Bronze: { minBookings: 0, creditMultiplier: 1 },
  Silver: { minBookings: 5, creditMultiplier: 1.2 },
  Gold: { minBookings: 10, creditMultiplier: 1.5 },
  Platinum: { minBookings: 20, creditMultiplier: 2 }
};

export const court: Court = {
  id: 'karki-court',
  name: 'Karki Futsal Hub',
  hourlyRate: 1200,
  features: [
    'FIFA Approved Turf',
    'Professional Lighting',
    'Digital Scoreboard',
    'Clean Changing Rooms',
    'Covered Seating Area',
    'First Aid Facilities'
  ],
  image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80'
};

// Mock user data for demonstration
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  phoneNumber: '9876543210',
  totalCredits: 5500,
  membershipLevel: 'Silver',
  bookingsCount: 8
};

export const generateTimeSlots = (date: string): TimeSlot[] => {
  const slots: TimeSlot[] = [];
  // Generate slots from 6 AM to 10 PM
  for (let hour = 6; hour <= 22; hour++) {
    // Randomly mark some slots as unavailable for demo
    const available = Math.random() > 0.3;
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available
    });
  }
  return slots;
};