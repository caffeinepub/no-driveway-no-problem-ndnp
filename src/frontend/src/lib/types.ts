// Placeholder types for features not yet in backend
export interface GarageListing {
  id: bigint;
  owner: string;
  location: string;
  photos: any[];
  tools: string[];
  hourlyRate: bigint;
  dailyRate: bigint;
  rules: string;
  depositRequired: boolean;
  waiverRequired: boolean;
  availability: any[];
  reviews: Review[];
  rating: number | null;
  status: ListingStatus;
}

export interface MechanicProfile {
  id: bigint;
  owner: string;
  name: string;
  contactEmail: string;
  location: string;
  specialization: string[];
  certifications: any;
  insuranceDocs: any;
  photo: any;
  hourlyRate: bigint;
  verificationStatus: Verification;
  availability: any[];
  reviews: Review[];
  rating: number | null;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
  timestamp: bigint;
  approved: boolean;
}

export type Verification = 'verified' | 'pending' | 'rejected';
export type ListingStatus = 'active' | 'pendingReview' | 'rented';

export interface MechanicSearchFilter {
  location?: string;
  specialization?: string;
  minRate?: number;
  maxRate?: number;
  verificationStatus?: Verification;
  sortBy?: 'rating' | 'rate' | 'location';
}

export interface GarageSearchFilter {
  location?: string;
  toolTypes?: string[];
  minHourlyRate?: number;
  maxHourlyRate?: number;
  minDailyRate?: number;
  maxDailyRate?: number;
  depositRequired?: boolean;
  waiverRequired?: boolean;
  sortBy?: 'rating' | 'price' | 'location' | 'availability';
}
