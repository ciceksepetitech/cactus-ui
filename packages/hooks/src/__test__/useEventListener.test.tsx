import React, { useRef } from 'react';
import { useEventListener } from '..';
import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '@ciceksepeti/cui-utils';

const fnMock = jest.fn();
const fnNullMock = jest.fn();
const fnSpecificMock = jest.fn();

describe('useEventListener hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect listener to be called when any dom element is clicked', () => {
    render(<Component />);

    userEvent.click(screen.getByTestId(/area/i));
    expect(fnMock).toBeCalled();
  });

  test('expect listener to be called when specific dom element is clicked', () => {
    render(<Component />);

    userEvent.click(screen.getByTestId(/specific/i));
    expect(fnSpecificMock).toBeCalled();
  });

  test('expect listener not to be called when target is null', () => {
    render(<Component />);

    userEvent.click(screen.getByTestId(/area/i));
    expect(fnNullMock).not.toBeCalled();
  });
});

const Component = () => {
  const specificRef = useRef();

  useEventListener({ name: 'click', listener: fnMock });

  useEventListener({
    target: null,
    name: 'click',
    listener: fnNullMock
  });

  useEventListener({
    name: 'click',
    target: specificRef,
    listener: fnSpecificMock
  });

  return (
    <div>
      <div data-testid="area"></div>
      <div ref={specificRef} data-testid="specific"></div>
    </div>
  );
};
