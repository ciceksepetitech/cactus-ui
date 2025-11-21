import React, { useEffect, useState } from 'react';
import { useDebounce } from '..';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '../../../../utils/test-setup';

const fnMock = jest.fn();

describe('useDebounce hook tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('expect debounced value to be set less', async () => {
    const user = userEvent.setup();
    render(<Component />);

    await user.type(screen.getByTestId(/text/i), 'some input value');
    expect(fnMock).toHaveBeenCalledTimes(1);
  });

  test('expect debounced delay to be set', async () => {
    const user = userEvent.setup();
    render(<Component delay={1000} />);

    await user.type(screen.getByTestId(/text/i), 'some input value');
    expect(fnMock).toHaveBeenCalledTimes(1);
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
