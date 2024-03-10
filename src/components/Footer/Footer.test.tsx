import { render, screen } from '@testing-library/react';

import { Footer } from './Footer';

describe('Footer', () => {
  it('should render properly', () => {
    render(<Footer />);

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(3);
    expect(links.at(0)?.title).toBe('GitHub');
    expect(links.at(1)?.title).toBe('LinkedIn');
    expect(links.at(2)?.title).toBe('Email');
  });
});
