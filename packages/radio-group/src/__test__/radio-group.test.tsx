import React from 'react';
import { axe } from 'jest-axe';
import RadioGroup from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('radio group component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('radio group should pass a11y', async () => {
    const { container } = render(<RadioGroup></RadioGroup>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
