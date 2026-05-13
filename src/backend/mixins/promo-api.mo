import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import PromoTypes "../types/promo";
import PromoLib "../lib/promo";

mixin (
  promos : Map.Map<Text, PromoLib.PromoCode>,
  admins : List.List<Principal>,
) {
  public shared query ({ caller }) func validatePromoCode(code : Text) : async Common.Result<Nat, Text> {
    PromoLib.validate(promos, code)
  };

  public shared ({ caller }) func createPromoCode(input : PromoTypes.PromoInput) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    ignore PromoLib.create(promos, input);
    #ok(true)
  };
};
