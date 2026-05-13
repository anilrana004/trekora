import Common "common";

module {
  public type PromoCode = {
    code : Text;
    discountPercent : Nat;
    maxUses : Nat;
    usedCount : Nat;
    expiresAt : Common.Timestamp;
    isActive : Bool;
  };

  public type PromoInput = {
    code : Text;
    discountPercent : Nat;
    maxUses : Nat;
    expiresAt : Common.Timestamp;
  };
};
