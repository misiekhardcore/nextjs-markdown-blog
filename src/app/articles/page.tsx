import { ARTICLES_DIRECTORY } from '@/constants';
import { FileService, MdArticleService } from '@/lib/services';

const fileServcie = new FileService();
const articlesService = new MdArticleService(ARTICLES_DIRECTORY, fileServcie);

export default async function ArticlesPage() {
  const articles = await articlesService.getAll();

  return (
    <section>
      {articles.map(({ date, description, slug, title, topic }) => (
        <article key={slug}>
          <h2>
            {topic} - {title}
          </h2>
          <p>{description}</p>
          <time dateTime={date.toISOString()}>{date.toDateString()}</time>
        </article>
      ))}
    </section>
  );
}
