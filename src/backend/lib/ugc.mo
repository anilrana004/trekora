import Map "mo:core/Map";
import List "mo:core/List";
import Time "mo:core/Time";
import Common "../types/common";
import UgcTypes "../types/ugc";

module {
  public type UgcPhoto = UgcTypes.UgcPhoto;
  public type UgcPhotoInput = UgcTypes.UgcPhotoInput;

  func nextId(counter : Common.Counter) : Text {
    let id = counter.value;
    counter.value += 1;
    "ugc-" # id.toText()
  };

  public func submitUgcPhoto(
    photos : List.List<UgcPhoto>,
    counter : Common.Counter,
    input : UgcPhotoInput,
  ) : Common.Result<UgcPhoto, Text> {
    if (input.trekSlug.size() == 0) {
      return #err("trekSlug is required");
    };
    if (input.trekkerName.size() == 0) {
      return #err("trekkerName is required");
    };
    if (input.photoData.size() == 0) {
      return #err("photoData is required");
    };
    let photo : UgcPhoto = {
      id = nextId(counter);
      trekSlug = input.trekSlug;
      trekkerName = input.trekkerName;
      trekDate = input.trekDate;
      photoData = input.photoData;
      status = #pending;
      uploadedAt = Time.now();
    };
    photos.add(photo);
    #ok(photo)
  };

  public func getUgcPhotosByTrek(
    photos : List.List<UgcPhoto>,
    trekSlug : Text,
  ) : [UgcPhoto] {
    photos.filter(func(p) { p.trekSlug == trekSlug and p.status == #approved }).toArray()
  };

  public func getPendingUgcPhotos(photos : List.List<UgcPhoto>) : [UgcPhoto] {
    photos.filter(func(p) { p.status == #pending }).toArray()
  };

  public func approveUgcPhoto(
    photos : List.List<UgcPhoto>,
    id : Text,
  ) : Common.Result<UgcPhoto, Text> {
    switch (photos.findIndex(func(p) { p.id == id })) {
      case null { #err("Photo not found") };
      case (?idx) {
        let photo = photos.at(idx);
        let updated = { photo with status = #approved };
        photos.put(idx, updated);
        #ok(updated)
      };
    }
  };

  public func rejectUgcPhoto(
    photos : List.List<UgcPhoto>,
    id : Text,
  ) : Common.Result<UgcPhoto, Text> {
    switch (photos.findIndex(func(p) { p.id == id })) {
      case null { #err("Photo not found") };
      case (?idx) {
        let photo = photos.at(idx);
        let updated = { photo with status = #rejected };
        photos.put(idx, updated);
        #ok(updated)
      };
    }
  };
};
