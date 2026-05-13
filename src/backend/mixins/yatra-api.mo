import List "mo:core/List";
import Common "../types/common";
import YatraTypes "../types/yatra";
import YatraLib "../lib/yatra";

mixin (
  yatras : List.List<YatraLib.Yatra>,
  yatraCounter : Common.Counter,
  admins : List.List<Principal>,
) {
  public query func getYatras() : async [YatraTypes.Yatra] {
    YatraLib.getAll(yatras)
  };

  public query func getYatraBySlug(slug : Text) : async ?YatraTypes.Yatra {
    YatraLib.getBySlug(yatras, slug)
  };
};
