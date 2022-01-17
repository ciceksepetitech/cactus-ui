import React from 'react';
import { axe } from 'jest-axe';
import SkipNav from '..';
import { render, screen, cleanup } from '@cs/component-utils';

describe('skipNav component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('skipNav should have targetId as href', async () => {
    const id = 'some-id';
    render(<SkipNav targetId={id}>Skip Navigation</SkipNav>);

    const skipNav = screen.getByText(/skip navigation/i);
    expect(skipNav).toHaveAttribute('href', `#${id}`);
  });

  test('skipNav should pass a11y', async () => {
    const { container } = render(
      <SkipNav targetId="some-id">Skip Navigation</SkipNav>
    );

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
