export type FilterTerms<T extends string> = {
  [k in T]?: string[];
};

export interface Filter<T extends string> {
  tags: { tag: T; term: string }[];
}
