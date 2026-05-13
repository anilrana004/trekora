import List "mo:core/List";
import YatraTypes "../types/yatra";

module {
  public type Yatra = YatraTypes.Yatra;
  public type YatraInput = YatraTypes.YatraInput;

  public func getAll(yatras : List.List<Yatra>) : [Yatra] {
    yatras.filter(func(y) { y.isActive }).toArray()
  };

  public func getBySlug(yatras : List.List<Yatra>, slug : Text) : ?Yatra {
    yatras.find(func(y) { y.slug == slug and y.isActive })
  };

  public func create(yatras : List.List<Yatra>, nextId : Nat, input : YatraInput) : Yatra {
    let yatra : Yatra = {
      id = nextId;
      name = input.name;
      slug = input.slug;
      state = input.state;
      description = input.description;
      significance = input.significance;
      bestTime = input.bestTime;
      howToReach = input.howToReach;
      accommodation = input.accommodation;
      price = input.price;
      image = input.image;
      images = input.images;
      isActive = input.isActive;
    };
    yatras.add(yatra);
    yatra
  };
};
