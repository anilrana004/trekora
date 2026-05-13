module {
  public type TrailCondition = {
    trekSlug : Text;
    condition : { #good; #moderate; #difficult; #closed };
    notes : Text;
    updatedAt : Int;
    validUntil : Int;
  };
};
