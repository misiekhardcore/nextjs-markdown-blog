import { Article } from '@/components';
import { ARTCILES_ROUTE, ARTICLES_DIRECTORY } from '@/constants';
import { FileService, MdArticleService } from '@/lib/services';
import Link from 'next/link';

const fileServcie = new FileService();
const articlesService = new MdArticleService(ARTICLES_DIRECTORY, fileServcie);

export default async function ArticlesPage() {
  const articles = await articlesService.getAll();

  return (
    <section>
      {articles.map((article) => (
        <Link key={article.slug} href={`${ARTCILES_ROUTE}/${article.slug}`}>
          <Article article={article} />
        </Link>
      ))}
    </section>
  );
}
