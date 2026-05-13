import List "mo:core/List";
import TrekTypes "../types/trek";

module {
  public type Trek = TrekTypes.Trek;
  public type TrekInput = TrekTypes.TrekInput;

  public func getAll(treks : List.List<Trek>) : [Trek] {
    treks.filter(func(t) { t.isActive }).toArray()
  };

  public func getBySlug(treks : List.List<Trek>, slug : Text) : ?Trek {
    treks.find(func(t) { t.slug == slug and t.isActive })
  };

  public func getFeatured(treks : List.List<Trek>) : [Trek] {
    treks.filter(func(t) { t.isFeatured and t.isActive }).toArray()
  };

  public func getByState(treks : List.List<Trek>, state : Text) : [Trek] {
    treks.filter(func(t) { t.state == state and t.isActive }).toArray()
  };

  public func create(treks : List.List<Trek>, nextId : Nat, input : TrekInput) : Trek {
    let trek : Trek = {
      id = nextId;
      name = input.name;
      slug = input.slug;
      state = input.state;
      duration = input.duration;
      altitude = input.altitude;
      difficulty = input.difficulty;
      price = input.price;
      rating = input.rating;
      reviewCount = input.reviewCount;
      description = input.description;
      image = input.image;
      images = input.images;
      category = input.category;
      bestSeason = input.bestSeason;
      distance = input.distance;
      startPoint = input.startPoint;
      endPoint = input.endPoint;
      trekType = input.trekType;
      isActive = input.isActive;
      isFeatured = input.isFeatured;
    };
    treks.add(trek);
    trek
  };

  public func update(treks : List.List<Trek>, id : Nat, input : TrekInput) : Bool {
    let existing = treks.find(func(t) { t.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        treks.mapInPlace(func(t) {
          if (t.id == id) {
            {
              id = id;
              name = input.name;
              slug = input.slug;
              state = input.state;
              duration = input.duration;
              altitude = input.altitude;
              difficulty = input.difficulty;
              price = input.price;
              rating = input.rating;
              reviewCount = input.reviewCount;
              description = input.description;
              image = input.image;
              images = input.images;
              category = input.category;
              bestSeason = input.bestSeason;
              distance = input.distance;
              startPoint = input.startPoint;
              endPoint = input.endPoint;
              trekType = input.trekType;
              isActive = input.isActive;
              isFeatured = input.isFeatured;
            }
          } else { t }
        });
        true
      };
    }
  };

  public func remove(treks : List.List<Trek>, id : Nat) : Bool {
    let existing = treks.find(func(t) { t.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        treks.mapInPlace(func(t) {
          if (t.id == id) { { t with isActive = false } } else { t }
        });
        true
      };
    }
  };
};
