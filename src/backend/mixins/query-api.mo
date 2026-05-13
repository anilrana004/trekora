import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";
import QueryTypes "../types/query";
import LeadQueryLib "../lib/leadquery";

mixin (
  queries : List.List<LeadQueryLib.LeadQuery>,
  queryCounter : Common.Counter,
  admins : List.List<Principal>,
) {
  public shared func submitQuery(input : QueryTypes.QueryInput) : async Common.Result<Nat, Text> {
    let id = queryCounter.value;
    ignore LeadQueryLib.submit(queries, id, input);
    queryCounter.value += 1;
    #ok(id)
  };

  public shared ({ caller }) func getAllQueries() : async Common.Result<[QueryTypes.LeadQuery], Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    #ok(LeadQueryLib.getAll(queries))
  };

  public shared ({ caller }) func updateQueryStatus(id : Nat, status : Text) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    if (LeadQueryLib.updateStatus(queries, id, status)) { #ok(true) }
    else { #err("Query not found") }
  };
};
