import Map "mo:core/Map";
import Common "../types/common";
import TrailTypes "../types/trail";
import TrailLib "../lib/trail";

mixin (trailConditions : Map.Map<Text, TrailLib.TrailCondition>) {
  public shared func setTrailCondition(
    input : TrailTypes.TrailCondition,
  ) : async Common.Result<TrailTypes.TrailCondition, Text> {
    TrailLib.setTrailCondition(trailConditions, input)
  };

  public query func getTrailCondition(
    trekSlug : Text,
  ) : async ?TrailTypes.TrailCondition {
    TrailLib.getTrailCondition(trailConditions, trekSlug)
  };

  public query func getAllTrailConditions() : async [TrailTypes.TrailCondition] {
    TrailLib.getAllTrailConditions(trailConditions)
  };
};
