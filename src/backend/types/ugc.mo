module {
  public type UgcPhoto = {
    id : Text;
    trekSlug : Text;
    trekkerName : Text;
    trekDate : Text;
    photoData : Text;
    status : { #pending; #approved; #rejected };
    uploadedAt : Int;
  };

  public type UgcPhotoInput = {
    trekSlug : Text;
    trekkerName : Text;
    trekDate : Text;
    photoData : Text;
  };
};
