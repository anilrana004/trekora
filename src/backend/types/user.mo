import Common "common";

module {
  public type UserProfile = {
    principal : Principal;
    name : Text;
    email : Text;
    phone : Text;
    bloodGroup : Text;
    medicalConditions : Text;
    experience : Text;
    createdAt : Common.Timestamp;
    referralCode : Text;
    walletBalance : Nat;
    referredBy : ?Text;
    joinedAt : Int;
  };

  public type ProfileInput = {
    name : Text;
    email : Text;
    phone : Text;
    bloodGroup : Text;
    medicalConditions : Text;
    experience : Text;
  };
};
