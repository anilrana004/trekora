import List "mo:core/List";
import Principal "mo:core/Principal";
import Common "../types/common";
import BlogTypes "../types/blog";
import BlogLib "../lib/blog";

mixin (
  blogs : List.List<BlogLib.BlogPost>,
  blogCounter : Common.Counter,
  admins : List.List<Principal>,
) {
  public query func getBlogs() : async [BlogTypes.BlogPost] {
    BlogLib.getAll(blogs)
  };

  public query func getBlogBySlug(slug : Text) : async ?BlogTypes.BlogPost {
    BlogLib.getBySlug(blogs, slug)
  };

  public shared ({ caller }) func createBlog(input : BlogTypes.BlogInput) : async Common.Result<Nat, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    let id = blogCounter.value;
    ignore BlogLib.create(blogs, id, input);
    blogCounter.value += 1;
    #ok(id)
  };

  public shared ({ caller }) func updateBlog(id : Nat, input : BlogTypes.BlogInput) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    if (BlogLib.update(blogs, id, input)) { #ok(true) }
    else { #err("Blog not found") }
  };

  public shared ({ caller }) func deleteBlog(id : Nat) : async Common.Result<Bool, Text> {
    if (not admins.contains(caller)) {
      return #err("Not authorized");
    };
    if (BlogLib.remove(blogs, id)) { #ok(true) }
    else { #err("Blog not found") }
  };
};
