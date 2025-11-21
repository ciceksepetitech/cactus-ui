import React, { useRef } from 'react';
import { useOnClickOutside } from '..';
import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '../../../../utils/test-setup';

const fnMock = jest.fn();

describe('useOnClickOutside hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect listener to be called when outside of specified area is clicked', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByTestId(/outside/i));
    expect(fnMock).toHaveBeenCalledTimes(1);
  });

  test('expect listener to not be called when specified area is clicked', async () => {
    const user = userEvent.setup();
    render(<Component />);
    await user.click(screen.getByTestId(/inside/i));
    expect(fnMock).toHaveBeenCalledTimes(0);
  });
});

const Component = () => {
  const insideRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(insideRef as React.RefObject<HTMLElement>, fnMock);

  return (
    <div data-testid="outside">
      <div ref={insideRef} data-testid="inside"></div>
    </div>
  );
};
