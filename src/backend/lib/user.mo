import Map "mo:core/Map";
import Time "mo:core/Time";
import Principal "mo:core/Principal";
import Text "mo:core/Text";
import Nat "mo:core/Nat";
import Common "../types/common";
import UserTypes "../types/user";
import Nat32 "mo:core/Nat32";

module {
  public type UserProfile = UserTypes.UserProfile;
  public type ProfileInput = UserTypes.ProfileInput;

  // Deterministic 8-char alphanumeric referral code from principal text
  public func generateReferralCode(p : Principal) : Text {
    let raw = p.toText();
    let chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let charsArr = chars.toArray();
    let len = charsArr.size(); // 32
    var code = "";
    var hash : Nat = 5381;
    for (c in raw.toIter()) {
      let codePoint = Char.toNat32(c).toNat();
      hash := (hash * 33 + codePoint) % 0xFFFFFFFF;
    };
    var i = 0;
    while (i < 8) {
      let idx = hash % len;
      code := code # Text.fromChar(charsArr[idx]);
      hash := (hash * 1103515245 + 12345) % 0xFFFFFFFF;
      i += 1;
    };
    code
  };

  public func save(
    profiles : Map.Map<Principal, UserProfile>,
    caller : Principal,
    input : ProfileInput,
  ) : Common.Result<Bool, Text> {
    let existing = profiles.get(caller);
    let (createdAt, referralCode, walletBalance, referredBy, joinedAt) = switch (existing) {
      case (?p) { (p.createdAt, p.referralCode, p.walletBalance, p.referredBy, p.joinedAt) };
      case null {
        let now = Time.now();
        (now, generateReferralCode(caller), 0, null, now)
      };
    };
    let profile : UserProfile = {
      principal = caller;
      name = input.name;
      email = input.email;
      phone = input.phone;
      bloodGroup = input.bloodGroup;
      medicalConditions = input.medicalConditions;
      experience = input.experience;
      createdAt = createdAt;
      referralCode = referralCode;
      walletBalance = walletBalance;
      referredBy = referredBy;
      joinedAt = joinedAt;
    };
    profiles.add(caller, profile);
    #ok(true)
  };

  public func get(profiles : Map.Map<Principal, UserProfile>, caller : Principal) : ?UserProfile {
    profiles.get(caller)
  };

  public func addWalletBalance(
    profiles : Map.Map<Principal, UserProfile>,
    p : Principal,
    amount : Nat,
  ) : Common.Result<UserProfile, Text> {
    switch (profiles.get(p)) {
      case null { #err("User not found") };
      case (?existing) {
        let updated = { existing with walletBalance = existing.walletBalance + amount };
        profiles.add(p, updated);
        #ok(updated)
      };
    }
  };

  public func getUserByReferralCode(
    profiles : Map.Map<Principal, UserProfile>,
    code : Text,
  ) : ?UserProfile {
    profiles.values() |> _.find(func(u) { u.referralCode == code })
  };

  public func processReferral(
    profiles : Map.Map<Principal, UserProfile>,
    newUserPrincipal : Principal,
    referralCode : Text,
  ) : Common.Result<(), Text> {
    // Find the referrer
    switch (getUserByReferralCode(profiles, referralCode)) {
      case null { #err("Referral code not found") };
      case (?referrer) {
        if (Principal.equal(referrer.principal, newUserPrincipal)) {
          return #err("Cannot use your own referral code");
        };
        // Mark new user as referred
        switch (profiles.get(newUserPrincipal)) {
          case null {
            // New user hasn't created profile yet; store referredBy when they do
            #err("New user profile not found — save profile first")
          };
          case (?newUser) {
            if (newUser.referredBy != null) {
              return #err("Referral already applied");
            };
            let updatedNew = { newUser with referredBy = ?referralCode };
            profiles.add(newUserPrincipal, updatedNew);
            // Credit referrer ₹500
            let updatedReferrer = { referrer with walletBalance = referrer.walletBalance + 500 };
            profiles.add(referrer.principal, updatedReferrer);
            #ok(())
          };
        }
      };
    }
  };
};
