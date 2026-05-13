module {
  public type Trek = {
    id : Nat;
    name : Text;
    slug : Text;
    state : Text;
    duration : Nat;
    altitude : Nat;
    difficulty : Text;
    price : Nat;
    rating : Float;
    reviewCount : Nat;
    description : Text;
    image : Text;
    images : [Text];
    category : Text;
    bestSeason : Text;
    distance : Nat;
    startPoint : Text;
    endPoint : Text;
    trekType : Text;
    isActive : Bool;
    isFeatured : Bool;
  };

  public type TrekInput = {
    name : Text;
    slug : Text;
    state : Text;
    duration : Nat;
    altitude : Nat;
    difficulty : Text;
    price : Nat;
    rating : Float;
    reviewCount : Nat;
    description : Text;
    image : Text;
    images : [Text];
    category : Text;
    bestSeason : Text;
    distance : Nat;
    startPoint : Text;
    endPoint : Text;
    trekType : Text;
    isActive : Bool;
    isFeatured : Bool;
  };
};
