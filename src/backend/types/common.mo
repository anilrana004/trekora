module {
  public type Result<T, E> = { #ok : T; #err : E };
  public type Timestamp = Int;
  public type Counter = { var value : Nat };

  public type WeatherCache = {
    location : Text;
    data : Text;
    fetchedAt : Nat;
    ttl : Nat;
  };
};
