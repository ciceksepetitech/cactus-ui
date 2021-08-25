import React from 'react';
import Alert from '..';
import { axe } from 'jest-axe';
import userEvents from '@testing-library/user-event';
import { RenderAsync as AlertRenderAsync } from '../stories/Alert.stories';
import { render, screen, cleanup, waitFor } from '@testing-library/react';

describe('alert component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect alert message to be rendered', () => {
    render(<Alert>Test alert</Alert>);
    screen.getAllByText(/test alert/i);
  });

  test('alert should pass a11y', async () => {
    const { container } = render(<Alert>Test alert</Alert>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
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
