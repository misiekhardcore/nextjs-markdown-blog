import { render } from '@testing-library/react';

import { DateTime } from './DateTime';

describe('DateTime', () => {
  it('should render properly', () => {
    const date = new Date('2000-10-10');

    const { container } = render(<DateTime date={date} />);

    expect(container.textContent).toBe('10/10/2000, 2:00:00 AM');
  });
});
