import Map "mo:core/Map";
import Principal "mo:core/Principal";
import Common "../types/common";
import UserTypes "../types/user";
import UserLib "../lib/user";

mixin (profiles : Map.Map<Principal, UserLib.UserProfile>) {
  public shared ({ caller }) func saveProfile(input : UserTypes.ProfileInput) : async Common.Result<Bool, Text> {
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    UserLib.save(profiles, caller, input)
  };

  public shared query ({ caller }) func getProfile() : async ?UserTypes.UserProfile {
    UserLib.get(profiles, caller)
  };

  public shared ({ caller }) func addWalletBalance(
    p : Principal,
    amount : Nat,
  ) : async Common.Result<UserTypes.UserProfile, Text> {
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    UserLib.addWalletBalance(profiles, p, amount)
  };

  public shared ({ caller }) func processReferral(
    referralCode : Text,
  ) : async Common.Result<(), Text> {
    if (caller.isAnonymous()) {
      return #err("Must be authenticated");
    };
    UserLib.processReferral(profiles, caller, referralCode)
  };

  public query func getUserByReferralCode(
    code : Text,
  ) : async ?UserTypes.UserProfile {
    UserLib.getUserByReferralCode(profiles, code)
  };
};
