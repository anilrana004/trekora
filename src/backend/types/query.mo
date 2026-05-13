import Common "common";

module {
  public type LeadQuery = {
    id : Nat;
    name : Text;
    email : Text;
    phone : Text;
    preferredTrek : Text;
    preferredDates : Text;
    groupSize : Nat;
    budget : Text;
    message : Text;
    status : Text;
    createdAt : Common.Timestamp;
  };

  public type QueryInput = {
    name : Text;
    email : Text;
    phone : Text;
    preferredTrek : Text;
    preferredDates : Text;
    groupSize : Nat;
    budget : Text;
    message : Text;
  };
};
