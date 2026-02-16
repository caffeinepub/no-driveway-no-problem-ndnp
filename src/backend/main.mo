import Set "mo:core/Set";
import List "mo:core/List";
import Map "mo:core/Map";
import Array "mo:core/Array";
import Order "mo:core/Order";
import Time "mo:core/Time";
import Text "mo:core/Text";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Float "mo:core/Float";
import Int "mo:core/Int";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import AccessControl "authorization/access-control";
import ExternalBlob "blob-storage/Storage";

actor {
  // Authorization
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  public type ToolRecommendation = {
    category : RepairCategory;
    tools : [Text];
    consumables : [Text];
  };

  public type RepairCategory = {
    #oilChange;
    #brakeJob;
    #suspension;
    #engineMaintenance;
    #transmission;
    #electrical;
    #diagnostics;
    #coolingSystem;
    #other : Text;
  };

  public type RepairCostEstimate = {
    id : Nat;
    user : Principal;
    repairType : RepairCategory;
    vehicleInfo : Text;
    partsCost : Nat;
    laborHours : Float;
    hourlyRate : Nat;
    totalCost : Nat;
    status : EstimateStatus;
  };

  public type EstimateStatus = { #pending; #completed; #rejected };

  public type MechanicAssistanceRequest = {
    id : Nat;
    user : Principal;
    bookingId : Nat;
    serviceType : AssistanceType;
    status : AssistanceStatus;
    details : Text;
    timestamp : Time.Time;
  };

  public type AssistanceType = {
    #consultation;
    #repairHelp;
    #inspection;
    #emergency;
  };

  public type AssistanceStatus = {
    #pending;
    #accepted;
    #completed;
    #cancelled;
    #rejected;
  };

  public type UserVerification = {
    user : Principal;
    document : ExternalBlob.ExternalBlob;
    status : VerificationStatus;
    timestamp : Time.Time;
    adminNote : ?Text;
  };

  public type VerificationStatus = { #pending; #verified; #rejected };

  public type InsuranceDocument = {
    owner : Principal;
    document : ExternalBlob.ExternalBlob;
    status : InsuranceStatus;
    timestamp : Time.Time;
    adminNote : ?Text;
  };

  public type InsuranceStatus = { #valid; #expired; #pending; #rejected };

  public type Waiver = {
    user : Principal;
    bookingId : Nat;
    signedDoc : ExternalBlob.ExternalBlob;
    timestamp : Time.Time;
  };

  public type Dispute = {
    id : Nat;
    bookingId : Nat;
    parties : [Principal];
    status : DisputeStatus;
    resolution : ?Text;
    comments : [DisputeComment];
  };

  public type DisputeStatus = { #open; #resolved; #escalated };
  public type DisputeComment = {
    author : Principal;
    text : Text;
    timestamp : Time.Time;
  };

  public type RevenueModel = {
    mechanicBookingCommission : Nat;
    garageRentalCommission : Nat;
    featuredBoostFee : Nat;
    emergencySurgeMultiplier : Float;
  };

  public type Membership = {
    user : Principal;
    membershipType : MembershipType;
    status : MembershipStatus;
    startTimestamp : Time.Time;
    endTimestamp : ?Time.Time;
  };

  public type MembershipType = { #pro; #diy };
  public type MembershipStatus = { #active; #pending; #cancelled };

  public type NoShowPenalty = {
    user : Principal;
    reason : Text;
    penaltyPoints : Nat;
    timestamp : Time.Time;
    resolved : Bool;
  };

  public type MechanicProfile = {
    id : Nat;
    owner : Principal;
    name : Text;
    contactEmail : Text;
    location : Text;
    specialization : [Text];
    certifications : ?ExternalBlob.ExternalBlob;
    insuranceDocs : ?ExternalBlob.ExternalBlob;
    photo : ?ExternalBlob.ExternalBlob;
    hourlyRate : Nat;
    verificationStatus : Verification;
    availability : [Time.Time];
    reviews : [Review];
    rating : ?Float;
  };

  public type GarageListing = {
    id : Nat;
    owner : Principal;
    location : Text;
    photos : [ExternalBlob.ExternalBlob];
    tools : [Text];
    hourlyRate : Nat;
    dailyRate : Nat;
    rules : Text;
    depositRequired : Bool;
    waiverRequired : Bool;
    availability : [Time.Time];
    reviews : [Review];
    rating : ?Float;
    status : ListingStatus;
  };

  public type ListingStatus = { #active; #pendingReview; #rented };
  public type Verification = { #verified; #pending; #rejected };

  public type Review = {
    reviewer : Principal;
    rating : Nat8;
    comment : Text;
    timestamp : Time.Time;
    approved : Bool;
  };

  public type Role = {
    #customer;
    #mechanic;
    #garageOwner;
    #admin;
  };

  public type UserProfile = {
    name : Text;
    email : Text;
    roles : [Role];
  };

  public type MechanicSearchFilter = {
    location : ?Text;
    specialization : ?Text;
    minRate : ?Nat;
    maxRate : ?Nat;
    verificationStatus : ?Verification;
    sortBy : ?MechanicSortCriteria;
  };

  public type MechanicSortCriteria = { #rating; #rate; #location };

  public type GarageSearchFilter = {
    location : ?Text;
    toolTypes : ?[Text];
    minHourlyRate : ?Nat;
    maxHourlyRate : ?Nat;
    minDailyRate : ?Nat;
    maxDailyRate : ?Nat;
    depositRequired : ?Bool;
    waiverRequired : ?Bool;
    sortBy : ?GarageSortCriteria;
  };

  public type GarageSortCriteria = { #rating; #price; #location; #availability };

  var nextMechanicId = 0;
  var nextGarageId = 0;
  var nextEstimateId = 0;
  var nextAssistanceId = 0;
  var nextDisputeId = 0;

  let mechanics = Map.empty<Nat, MechanicProfile>();
  let garages = Map.empty<Nat, GarageListing>();
  let mechanicOwners = Map.empty<Principal, Set.Set<Nat>>();
  let garageOwners = Map.empty<Principal, Set.Set<Nat>>();
  let userProfiles = Map.empty<Principal, UserProfile>();
  let toolRecommendations = Map.empty<Text, ToolRecommendation>();
  let repairEstimates = Map.empty<Nat, RepairCostEstimate>();
  let userEstimates = Map.empty<Principal, Set.Set<Nat>>();
  let assistanceRequests = Map.empty<Nat, MechanicAssistanceRequest>();
  let userAssistanceRequests = Map.empty<Principal, Set.Set<Nat>>();
  let userVerifications = Map.empty<Principal, UserVerification>();
  let insuranceDocs = Map.empty<Principal, InsuranceDocument>();
  let waivers = Map.empty<(Principal, Nat), Waiver>();
  let disputes = Map.empty<Nat, Dispute>();
  let revenueModel = Map.empty<Principal, RevenueModel>();
  let memberships = Map.empty<Principal, Membership>();
  let noShowPenalties = Map.empty<Principal, NoShowPenalty>();

  module MechanicProfile {
    public func compareByRate(a : MechanicProfile, b : MechanicProfile) : Order.Order {
      Nat.compare(a.hourlyRate, b.hourlyRate);
    };
  };

  module GarageListing {
    public func compareByPrice(a : GarageListing, b : GarageListing) : Order.Order {
      Nat.compare(a.hourlyRate, b.hourlyRate);
    };
  };

  // Helper function to check if user has specific application role
  private func hasRole(caller : Principal, role : Role) : Bool {
    switch (userProfiles.get(caller)) {
      case (null) { false };
      case (?profile) {
        profile.roles.any(func(r) { r == role });
      };
    };
  };

  // Helper to check if caller is party to a dispute
  private func isDisputeParty(caller : Principal, dispute : Dispute) : Bool {
    dispute.parties.any(func(p) { p == caller });
  };

  // User Profile Management
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  // DIY Support - Tool Recommendations
  public shared ({ caller }) func saveToolRecommendation(category : RepairCategory, tools : [Text], consumables : [Text]) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can save tool recommendations");
    };

    let categoryKey = switch (category) {
      case (#oilChange) { "oil_change" };
      case (#brakeJob) { "brake_job" };
      case (#suspension) { "suspension" };
      case (#engineMaintenance) { "engine_maintenance" };
      case (#transmission) { "transmission" };
      case (#electrical) { "electrical" };
      case (#diagnostics) { "diagnostics" };
      case (#coolingSystem) { "cooling_system" };
      case (#other(val)) { "other:" # val };
    };

    let recommendation : ToolRecommendation = {
      category;
      tools;
      consumables;
    };
    toolRecommendations.add(categoryKey, recommendation);
  };

  public query ({ caller }) func getToolRecommendation(category : RepairCategory) : async ?ToolRecommendation {
    let categoryKey = switch (category) {
      case (#oilChange) { "oil_change" };
      case (#brakeJob) { "brake_job" };
      case (#suspension) { "suspension" };
      case (#engineMaintenance) { "engine_maintenance" };
      case (#transmission) { "transmission" };
      case (#electrical) { "electrical" };
      case (#diagnostics) { "diagnostics" };
      case (#coolingSystem) { "cooling_system" };
      case (#other(val)) { "other:" # val };
    };
    toolRecommendations.get(categoryKey);
  };

  public query ({ caller }) func getAllToolRecommendations() : async [ToolRecommendation] {
    toolRecommendations.values().toArray();
  };

  // DIY Support - Repair Cost Estimator
  public shared ({ caller }) func createRepairEstimate(repairType : RepairCategory, vehicleInfo : Text, partsCost : Nat, laborHours : Float, hourlyRate : Nat) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create estimates");
    };

    let estimateId = nextEstimateId;
    nextEstimateId += 1;

    let totalCost = partsCost + (laborHours * hourlyRate.toFloat()).toInt().toNat();

    let estimate : RepairCostEstimate = {
      id = estimateId;
      user = caller;
      repairType;
      vehicleInfo;
      partsCost;
      laborHours;
      hourlyRate;
      totalCost;
      status = #pending;
    };

    repairEstimates.add(estimateId, estimate);

    let userEstimateSet = switch (userEstimates.get(caller)) {
      case (?set) { set };
      case (null) { Set.empty<Nat>() };
    };
    userEstimateSet.add(estimateId);
    userEstimates.add(caller, userEstimateSet);

    estimateId;
  };

  public query ({ caller }) func getRepairEstimate(estimateId : Nat) : async ?RepairCostEstimate {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view estimates");
    };

    switch (repairEstimates.get(estimateId)) {
      case (null) { null };
      case (?estimate) {
        if (estimate.user != caller and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own estimates");
        };
        ?estimate;
      };
    };
  };

  public query ({ caller }) func getCallerRepairEstimates() : async [RepairCostEstimate] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view estimates");
    };

    switch (userEstimates.get(caller)) {
      case (null) { [] };
      case (?set) {
        let filtered = set.values().toArray().map(func(id) { repairEstimates.get(id) });
        let nonNullValues = filtered.filter(func(opt) { opt != null });
        nonNullValues.map(func(opt) { switch (opt) { case (?val) { val }; case (null) { Runtime.trap("Unexpected null value") } } });
      };
    };
  };

  public shared ({ caller }) func updateEstimateStatus(estimateId : Nat, status : EstimateStatus) : async () {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can update estimate status");
    };

    switch (repairEstimates.get(estimateId)) {
      case (null) { Runtime.trap("Estimate not found") };
      case (?estimate) {
        repairEstimates.add(
          estimateId,
          {
            id = estimate.id;
            user = estimate.user;
            repairType = estimate.repairType;
            vehicleInfo = estimate.vehicleInfo;
            partsCost = estimate.partsCost;
            laborHours = estimate.laborHours;
            hourlyRate = estimate.hourlyRate;
            totalCost = estimate.totalCost;
            status;
          },
        );
      };
    };
  };

  // Mechanic Assistance Requests
  public shared ({ caller }) func createAssistanceRequest(bookingId : Nat, serviceType : AssistanceType, details : Text) : async Nat {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create assistance requests");
    };

    let requestId = nextAssistanceId;
    nextAssistanceId += 1;

    let request : MechanicAssistanceRequest = {
      id = requestId;
      user = caller;
      bookingId;
      serviceType;
      status = #pending;
      details;
      timestamp = Time.now();
    };

    assistanceRequests.add(requestId, request);

    let userRequestSet = switch (userAssistanceRequests.get(caller)) {
      case (?set) { set };
      case (null) { Set.empty<Nat>() };
    };
    userRequestSet.add(requestId);
    userAssistanceRequests.add(caller, userRequestSet);

    requestId;
  };

  public query ({ caller }) func getAssistanceRequest(requestId : Nat) : async ?MechanicAssistanceRequest {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view assistance requests");
    };

    switch (assistanceRequests.get(requestId)) {
      case (null) { null };
      case (?request) {
        if (request.user != caller and not hasRole(caller, #mechanic) and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own requests or if you are a mechanic/admin");
        };
        ?request;
      };
    };
  };

  public query ({ caller }) func getCallerAssistanceRequests() : async [MechanicAssistanceRequest] {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view assistance requests");
    };

    switch (userAssistanceRequests.get(caller)) {
      case (null) { [] };
      case (?set) {
        let filtered = set.values().toArray().map(func(id) { assistanceRequests.get(id) });
        let nonNullValues = filtered.filter(func(opt) { opt != null });
        nonNullValues.map(func(opt) { switch (opt) { case (?val) { val }; case (null) { Runtime.trap("Unexpected null value") } } });
      };
    };
  };

  public query ({ caller }) func getAllAssistanceRequests() : async [MechanicAssistanceRequest] {
    if (not hasRole(caller, #mechanic) and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Only mechanics and admins can view all requests");
    };

    assistanceRequests.values().toArray();
  };

  public shared ({ caller }) func updateAssistanceRequestStatus(requestId : Nat, status : AssistanceStatus) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can update assistance requests");
    };

    switch (assistanceRequests.get(requestId)) {
      case (null) { Runtime.trap("Request not found") };
      case (?request) {
        // Owner can cancel, mechanics can accept/complete/reject, admins can do anything
        let canUpdate = (request.user == caller and (status == #cancelled)) or
                        (hasRole(caller, #mechanic) and (status == #accepted or status == #completed or status == #rejected)) or
                        AccessControl.isAdmin(accessControlState, caller);

        if (not canUpdate) {
          Runtime.trap("Unauthorized: Insufficient permissions to update this request");
        };

        assistanceRequests.add(
          requestId,
          {
            id = request.id;
            user = request.user;
            bookingId = request.bookingId;
            serviceType = request.serviceType;
            status;
            details = request.details;
            timestamp = request.timestamp;
          },
        );
      };
    };
  };
};
