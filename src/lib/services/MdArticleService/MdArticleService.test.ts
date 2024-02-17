import path from 'path';

import { FileService } from '..';

import { MdArticleService } from './MdArticleService';

const testDataPath = path.join(__dirname, '../__testData__');

const fileService = new FileService();
const articleService = new MdArticleService(testDataPath, fileService);

const testArticle = {
  content: `
# title

content
`,
  title: 'title',
  description: 'description',
  slug: 'test',
};

it('should get all articles', async () => {
  const articles = await articleService.getAll();
  expect(articles).toHaveLength(5);
  expect(articles.map((article) => article.slug).sort()).toEqual([
    'dir1-file1',
    'dir1-file2',
    'dir2-file21',
    'dir2-file22',
    'test',
  ]);
  expect(articles[articles.length - 1]).toMatchObject(testArticle);
});

it('should get one article by slug', async () => {
  const article = await articleService.getOneBySlug('test');
  expect(article).toMatchObject(testArticle);
});

it('should throw error if article not found', async () => {
  await expect(articleService.getOneBySlug('not-found')).rejects.toThrow(
    'Article with slug "not-found" not found'
  );
});

it('should get articles page', async () => {
  const page = await articleService.getPage({ page: 1, limit: 2, firstPage: 1 });
  const { hasNextPage, hasPreviousPage, items, pageCount } = page;

  expect(hasNextPage).toBe(true);
  expect(hasPreviousPage).toBe(false);
  expect(items).toHaveLength(2);
  expect(pageCount).toBe(3);
});
