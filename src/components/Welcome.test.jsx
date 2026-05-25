import { render, screen } from '@testing-library/react';

import Welcome from './Welcome';

describe('Welcome Component', () => {

  test('renders welcome text', () => {

    render(<Welcome />);

    const textElement = screen.getByText(/welcome/i);

    expect(textElement).toBeTruthy();

  });

});