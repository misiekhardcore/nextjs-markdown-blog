import { render, screen } from '@testing-library/react';

import { Header } from './Header';

describe('Header', () => {
  it('should render properly', () => {
    render(<Header />);

    const links = screen.getAllByRole('link');

    expect(links.length).toBe(3);
    expect(links[1].textContent).toBe('Home');
    expect(links[2].textContent).toBe('Articles');
  });
});
