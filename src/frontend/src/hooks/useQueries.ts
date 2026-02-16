import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  RepairCategory,
  AssistanceType,
  AssistanceStatus,
  EstimateStatus,
  UserProfile,
} from '../backend';
import type {
  Transaction,
  Booking,
  BookingType,
  GarageListing,
  MechanicProfile,
  MechanicSearchFilter,
  GarageSearchFilter,
  RevenueData,
  FeeConfiguration,
  MembershipStatus,
} from '../lib/types';
import { Principal } from '@dfinity/principal';

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();

  return useQuery<boolean>({
    queryKey: ['isCallerAdmin'],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Tool Recommendations
export function useGetAllToolRecommendations() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['toolRecommendations'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllToolRecommendations();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetToolRecommendation(category: RepairCategory) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['toolRecommendation', category],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getToolRecommendation(category);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveToolRecommendation() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      category,
      tools,
      consumables,
    }: {
      category: RepairCategory;
      tools: string[];
      consumables: string[];
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveToolRecommendation(category, tools, consumables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['toolRecommendations'] });
    },
  });
}

// Repair Cost Estimates
export function useCreateRepairEstimate() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      repairType,
      vehicleInfo,
      partsCost,
      laborHours,
      hourlyRate,
    }: {
      repairType: RepairCategory;
      vehicleInfo: string;
      partsCost: bigint;
      laborHours: number;
      hourlyRate: bigint;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createRepairEstimate(repairType, vehicleInfo, partsCost, laborHours, hourlyRate);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerEstimates'] });
    },
  });
}

export function useGetCallerRepairEstimates() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['callerEstimates'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerRepairEstimates();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetRepairEstimate(estimateId: bigint) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['estimate', estimateId.toString()],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getRepairEstimate(estimateId);
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateEstimateStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ estimateId, status }: { estimateId: bigint; status: EstimateStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateEstimateStatus(estimateId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerEstimates'] });
      queryClient.invalidateQueries({ queryKey: ['estimate'] });
    },
  });
}

// Mechanic Assistance Requests
export function useCreateAssistanceRequest() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      serviceType,
      details,
    }: {
      bookingId: bigint;
      serviceType: AssistanceType;
      details: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.createAssistanceRequest(bookingId, serviceType, details);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerAssistanceRequests'] });
      queryClient.invalidateQueries({ queryKey: ['allAssistanceRequests'] });
      queryClient.invalidateQueries({ queryKey: ['callerNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
}

export function useGetCallerAssistanceRequests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['callerAssistanceRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCallerAssistanceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllAssistanceRequests() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['allAssistanceRequests'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllAssistanceRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useUpdateAssistanceRequestStatus() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ requestId, status }: { requestId: bigint; status: AssistanceStatus }) => {
      if (!actor) throw new Error('Actor not available');
      return actor.updateAssistanceRequestStatus(requestId, status);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerAssistanceRequests'] });
      queryClient.invalidateQueries({ queryKey: ['allAssistanceRequests'] });
    },
  });
}

