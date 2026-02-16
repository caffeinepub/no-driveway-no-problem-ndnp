import type { Principal } from '@dfinity/principal';

// Placeholder TypeScript types for features not yet available in backend
export type Verification = 'verified' | 'pending' | 'rejected';

export interface GarageListing {
  id: number;
  owner: string;
  location: string;
  photos: string[];
  tools: string[];
  hourlyRate: number;
  dailyRate: number;
  rules: string;
  depositRequired: boolean;
  waiverRequired: boolean;
  availability: Date[];
  reviews: Review[];
  rating?: number;
  status: 'active' | 'pendingReview' | 'rented';
}

export interface MechanicProfile {
  id: number;
  owner: string;
  name: string;
  contactEmail: string;
  location: string;
  specialization: string[];
  certifications?: string;
  insuranceDocs?: string;
  photo?: string;
  hourlyRate: number;
  verificationStatus: Verification;
  availability: Date[];
  reviews: Review[];
  rating?: number;
}

export interface Review {
  reviewer: string;
  rating: number;
  comment: string;
  timestamp: Date;
  approved: boolean;
}

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

// Internal Escrow Ledger Types (backend not yet implemented)
export enum TransactionStatus {
  pending = 'pending',
  held = 'held',
  released = 'released',
  refunded = 'refunded',
  disputed = 'disputed',
}

export enum TransactionProvider {
  internalLedger = 'internalLedger',
  stripe = 'stripe',
  other = 'other',
}

export enum BookingStatus {
  requested = 'requested',
  confirmed = 'confirmed',
  inProgress = 'inProgress',
  completed = 'completed',
  cancelled = 'cancelled',
  disputed = 'disputed',
}

export enum BookingType {
  mechanicService = 'mechanicService',
  garageRental = 'garageRental',
  combined = 'combined',
}

export interface Transaction {
  id: bigint;
  bookingId: bigint;
  payerId: Principal;
  payeeId: Principal;
  amount: bigint;
  platformFee: bigint;
  provider: TransactionProvider;
  providerReferenceId?: string;
  status: TransactionStatus;
  createdAt: bigint;
  updatedAt: bigint;
}

export interface Booking {
  id: bigint;
  customerId: Principal;
  mechanicId?: Principal;
  garageId?: bigint;
  bookingType: BookingType;
  status: BookingStatus;
  scheduledStart: bigint;
  scheduledEnd: bigint;
  estimatedPrice: bigint;
  finalPrice: bigint;
  createdAt: bigint;
  updatedAt: bigint;
}

export enum NotificationType {
  bookingCreated = 'bookingCreated',
  bookingConfirmed = 'bookingConfirmed',
  fundsReleased = 'fundsReleased',
  disputeOpened = 'disputeOpened',
  accountSuspended = 'accountSuspended',
}

export interface Notification {
  id: bigint;
  userId: Principal;
  type: NotificationType;
  referenceId: bigint;
  read: boolean;
  createdAt: bigint;
}

export interface RevenueData {
  totalRevenue: number;
  mechanicCommissions: number;
  garageCommissions: number;
  featuredBoosts: number;
}

export interface FeeConfiguration {
  mechanicBookingCommission: number;
  garageRentalCommission: number;
  featuredBoostFee: number;
  emergencySurgeMultiplier: number;
}

export interface MembershipStatus {
  type: 'pro' | 'diy' | null;
  status: 'active' | 'pending' | 'cancelled';
  startDate?: Date;
  endDate?: Date;
}
