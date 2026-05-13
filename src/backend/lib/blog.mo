import List "mo:core/List";
import Time "mo:core/Time";
import BlogTypes "../types/blog";

module {
  public type BlogPost = BlogTypes.BlogPost;
  public type BlogInput = BlogTypes.BlogInput;

  public func getAll(blogs : List.List<BlogPost>) : [BlogPost] {
    blogs.filter(func(b) { b.isPublished }).toArray()
  };

  public func getBySlug(blogs : List.List<BlogPost>, slug : Text) : ?BlogPost {
    blogs.find(func(b) { b.slug == slug and b.isPublished })
  };

  public func create(blogs : List.List<BlogPost>, nextId : Nat, input : BlogInput) : BlogPost {
    let post : BlogPost = {
      id = nextId;
      title = input.title;
      slug = input.slug;
      content = input.content;
      excerpt = input.excerpt;
      heroImage = input.heroImage;
      author = input.author;
      category = input.category;
      tags = input.tags;
      readTime = input.readTime;
      publishedAt = Time.now();
      isPublished = input.isPublished;
    };
    blogs.add(post);
    post
  };

  public func update(blogs : List.List<BlogPost>, id : Nat, input : BlogInput) : Bool {
    let existing = blogs.find(func(b) { b.id == id });
    switch (existing) {
      case null { false };
      case (?b) {
        blogs.mapInPlace(func(post) {
          if (post.id == id) {
            {
              id = id;
              title = input.title;
              slug = input.slug;
              content = input.content;
              excerpt = input.excerpt;
              heroImage = input.heroImage;
              author = input.author;
              category = input.category;
              tags = input.tags;
              readTime = input.readTime;
              publishedAt = b.publishedAt;
              isPublished = input.isPublished;
            }
          } else { post }
        });
        true
      };
    }
  };

  public func remove(blogs : List.List<BlogPost>, id : Nat) : Bool {
    let existing = blogs.find(func(b) { b.id == id });
    switch (existing) {
      case null { false };
      case (?_) {
        blogs.mapInPlace(func(b) {
          if (b.id == id) { { b with isPublished = false } } else { b }
        });
        true
      };
    }
  };
};
