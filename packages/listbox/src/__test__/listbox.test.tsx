import React from 'react';
import { axe } from 'jest-axe';
import Listbox from '..';
import { render, screen, cleanup } from '@cs/component-utils';

describe('listbox component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('visuallyHidden should pass a11y', async () => {
    const { container } = render(<Listbox>child</Listbox>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
