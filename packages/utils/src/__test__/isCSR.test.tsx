import React from 'react';
import { isCSR } from '..';
import { render, screen, cleanup } from '@cs/component-utils';

describe('useIsCSR hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return true for browser environment', () => {
    render(<Component />);

    screen.getByText(/running in browser/i);
    expect(screen.queryByText(/not running in browser/i)).toBe(null);
  });
});

const Component = () => {
  return <div>{isCSR ? 'running in browser' : 'not running in browser'}</div>;
};
