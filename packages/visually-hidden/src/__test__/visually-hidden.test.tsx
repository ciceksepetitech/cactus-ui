import React from 'react';
import { axe } from 'jest-axe';
import VisuallyHidden from '..';
import { render, screen, cleanup } from '@ciceksepeti/cui-utils';

describe('visuallyHidden component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect visuallyHidden element to be in dom', () => {
    render(<VisuallyHidden>Hidden Text</VisuallyHidden>);
    screen.getByText(/hidden text/i);
  });

  test('expect visuallyHidden child element to be not visible', () => {
    render(
      <VisuallyHidden>
        <p data-testid="hidden-text">Hidden Text</p>
      </VisuallyHidden>
    );

    expect(screen.getByTestId('hidden-text')).not.toBeVisible();
  });

  test('expect visuallyHidden child element to be visible when disabled', () => {
    render(
      <VisuallyHidden disabled>
        <p data-testid="hidden-text">Hidden Text</p>
      </VisuallyHidden>
    );

    expect(screen.getByTestId('hidden-text')).toBeVisible();
  });

  test('expect visuallyHidden to be rendered with specified tag', () => {
    render(<VisuallyHidden as="span">Hidden Text</VisuallyHidden>);

    const visuallyHidden = screen.getByText(/hidden text/i);
    expect(visuallyHidden.tagName).toBe('SPAN');
  });

  test('visuallyHidden should pass a11y', async () => {
    const { container } = render(<VisuallyHidden>Hidden Text</VisuallyHidden>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
