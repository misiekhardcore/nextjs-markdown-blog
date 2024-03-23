import { render, screen } from '@testing-library/react';

import { Article } from './Article';

describe('Article', () => {
  it('should render the article properly', () => {
    const article = {
      date: new Date('2000-10-10'),
      description: 'some description',
      content: 'some content',
      title: 'a title',
      topic: 'topic',
      slug: 'a-title',
    };

    render(<Article article={article} />);

    expect(screen.getByRole('heading').textContent).toEqual('a title');
    expect(screen.getByText('some description')).toBeDefined();
    expect(screen.getByText('Topic: topic')).toBeDefined();
    expect(screen.getByText(/10\/10\/2000/)).toBeDefined();
    expect(screen.getByText('some content')).toBeDefined();
  });
});
