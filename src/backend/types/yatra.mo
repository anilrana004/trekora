module {
  public type Yatra = {
    id : Nat;
    name : Text;
    slug : Text;
    state : Text;
    description : Text;
    significance : Text;
    bestTime : Text;
    howToReach : Text;
    accommodation : Text;
    price : Nat;
    image : Text;
    images : [Text];
    isActive : Bool;
  };

  public type YatraInput = {
    name : Text;
    slug : Text;
    state : Text;
    description : Text;
    significance : Text;
    bestTime : Text;
    howToReach : Text;
    accommodation : Text;
    price : Nat;
    image : Text;
    images : [Text];
    isActive : Bool;
  };
};
