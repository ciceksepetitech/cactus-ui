import React, { useRef } from 'react';
import { useOnClickOutside } from '..';
import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '@cs/component-utils';

const fnMock = jest.fn();

describe('useOnClickOutside hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect listener to be called when outside of specified area is clicked', () => {
    render(<Component />);
    userEvent.click(screen.getByTestId(/outside/i));
    expect(fnMock).toBeCalledTimes(1);
  });

  test('expect listener to not be called when specified area is clicked', () => {
    render(<Component />);
    userEvent.click(screen.getByTestId(/inside/i));
    expect(fnMock).toBeCalledTimes(0);
  });
});

const Component = () => {
  const insideRef = useRef();

  useOnClickOutside(insideRef, fnMock);

  return (
    <div data-testid="outside">
      <div ref={insideRef} data-testid="inside"></div>
    </div>
  );
};
