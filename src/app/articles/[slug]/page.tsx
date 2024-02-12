import { ARTICLES_DIRECTORY } from '@/constants';
import { FileService, MdArticleService } from '@/lib/services';

const fileServcie = new FileService();
const articleService = new MdArticleService(ARTICLES_DIRECTORY, fileServcie);

export async function generateStaticParams() {
  const articles = await articleService.getAll();
  return articles.map((article) => ({ slug: article.slug }));
}

export const dynamicParams = false;

type AtricleProps = { params: { slug: string } };

export default async function ArticlePage({ params: { slug } }: AtricleProps) {
  const { content, date, description, title, topic } = await articleService.getOneBySlug(slug);

  return (
    <section>
      <article>
        <h2>
          {topic} - {title}
        </h2>
        <p>{description}</p>
        <time dateTime={date.toISOString()}>{date.toDateString()}</time>
        <p>{content}</p>
      </article>
    </section>
  );
}
