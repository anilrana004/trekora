import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";

module {
  public func isAdmin(admins : List.List<Principal>, caller : Principal) : Bool {
    admins.contains(caller)
  };

  /// First caller may add only themselves when the admin list is empty (one-time bootstrap).
  public func addAdmin(
    admins : List.List<Principal>,
    caller : Principal,
    newAdmin : Principal,
  ) : Common.Result<Bool, Text> {
    if (admins.contains(newAdmin)) {
      return #err("Principal is already an admin");
    };

    if (admins.size() == 0) {
      if (not Principal.equal(caller, newAdmin)) {
        return #err(
          "Bootstrap: the first admin must be your own Internet Identity principal",
        );
      };
      admins.add(newAdmin);
      return #ok(true);
    };

    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };

    admins.add(newAdmin);
    #ok(true)
  };
};
