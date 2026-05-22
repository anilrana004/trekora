import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";
import AuthLib "../lib/auth";

mixin (admins : List.List<Principal>) {
  public query func getAdminPrincipals() : async [Principal] {
    admins.toArray()
  };

  public shared ({ caller }) func addAdminPrincipal(
    principal : Principal,
  ) : async Common.Result<Bool, Text> {
    AuthLib.addAdmin(admins, caller, principal)
  };
};
