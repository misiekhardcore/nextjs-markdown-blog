import Link from 'next/link';

import { Article as TArticle } from '@/types';

import { Article } from '@/components/Article';
import { ARTICLES_ROUTE } from '@/constants';

import './ArticlePreview.scss';

type ArticleProps = {
  article: TArticle;
};

const PREVIEW_WORDS = 50;

export function ArticlePreview({ article }: ArticleProps) {
  function getPreview(content: string): string {
    const words = content.split(' ');

    if (words.length > PREVIEW_WORDS) {
      words.length = PREVIEW_WORDS;
    }

    return words.join(' ') + '...';
  }

  return (
    <Link href={`${ARTICLES_ROUTE}/${article.slug}`} className="ArticlePreview">
      <Article article={{ ...article, content: getPreview(article.content) }} isPreview />
    </Link>
  );
}
