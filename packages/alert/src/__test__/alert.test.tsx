import React from 'react';
import Alert from '..';
import { axe } from 'jest-axe';
import userEvents from '@testing-library/user-event';
import { render, screen, cleanup, waitFor } from '@cs/component-utils';
import { RenderAsync as AlertRenderAsync } from '../stories/Alert.stories';

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
    const alert = screen.getAllByText(/test alert/i);
    expect(alert).toHaveLength(2);
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
    screen.getByRole('status');
  });

  test('alert should be rendered as alert role when type is assertive', async () => {
    render(<Alert type="assertive">Test alert</Alert>);
    screen.getByRole('alert');
  });

  test('async alerts should be mount/unmount properly', async () => {
    jest.useFakeTimers();

    render(<AlertRenderAsync />);

    userEvents.click(screen.getByText(/add alert/i));
    await waitFor(() => screen.getAllByText('I am an alert (1)'));

    userEvents.click(screen.getByText(/add alert/i));
    await waitFor(() => screen.getAllByText('I am an alert (2)'));

    userEvents.click(screen.getByText(/remove alert/i));
    expect(screen.queryAllByText(/i am an alert (1)/i)).toHaveLength(0);
    await waitFor(() => screen.getAllByText('I am an alert (2)'));

    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });
});
