import React from 'react';
import { useIsCSR } from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

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
  const isCSR = useIsCSR();
  return <div>{isCSR ? 'running in browser' : 'not running in browser'}</div>;
};
