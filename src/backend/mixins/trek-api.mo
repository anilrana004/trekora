import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";
import TrekTypes "../types/trek";
import TrekLib "../lib/trek";

mixin (
  treks : List.List<TrekLib.Trek>,
  trekCounter : Common.Counter,
  admins : List.List<Principal>,
) {
  public query func getTreks() : async [TrekTypes.Trek] {
    TrekLib.getAll(treks)
  };

  public query func getTrekBySlug(slug : Text) : async ?TrekTypes.Trek {
    TrekLib.getBySlug(treks, slug)
  };

  public query func getFeaturedTreks() : async [TrekTypes.Trek] {
    TrekLib.getFeatured(treks)
  };

  public query func getTreksByState(state : Text) : async [TrekTypes.Trek] {
    TrekLib.getByState(treks, state)
  };

  public shared ({ caller }) func createTrek(input : TrekTypes.TrekInput) : async Common.Result<Nat, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    let id = trekCounter.value;
    ignore TrekLib.create(treks, id, input);
    trekCounter.value += 1;
    #ok(id)
  };

  public shared ({ caller }) func updateTrek(id : Nat, input : TrekTypes.TrekInput) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    if (TrekLib.update(treks, id, input)) { #ok(true) }
    else { #err("Trek not found") }
  };

  public shared ({ caller }) func deleteTrek(id : Nat) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    if (TrekLib.remove(treks, id)) { #ok(true) }
    else { #err("Trek not found") }
  };
};
