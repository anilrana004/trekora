import Common "common";

module {
  public type BlogPost = {
    id : Nat;
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    heroImage : Text;
    author : Text;
    category : Text;
    tags : [Text];
    readTime : Nat;
    publishedAt : Common.Timestamp;
    isPublished : Bool;
  };

  public type BlogInput = {
    title : Text;
    slug : Text;
    content : Text;
    excerpt : Text;
    heroImage : Text;
    author : Text;
    category : Text;
    tags : [Text];
    readTime : Nat;
    isPublished : Bool;
  };
};
