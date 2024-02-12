import matter from 'gray-matter';

import {
  ArticleService as ArticleServiceInterface,
  DirectoryPath,
  FilePath,
  FilesTree,
  FileService,
} from '@/lib/interfaces';
import { Article, ArticleFrontmatter, PaginationParams, PaginationResponse } from '@/types';
import { StringService } from '@/lib/services';

type FileWithDir = { directory: DirectoryPath; file: FilePath };

export class MdArticleService implements ArticleServiceInterface {
  private articlesWithoutTopicDirectory: DirectoryPath = {
    directoryName: '',
    absolutePath: this.directory,
    relativePath: '',
  };

  constructor(
    private directory: string,
    private fileService: FileService
  ) {}

  async getAll(): Promise<Article[]> {
    const filePaths = this.getAllMdArticlesInDir();

    const allPostsData = filePaths
      .map<Article>(this.fileToArticle)
      .sort((a, b) => b.date.getTime() - a.date.getTime());

    return allPostsData;
  }

  private getAllMdArticlesInDir = (): FileWithDir[] => {
    const filesTree = this.fileService.getTree(this.directory);

    const filesWithoutTopic: FileWithDir[] = filesTree
      .filter<FilePath>(this.isMdFile)
      .map((file) => ({ directory: this.articlesWithoutTopicDirectory, file }));

    const topics = filesTree.filter<FilesTree>(this.fileService.isFilesTree);
    const filesWithTopic: FileWithDir[] = topics.flatMap(({ directory, children }) =>
      children.filter<FilePath>(this.isMdFile).map((file) => ({ directory, file }))
    );
    return [...filesWithoutTopic, ...filesWithTopic];
  };

  private isMdFile = (file: FilePath | FilesTree): file is FilePath => {
    return this.fileService.isFilePath(file) && file.fileName.endsWith('.md');
  };

  private fileToArticle = ({ directory, file }: FileWithDir): Article => {
    const { fileName, absolutePath } = file;
    const filePath = absolutePath + fileName;
    const { mtime } = this.fileService.getFileStats(filePath);
    const fileContent = this.fileService.readFileContent(filePath);
    const { content, metadata } = this.getFrontmatter(fileContent);
    const { title, createdAt, description } = metadata;
    const fileNameWithoutExt = fileName.replace('.md', '');
    const topic = directory.directoryName;
    const slug = StringService.stringToSlug(
      StringService.stringArrayToString([topic, fileNameWithoutExt])
    );

    return {
      slug,
      content,
      title: title || fileNameWithoutExt,
      description: description,
      date: new Date(createdAt || mtime),
      topic,
    };
  };

  private getFrontmatter = (
    fileContent: string
  ): { content: string; metadata: ArticleFrontmatter } => {
    const { content, data } = matter(fileContent);
    return { content, metadata: data as ArticleFrontmatter };
  };

  async getOneBySlug(slug: string): Promise<Article> {
    const allArticles = await this.getAll();
    const article = allArticles.find((article) => article.slug === slug);

    if (!article) {
      throw new Error(`Article with slug "${slug}" not found`);
    }

    return article;
  }

  async getPage({
    page,
    limit,
    firstPage = 1,
  }: PaginationParams): Promise<PaginationResponse<Article>> {
    const articles = await this.getAll();
    const articlesCount = articles.length;
    const sliceStart = (page - firstPage) * (limit || 0);
    const sliceEnd = limit ? sliceStart + limit : undefined;
    const pageCount = Math.ceil(articlesCount / (limit || 1));

    return {
      hasNextPage: page < pageCount,
      hasPreviousPage: page > firstPage,
      items: articles.slice(sliceStart, sliceEnd),
      pageCount,
    };
  }
}
