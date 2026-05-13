import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import QueryTypes "../types/query";

module {
  public type LeadQuery = QueryTypes.LeadQuery;
  public type QueryInput = QueryTypes.QueryInput;

  public func submit(
    queries : List.List<LeadQuery>,
    nextId : Nat,
    input : QueryInput,
  ) : LeadQuery {
    let q : LeadQuery = {
      id = nextId;
      name = input.name;
      email = input.email;
      phone = input.phone;
      preferredTrek = input.preferredTrek;
      preferredDates = input.preferredDates;
      groupSize = input.groupSize;
      budget = input.budget;
      message = input.message;
      status = "new";
      createdAt = Time.now();
    };
    queries.add(q);
    q
  };

  public func getAll(queries : List.List<LeadQuery>) : [LeadQuery] {
    queries.toArray()
  };

  public func updateStatus(queries : List.List<LeadQuery>, id : Nat, status : Text) : Bool {
    let existing = queries.find(func(q) { q.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        queries.mapInPlace(func(q) {
          if (q.id == id) { { q with status = status } } else { q }
        });
        true
      };
    }
  };
};
