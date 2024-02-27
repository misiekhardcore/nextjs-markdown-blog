import { render, screen } from '@testing-library/react';

import { Headline } from './Headline';

describe('Headline', () => {
  it('should render the article headline properly', () => {
    render(<Headline topic="topic" description="some description" title="a title" />);

    expect(screen.getByRole('heading').textContent).toEqual('a title');
    expect(screen.getByText('some description')).toBeDefined();
    expect(screen.getByText('Topic: topic')).toBeDefined();
  });
});
