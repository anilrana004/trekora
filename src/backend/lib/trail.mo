import Map "mo:core/Map";
import Time "mo:core/Time";
import Common "../types/common";
import TrailTypes "../types/trail";

module {
  public type TrailCondition = TrailTypes.TrailCondition;

  public func setTrailCondition(
    conditions : Map.Map<Text, TrailCondition>,
    input : TrailCondition,
  ) : Common.Result<TrailCondition, Text> {
    if (input.trekSlug.size() == 0) {
      return #err("trekSlug is required");
    };
    conditions.add(input.trekSlug, input);
    #ok(input)
  };

  public func getTrailCondition(
    conditions : Map.Map<Text, TrailCondition>,
    trekSlug : Text,
  ) : ?TrailCondition {
    conditions.get(trekSlug)
  };

  public func getAllTrailConditions(conditions : Map.Map<Text, TrailCondition>) : [TrailCondition] {
    conditions.values() |> _.toArray()
  };
};
