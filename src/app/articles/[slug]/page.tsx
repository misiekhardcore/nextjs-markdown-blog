import { Article } from '@/components';
import { ARTICLES_DIRECTORY } from '@/constants';
import { FileService, MdArticleService } from '@/lib/services';

import './ArticlePage.scss';

const fileServcie = new FileService();
const articleService = new MdArticleService(ARTICLES_DIRECTORY, fileServcie);

export async function generateStaticParams() {
  const articles = await articleService.getAll();
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

type AtricleProps = { params: Promise<{ slug: string }> };

export default async function ArticlePage(props: AtricleProps) {
  const params = await props.params;

  const { slug } = params;

  const article = await articleService.getOneBySlug(slug);

  return (
    <div className="ArticlePage grid">
      <section className="article grid">
        <Article article={article} />
      </section>
    </div>
  );
}
