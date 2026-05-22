/** Query params for `/treks` list filters (explore tags & deep links). */
export type TreksSearch = {
  state?: string;
  difficulty?: string;
  season?: string;
  q?: string;
  destination?: string;
  /** SEO tag filter (also accepts legacy `filter` from tag cloud links). */
  tag?: string;
  filter?: string;
};
