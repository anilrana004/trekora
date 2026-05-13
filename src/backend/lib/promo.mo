import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import PromoTypes "../types/promo";

module {
  public type PromoCode = PromoTypes.PromoCode;
  public type PromoInput = PromoTypes.PromoInput;

  public func validate(
    promos : Map.Map<Text, PromoCode>,
    code : Text,
  ) : Common.Result<Nat, Text> {
    switch (promos.get(code)) {
      case null { #err("Invalid promo code") };
      case (?p) {
        if (not p.isActive) { return #err("Promo code is inactive") };
        if (p.usedCount >= p.maxUses) { return #err("Promo code usage limit reached") };
        if (Time.now() > p.expiresAt) { return #err("Promo code has expired") };
        #ok(p.discountPercent)
      };
    }
  };

  public func create(promos : Map.Map<Text, PromoCode>, input : PromoInput) : PromoCode {
    let promo : PromoCode = {
      code = input.code;
      discountPercent = input.discountPercent;
      maxUses = input.maxUses;
      usedCount = 0;
      expiresAt = input.expiresAt;
      isActive = true;
    };
    promos.add(input.code, promo);
    promo
  };

  public func redeem(promos : Map.Map<Text, PromoCode>, code : Text) : Bool {
    switch (promos.get(code)) {
      case null { false };
      case (?p) {
        promos.add(code, { p with usedCount = p.usedCount + 1 });
        true
      };
    }
  };
};
