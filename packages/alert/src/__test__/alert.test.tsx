import React, { useState } from 'react';
import Alert from '..';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, waitFor } from '@cs/component-utils';

describe('alert component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect alert message to be rendered', () => {
    render(<Alert>Test alert</Alert>);
    screen.getAllByText(/test alert/i);
  });

  test('expect alert message to be rendered twice', () => {
    render(<Alert>Test alert</Alert>);
    const alerts = screen.getAllByText(/test alert/i);
    expect(alerts).toHaveLength(2);
  });

  test('alert should pass a11y', async () => {
    const { container } = render(<Alert>Test alert</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('expect alert to be rendered with specified tag', () => {
    render(<Alert as="span">Test Alert</Alert>);

    const alert = screen.getAllByText(/test alert/i);
    expect(alert[0].tagName).toBe('SPAN');
    expect(alert[1].tagName).toBe('SPAN');
  });

  test('alert should be rendered by default role as status', async () => {
    render(<Alert>Test alert</Alert>);
    screen.getByRole('status', { hidden: true });
  });

  test('alert should be rendered as alert role when type is assertive', async () => {
    render(<Alert type="assertive">Test alert</Alert>);
    screen.getByRole('alert', { hidden: true });
  });

  test('alert should be unmounted without a problem', async () => {
    const { unmount } = render(<Alert type="assertive">Test alert</Alert>);
    unmount();
    expect(screen.queryByRole('alert')).toBe(null);
  });

  test('async alerts should be mount/unmount properly', async () => {
    jest.useFakeTimers();

    render(<AlertRenderAsync />);

    userEvent.click(screen.getByText(/add alert/i));
    await waitFor(() => screen.getAllByText('I am an alert (1)'));

    userEvent.click(screen.getByText(/add alert/i));
    await waitFor(() => screen.getAllByText('I am an alert (2)'));

    userEvent.click(screen.getByText(/remove alert/i));
    expect(screen.queryAllByText(/i am an alert (1)/i)).toHaveLength(0);
    await waitFor(() => screen.getAllByText('I am an alert (2)'));

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});

const AlertRenderAsync = () => {
  const [alerts, setAlerts] = useState([]);

  const onAddAlert = () => {
    setTimeout(() => {
      setAlerts((oldAlerts) => {
        const updatedAlerts = [
          ...oldAlerts,
          `I am an alert (${oldAlerts.length + 1})`
        ];
        return updatedAlerts;
      });
    }, 100);
  };

  const onRemoveAlert = () => {
    setAlerts((oldAlerts) => {
      const [, ...rest] = oldAlerts;
      return rest;
    });
  };

  return (
    <section aria-label="alert component mounted with setTimeout, async">
      <div>
        <button onClick={onAddAlert}>Add Alert</button>
        <button onClick={onRemoveAlert}>Remove Alert</button>
      </div>
      {alerts.map((each, index) => (
        <Alert key={each + index}>{each}</Alert>
      ))}
    </section>
  );
};
