import { Article, PaginationParams, PaginationResponse } from '@/types';

export interface ArticleService {
  getAll(): Promise<Article[]>;
  getOneBySlug(slug: string): Promise<Article>;
  getPage(params: PaginationParams): Promise<PaginationResponse<Article>>;
}
