import { ARTCILES_ROUTE, ARTICLES_DIRECTORY } from '@/constants';
import { FileService, MdArticleService } from '@/lib/services';
import Link from 'next/link';

const fileServcie = new FileService();
const articlesService = new MdArticleService(ARTICLES_DIRECTORY, fileServcie);

export default async function ArticlesPage() {
  const articles = await articlesService.getAll();

  return (
    <section>
      {articles.map(({ date, description, slug, title, topic }) => (
        <Link href={`${ARTCILES_ROUTE}/${slug}`} key={slug}>
          <article>
            <h2>
              {topic} - {title}
            </h2>
            <p>{description}</p>
            <time dateTime={date.toISOString()}>{date.toDateString()}</time>
          </article>
        </Link>
      ))}
    </section>
  );
}
