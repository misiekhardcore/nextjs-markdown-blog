import { render } from '@testing-library/react';

import { DateTime } from './DateTime';

describe('DateTime', () => {
  it('should render properly', () => {
    const date = new Date('2000-10-10');

    const { container } = render(<DateTime date={date} />);

    expect(container.textContent).toMatch(/10\/10\/2000, \d+:00:00 AM/);
  });
});
