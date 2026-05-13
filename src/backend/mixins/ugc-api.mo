import List "mo:core/List";
import Common "../types/common";
import UgcTypes "../types/ugc";
import UgcLib "../lib/ugc";

mixin (
  ugcPhotos : List.List<UgcLib.UgcPhoto>,
  ugcCounter : Common.Counter,
) {
  public shared func submitUgcPhoto(
    input : UgcTypes.UgcPhotoInput,
  ) : async Common.Result<UgcTypes.UgcPhoto, Text> {
    UgcLib.submitUgcPhoto(ugcPhotos, ugcCounter, input)
  };

  public query func getUgcPhotosByTrek(trekSlug : Text) : async [UgcTypes.UgcPhoto] {
    UgcLib.getUgcPhotosByTrek(ugcPhotos, trekSlug)
  };

  public shared query ({ caller }) func getPendingUgcPhotos() : async [UgcTypes.UgcPhoto] {
    UgcLib.getPendingUgcPhotos(ugcPhotos)
  };

  public shared func approveUgcPhoto(
    id : Text,
  ) : async Common.Result<UgcTypes.UgcPhoto, Text> {
    UgcLib.approveUgcPhoto(ugcPhotos, id)
  };

  public shared func rejectUgcPhoto(
    id : Text,
  ) : async Common.Result<UgcTypes.UgcPhoto, Text> {
    UgcLib.rejectUgcPhoto(ugcPhotos, id)
  };
};
