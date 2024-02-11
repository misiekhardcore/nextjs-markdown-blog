export type ArticleFrontmatter = {
  title: string;
  description: string;
  createdAt: string;
};

export type ArticleMetadata = Omit<ArticleFrontmatter, 'createdAt'> & {
  date: Date;
  slug: string;
  topic?: string;
};

export type Article = ArticleMetadata & {
  content: string;
};

export type PaginationParams = { page: number; limit?: number; firstPage?: number };

export type PaginationResponse<T> = {
  items: T[];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  pageCount: number;
};
