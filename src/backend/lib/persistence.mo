import List "mo:core/List";
import Map "mo:core/Map";
import Principal "mo:core/Principal";

module {
  public func listToArray<T>(items : List.List<T>) : [T] {
    items.toArray()
  };

  public func listFromArray<T>(items : [T]) : List.List<T> {
    List.fromArray(items)
  };

  public func mapToEntries<K, V>(m : Map.Map<K, V>) : [(K, V)] {
    m.entries() |> _.toArray()
  };

  public func mapFromEntries<K, V>(entries : [(K, V)]) : Map.Map<K, V> {
    let m = Map.empty<K, V>();
    for ((k, v) in entries.vals()) {
      m.add(k, v);
    };
    m
  };

  public func principalsToArray(admins : List.List<Principal>) : [Principal] {
    admins.toArray()
  };

  public func principalsFromArray(admins : [Principal]) : List.List<Principal> {
    List.fromArray(admins)
  };
};
