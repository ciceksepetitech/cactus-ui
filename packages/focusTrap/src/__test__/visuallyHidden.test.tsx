import React from 'react';
import { axe } from 'jest-axe';
import VisuallyHidden from '..';
import { render, screen, cleanup } from '@cs/component-utils';

describe('visually-hidden component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect visually-hidden element to be in dom', () => {
    render(<VisuallyHidden>Hidden Text</VisuallyHidden>);
    screen.getByText(/hidden text/i);
  });

  test('expect visually-hidden child element to be not visible', () => {
    render(
      <VisuallyHidden>
        <p data-testid="hidden-text">Hidden Text</p>
      </VisuallyHidden>
    );

    expect(screen.getByTestId('hidden-text')).not.toBeVisible();
  });

  test('expect visually-hidden to be rendered with specified tag', () => {
    render(<VisuallyHidden as="span">Hidden Text</VisuallyHidden>);

    const visuallyHidden = screen.getByText(/hidden text/i);
    expect(visuallyHidden.tagName).toBe('SPAN');
  });

  test('visually-hidden should pass a11y', async () => {
    const { container } = render(<VisuallyHidden>Hidden Text</VisuallyHidden>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
