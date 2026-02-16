import Map "mo:core/Map";
import Set "mo:core/Set";
import Nat "mo:core/Nat";

module {
  type RepairCategory = {
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

  type AssistanceType = {
    #consultation;
    #repairHelp;
    #inspection;
    #emergency;
  };

  type AssistanceStatus = {
    #pending;
    #accepted;
    #completed;
    #cancelled;
    #rejected;
  };

  type RepairCostEstimate = {
    id : Nat;
    user : Principal;
    repairType : RepairCategory;
    vehicleInfo : Text;
    partsCost : Nat;
    laborHours : Float;
    hourlyRate : Nat;
    totalCost : Nat;
    status : { #pending; #completed; #rejected };
  };

  type MechanicAssistanceRequestOld = {
    id : Nat;
    user : Principal;
    bookingId : Nat;
    serviceType : AssistanceType;
    status : AssistanceStatus;
    details : Text;
    timestamp : Int;
  };

  type MechanicAssistanceRequestNew = {
    id : Nat;
    user : Principal;
    bookingId : Nat;
    serviceType : AssistanceType;
    status : AssistanceStatus;
    details : Text;
    timestamp : Int;
    assignedMechanic : ?Principal;
  };

  type OldActor = {
    nextEstimateId : Nat;
    nextAssistanceId : Nat;
    repairEstimates : Map.Map<Nat, RepairCostEstimate>;
    userEstimates : Map.Map<Principal, Set.Set<Nat>>;
    assistanceRequests : Map.Map<Nat, MechanicAssistanceRequestOld>;
    userAssistanceRequests : Map.Map<Principal, Set.Set<Nat>>;
  };

  type NewActor = {
    nextEstimateId : Nat;
    nextAssistanceId : Nat;
    repairEstimates : Map.Map<Nat, RepairCostEstimate>;
    userEstimates : Map.Map<Principal, Set.Set<Nat>>;
    assistanceRequests : Map.Map<Nat, MechanicAssistanceRequestNew>;
    userAssistanceRequests : Map.Map<Principal, Set.Set<Nat>>;
  };

  public func run(old : OldActor) : NewActor {
    let newAssistanceRequests = old.assistanceRequests.map<Nat, MechanicAssistanceRequestOld, MechanicAssistanceRequestNew>(
      func(_, oldRequest) {
        { oldRequest with assignedMechanic = null };
      }
    );
    { old with assistanceRequests = newAssistanceRequests };
  };
};
