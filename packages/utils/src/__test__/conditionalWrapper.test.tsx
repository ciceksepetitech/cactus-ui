import React from 'react';
import { ConditionalWrapper } from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('useIsCSR hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('should not return wrapped component when condition is false', () => {
    render(<Component />);

    screen.getByText(/some text/i);
    expect(screen.queryByText(/wrapped: some text/i)).toBe(null);
  });

  test('should not return wrapped component when condition is true', () => {
    render(<Component condition={true} />);

    screen.getByText(/wrapped component/i);
    expect(screen.queryByText(/some text/i)).toBe(null);
  });
});

const Component = ({ condition }: any) => {
  return (
    <ConditionalWrapper
      condition={condition}
      wrapper={() => <p>wrapped component</p>}
    >
      <div>some text</div>
    </ConditionalWrapper>
  );
};
