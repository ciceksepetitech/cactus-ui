import React, { useEffect, useState } from 'react';
import { useDebounce } from '..';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '@ciceksepeti/cui-utils';

const fnMock = jest.fn();

describe('useDebounce hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect debounced value to be set less', () => {
    render(<Component />);

    userEvent.type(screen.getByTestId(/text/i), 'some input value');
    expect(fnMock).toBeCalledTimes(1);
  });

  test('expect debounced delay to be set', () => {
    render(<Component delay={1000} />);

    userEvent.type(screen.getByTestId(/text/i), 'some input value');
    expect(fnMock).toBeCalledTimes(1);
  });
});

const Component = (props) => {
  const { delay } = props;

  const [text, setText] = useState('');
  const debouncedText = useDebounce<string>(text, delay);

  useEffect(() => {
    fnMock();
  }, [debouncedText]);

  return (
    <input
      type="text"
      value={text}
      data-testid="text"
      onChange={(event) => setText(event.target.value)}
    />
  );
};
