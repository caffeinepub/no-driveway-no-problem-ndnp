import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface MechanicAssistanceRequest {
    id: bigint;
    status: AssistanceStatus;
    serviceType: AssistanceType;
    bookingId: bigint;
    user: Principal;
    timestamp: Time;
    details: string;
    assignedMechanic?: Principal;
}
export interface ToolRecommendation {
    tools: Array<string>;
    consumables: Array<string>;
    category: RepairCategory;
}
export type RepairCategory = {
    __kind__: "brakeJob";
    brakeJob: null;
} | {
    __kind__: "other";
    other: string;
} | {
    __kind__: "oilChange";
    oilChange: null;
} | {
    __kind__: "coolingSystem";
    coolingSystem: null;
} | {
    __kind__: "engineMaintenance";
    engineMaintenance: null;
} | {
    __kind__: "transmission";
    transmission: null;
} | {
    __kind__: "suspension";
    suspension: null;
} | {
    __kind__: "electrical";
    electrical: null;
} | {
    __kind__: "diagnostics";
    diagnostics: null;
};
export interface RepairCostEstimate {
    id: bigint;
    status: EstimateStatus;
    vehicleInfo: string;
    partsCost: bigint;
    laborHours: number;
    user: Principal;
    hourlyRate: bigint;
    totalCost: bigint;
    repairType: RepairCategory;
}
export interface UserProfile {
    name: string;
    email: string;
    roles: Array<Role>;
}
export enum AssistanceStatus {
    cancelled = "cancelled",
    pending = "pending",
    completed = "completed",
    rejected = "rejected",
    accepted = "accepted"
}
export enum AssistanceType {
    inspection = "inspection",
    emergency = "emergency",
    repairHelp = "repairHelp",
    consultation = "consultation"
}
export enum EstimateStatus {
    pending = "pending",
    completed = "completed",
    rejected = "rejected"
}
export enum Role {
    admin = "admin",
    customer = "customer",
    garageOwner = "garageOwner",
    mechanic = "mechanic"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    acceptAssistanceRequest(requestId: bigint): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createAssistanceRequest(bookingId: bigint, serviceType: AssistanceType, details: string): Promise<bigint>;
    createRepairEstimate(repairType: RepairCategory, vehicleInfo: string, partsCost: bigint, laborHours: number, hourlyRate: bigint): Promise<bigint>;
    getAllAssistanceRequests(): Promise<Array<MechanicAssistanceRequest>>;
    getAllToolRecommendations(): Promise<Array<ToolRecommendation>>;
    getAssistanceRequest(requestId: bigint): Promise<MechanicAssistanceRequest | null>;
    getCallerAssistanceRequests(): Promise<Array<MechanicAssistanceRequest>>;
    getCallerRepairEstimates(): Promise<Array<RepairCostEstimate>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getRepairEstimate(estimateId: bigint): Promise<RepairCostEstimate | null>;
    getToolRecommendation(category: RepairCategory): Promise<ToolRecommendation | null>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    saveToolRecommendation(category: RepairCategory, tools: Array<string>, consumables: Array<string>): Promise<void>;
    updateAssistanceRequestStatus(requestId: bigint, status: AssistanceStatus): Promise<void>;
    updateEstimateStatus(estimateId: bigint, status: EstimateStatus): Promise<void>;
}
