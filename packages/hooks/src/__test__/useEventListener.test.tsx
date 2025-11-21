import React, { useRef } from 'react';
import { useEventListener } from '..';
import userEvent from '@testing-library/user-event';
import { cleanup, screen, render } from '../../../../utils/test-setup';

const fnMock = jest.fn();
const fnNullMock = jest.fn();
const fnSpecificMock = jest.fn();

describe('useEventListener hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect listener to be called when any dom element is clicked', async () => {
    const user = userEvent.setup();
    render(<Component />);

    await user.click(screen.getByTestId(/area/i));
    expect(fnMock).toHaveBeenCalled();
  });

  test('expect listener to be called when specific dom element is clicked', async () => {
    const user = userEvent.setup();
    render(<Component />);

    await user.click(screen.getByTestId(/specific/i));
    expect(fnSpecificMock).toHaveBeenCalled();
  });

  test('expect listener not to be called when target is undefined', async () => {
    const user = userEvent.setup();
    render(<Component />);

    await user.click(screen.getByTestId(/area/i));
    expect(fnNullMock).not.toHaveBeenCalled();
  });
});

const Component = () => {
  const specificRef = useRef<HTMLDivElement>(null);

  useEventListener({ name: 'click', listener: fnMock });

  useEventListener({
    target: null as any,
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
