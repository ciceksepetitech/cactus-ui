import React from 'react';
import { axe } from 'jest-axe';
import VisuallyHidden from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('visuallyHidden component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('visuallyHidden should pass a11y', async () => {
    const { container } = render(<VisuallyHidden>Hidden Text</VisuallyHidden>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
