import { ArticlePreview } from '@/components';
import { ARTICLES_DIRECTORY } from '@/constants';
import { FileService, MdArticleService } from '@/lib/services';

const fileServcie = new FileService();
const articlesService = new MdArticleService(ARTICLES_DIRECTORY, fileServcie);

export default async function ArticlesPage() {
  const articles = await articlesService.getAll();

  return (
    <div className="ArticlesPage grid">
      <h1>Articles</h1>
      <section className="grid">
        {articles.map((article) => (
          <ArticlePreview key={article.slug} article={article} />
        ))}
      </section>
    </div>
  );
}
