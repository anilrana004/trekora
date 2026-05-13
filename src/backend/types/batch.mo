import Common "common";

module {
  public type TrekBatch = {
    id : Nat;
    trekId : Nat;
    batchDate : Common.Timestamp; // epoch milliseconds
    totalSlots : Nat;
    var availableSlots : Nat;
    priceOverride : ?Nat; // null → use Trek.price
    var isActive : Bool;
  };

  public type TrekBatchPublic = {
    id : Nat;
    trekId : Nat;
    batchDate : Common.Timestamp;
    totalSlots : Nat;
    availableSlots : Nat;
    priceOverride : ?Nat;
    isActive : Bool;
  };

  public type BatchInput = {
    trekId : Nat;
    batchDate : Common.Timestamp;
    totalSlots : Nat;
    priceOverride : ?Nat;
  };

  public type BatchUpdateInput = {
    batchDate : ?Common.Timestamp;
    totalSlots : ?Nat;
    availableSlots : ?Nat;
    priceOverride : ?Nat;
    isActive : ?Bool;
  };
};
