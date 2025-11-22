import React, { useRef } from 'react';
import { useForceUpdate } from '..';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('useForceUpdate hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect useForceUpdate to update UI', async () => {
    const user = userEvent.setup();
    render(<Component />);

    screen.getByText(/count: 0/i);
    await user.click(screen.getByText(/increment/i));
    screen.getByText(/count: 0/i);

    await user.click(screen.getByText(/force update/i));
    screen.getByText(/count: 1/i);
  });
});

const Component = () => {
  const ref = useRef({ count: 0 });
  const forceUpdate = useForceUpdate();

  return (
    <div>
      <p>Count: {ref.current.count}</p>
      <button onClick={() => ref.current.count++}>increment</button>
      <button onClick={() => forceUpdate()}>force update</button>
    </div>
  );
};
