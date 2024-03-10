import { render, screen } from '@testing-library/react';

import { ArticlePreview } from './ArticlePreview';

const article = {
  date: new Date('2000-10-10'),
  description: 'some description',
  content: 'some content',
  title: 'a title',
  topic: 'topic',
  slug: 'slug',
};

describe('ArticlePreview', () => {
  it('should render the article preview properly', () => {
    render(<ArticlePreview article={article} />);

    expect(screen.getByRole('link')).toHaveProperty('href', 'http://localhost/articles/slug');
    expect(screen.getByRole('article')).toBeDefined();
  });
});
