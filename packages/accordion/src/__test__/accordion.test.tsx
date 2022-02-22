import React from 'react';
import { axe } from 'jest-axe';
import { Accordion } from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('accordion component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('accordion should pass a11y', async () => {
    const { container } = render(<Accordion></Accordion>);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