// Internal Escrow Ledger - Transactions (backend not yet implemented)
export function useGetCallerTransactions() {
  const { actor, isFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['callerTransactions'],
    queryFn: async () => {
      // Backend method not yet implemented - return empty array
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetAllTransactions() {
  const { actor, isFetching } = useActor();

  return useQuery<Transaction[]>({
    queryKey: ['allTransactions'],
    queryFn: async () => {
      // Backend method not yet implemented - return empty array
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

export function useReleaseFunds() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: bigint) => {
      // Backend method not yet implemented
      console.log('Release funds (backend not implemented):', transactionId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['callerTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['callerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['callerNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
}

export function useRefundTransaction() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (transactionId: bigint) => {
      // Backend method not yet implemented
      console.log('Refund transaction (backend not implemented):', transactionId);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['callerTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['callerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['callerNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
}

// Bookings (backend not yet implemented)
export function useCreateBooking() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingType,
      mechanicId,
      garageId,
      scheduledStart,
      scheduledEnd,
      estimatedPrice,
    }: {
      bookingType: BookingType;
      mechanicId: Principal | null;
      garageId: bigint | null;
      scheduledStart: bigint;
      scheduledEnd: bigint;
      estimatedPrice: bigint;
    }) => {
      // Backend method not yet implemented
      console.log('Create booking (backend not implemented):', {
        bookingType,
        mechanicId,
        garageId,
        scheduledStart,
        scheduledEnd,
        estimatedPrice,
      });
      return Promise.resolve(BigInt(1)); // Return mock booking ID
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerBookings'] });
      queryClient.invalidateQueries({ queryKey: ['callerTransactions'] });
      queryClient.invalidateQueries({ queryKey: ['callerNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
}

export function useGetCallerBookings() {
  const { actor, isFetching } = useActor();

  return useQuery<Booking[]>({
    queryKey: ['callerBookings'],
    queryFn: async () => {
      // Backend method not yet implemented - return empty array
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

// Disputes (backend not yet implemented)
export function useCreateDispute() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, reason }: { bookingId: bigint; reason: string }) => {
      // Backend method not yet implemented
      console.log('Create dispute (backend not implemented):', bookingId, reason);
      return Promise.resolve(BigInt(1)); // Return mock dispute ID
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerDisputes'] });
      queryClient.invalidateQueries({ queryKey: ['callerNotifications'] });
      queryClient.invalidateQueries({ queryKey: ['unreadNotificationCount'] });
    },
  });
}

export function useGetCallerDisputes() {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['callerDisputes'],
    queryFn: async () => {
      // Backend method not yet implemented - return empty array
      return [];
    },
    enabled: !!actor && !isFetching,
  });
}

// Placeholder hooks for features without backend support yet
export function useSubmitIdentityVerification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (document: File) => {
      // Placeholder - backend capability not yet available
      console.log('Identity verification submitted:', document.name);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['identityVerificationStatus'] });
    },
  });
}

export function useGetIdentityVerificationStatus() {
  return useQuery({
    queryKey: ['identityVerificationStatus'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return null;
    },
  });
}

export function useGetVerificationQueue() {
  return useQuery({
    queryKey: ['verificationQueue'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useUpdateVerificationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, status, note }: { userId: string; status: string; note?: string }) => {
      // Placeholder - backend capability not yet available
      console.log('Verification status updated:', userId, status, note);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['verificationQueue'] });
    },
  });
}

export function useGetInsuranceDocuments() {
  return useQuery({
    queryKey: ['insuranceDocuments'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useUpdateInsuranceStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ userId, status, note }: { userId: string; status: string; note?: string }) => {
      // Placeholder - backend capability not yet available
      console.log('Insurance status updated:', userId, status, note);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insuranceDocuments'] });
    },
  });
}

// Placeholder hooks for marketplace features
export function useSearchMechanics(filters?: MechanicSearchFilter) {
  return useQuery<MechanicProfile[]>({
    queryKey: ['mechanics', filters],
    queryFn: async () => {
      // Backend not yet implemented
      console.log('Search mechanics with filters:', filters);
      return [];
    },
  });
}

export function useSearchGarages(filters?: GarageSearchFilter) {
  return useQuery<GarageListing[]>({
    queryKey: ['garages', filters],
    queryFn: async () => {
      // Backend not yet implemented
      console.log('Search garages with filters:', filters);
      return [];
    },
  });
}

export function useGetGarage(garageId: string) {
  return useQuery<GarageListing | null>({
    queryKey: ['garage', garageId],
    queryFn: async () => {
      // Backend not yet implemented
      console.log('Get garage:', garageId);
      return null;
    },
  });
}

export function useGetMechanicsByOwner() {
  return useQuery<MechanicProfile[]>({
    queryKey: ['mechanicsByOwner'],
    queryFn: async () => {
      // Backend not yet implemented
      return [];
    },
  });
}

export function useGetGaragesByOwner() {
  return useQuery<GarageListing[]>({
    queryKey: ['garagesByOwner'],
    queryFn: async () => {
      // Backend not yet implemented
      return [];
    },
  });
}

export function useGetMembershipStatus() {
  return useQuery<MembershipStatus | null>({
    queryKey: ['membershipStatus'],
    queryFn: async () => {
      // Backend not yet implemented
      return null;
    },
  });
}

export function useGetRevenueData() {
  return useQuery<RevenueData | null>({
    queryKey: ['revenueData'],
    queryFn: async () => {
      // Backend not yet implemented
      return null;
    },
  });
}

export function useGetFeeConfiguration() {
  return useQuery<FeeConfiguration | null>({
    queryKey: ['feeConfiguration'],
    queryFn: async () => {
      // Backend not yet implemented
      return null;
    },
  });
}
