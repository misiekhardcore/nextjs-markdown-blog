import { Article } from '@/types';

import { Headline, DateTime, Markdown } from '@/components';

import './Article.scss';

type ArticleProps = {
  article: Article;
  isPreview?: boolean;
};

export function Article({ article, isPreview }: ArticleProps) {
  const { date, description, content, title, topic } = article;
  return (
    <article className="Article">
      <Headline title={title} description={description} topic={topic} />
      <DateTime date={date} />
      <Markdown markdown={content} isPreview={isPreview} />
    </article>
  );
}
