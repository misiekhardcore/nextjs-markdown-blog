import { Article } from '@/types';

import { Headline, DateTime, Markdown } from '@/components';

import './Article.scss';

type ArticleProps = {
  article: Article;
};

export function Article({ article }: ArticleProps) {
  const { date, description, content, title, topic } = article;
  return (
    <article>
      <Headline title={title} description={description} topic={topic} />
      <DateTime date={date} />
      <Markdown markdown={content} />
    </article>
  );
}
