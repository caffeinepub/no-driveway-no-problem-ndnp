import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type {
  RepairCategory,
  AssistanceType,
  AssistanceStatus,
  EstimateStatus,
  UserProfile,
} from '../backend';

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

export function useGetWaiverRecords() {
  return useQuery({
    queryKey: ['waiverRecords'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useCreateDispute() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookingId,
      category,
      description,
    }: {
      bookingId: string;
      category: string;
      description: string;
    }) => {
      // Placeholder - backend capability not yet available
      console.log('Dispute created:', bookingId, category, description);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['callerDisputes'] });
    },
  });
}

export function useGetCallerDisputes() {
  return useQuery({
    queryKey: ['callerDisputes'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useGetAllDisputes() {
  return useQuery({
    queryKey: ['allDisputes'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useUpdateDisputeStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      disputeId,
      status,
      resolution,
    }: {
      disputeId: string;
      status: string;
      resolution?: string;
    }) => {
      // Placeholder - backend capability not yet available
      console.log('Dispute status updated:', disputeId, status, resolution);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allDisputes'] });
      queryClient.invalidateQueries({ queryKey: ['callerDisputes'] });
    },
  });
}

export function useGetRevenueData() {
  return useQuery({
    queryKey: ['revenueData'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return {
        totalRevenue: 0,
        mechanicCommissions: 0,
        garageCommissions: 0,
        featuredBoosts: 0,
      };
    },
  });
}

export function useGetFeeConfiguration() {
  return useQuery({
    queryKey: ['feeConfiguration'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return {
        mechanicBookingCommission: 20,
        garageRentalCommission: 15,
        featuredBoostFee: 50,
        emergencySurgeMultiplier: 1.5,
      };
    },
  });
}

export function useUpdateFeeConfiguration() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (config: any) => {
      // Placeholder - backend capability not yet available
      console.log('Fee configuration updated:', config);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['feeConfiguration'] });
    },
  });
}

export function useGetMembershipStatus() {
  return useQuery({
    queryKey: ['membershipStatus'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return null;
    },
  });
}

export function useUpdateMembershipStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ type, active }: { type: string; active: boolean }) => {
      // Placeholder - backend capability not yet available
      console.log('Membership status updated:', type, active);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['membershipStatus'] });
    },
  });
}

export function useGetWaitlist() {
  return useQuery({
    queryKey: ['waitlist'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useAddToWaitlist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ email, location }: { email: string; location: string }) => {
      // Placeholder - backend capability not yet available
      console.log('Added to waitlist:', email, location);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
    },
  });
}

export function useUpdateWaitlistStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      // Placeholder - backend capability not yet available
      console.log('Waitlist status updated:', id, status);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['waitlist'] });
    },
  });
}

export function useGetDemandData() {
  return useQuery({
    queryKey: ['demandData'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useGetNoShowPenalties() {
  return useQuery({
    queryKey: ['noShowPenalties'],
    queryFn: async () => {
      // Placeholder - backend capability not yet available
      return [];
    },
  });
}

export function useMarkNoShow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookingId, reason }: { bookingId: string; reason: string }) => {
      // Placeholder - backend capability not yet available
      console.log('Marked as no-show:', bookingId, reason);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['noShowPenalties'] });
    },
  });
}

// Existing hooks (keeping for compatibility)
export function useGetMechanicsByOwner() {
  return useQuery({
    queryKey: ['mechanicsByOwner'],
    queryFn: async () => {
      return [];
    },
  });
}

export function useSearchMechanics(filters: any) {
  return useQuery({
    queryKey: ['mechanics', filters],
    queryFn: async () => {
      return [];
    },
  });
}

export function useGetGaragesByOwner() {
  return useQuery({
    queryKey: ['garagesByOwner'],
    queryFn: async () => {
      return [];
    },
  });
}

export function useSearchGarages(filters: any) {
  return useQuery({
    queryKey: ['garages', filters],
    queryFn: async () => {
      return [];
    },
  });
}

export function useGetGarage(id: bigint) {
  return useQuery({
    queryKey: ['garage', id.toString()],
    queryFn: async () => {
      return null;
    },
  });
}
