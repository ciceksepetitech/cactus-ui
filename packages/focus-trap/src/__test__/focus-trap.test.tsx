import React from 'react';
import FocusTrap from '..';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, cleanup, screen, waitFor } from '../../../../utils/test-setup';

describe('focusTrap component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect first focusable element to get focused by default', () => {
    render(<Component />);

    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).toEqual(firstButton);
  });

  test('expect last focusable element to get focused', () => {
    render(<Component autoFocusToLast />);

    const lastButton = screen.getByTestId(/last/i);
    expect(document.activeElement).toEqual(lastButton);
  });

  test('expect focus trap to respect user clicks', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const lastButton = screen.getByTestId(/last/i);
    const secondButton = screen.getByTestId(/second/i);

    await user.click(secondButton);
    expect(document.activeElement).toEqual(secondButton);

    await user.tab();
    expect(document.activeElement).toEqual(lastButton);
  });

  test('expect focus trap to reset when user clicks outside of trap', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button data-testid="outoftrap">out of trap</button>
        <Component />
      </div>
    );

    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).toEqual(firstButton);
    await user.tab();
    const secondButton = screen.getByTestId(/second/i);
    expect(document.activeElement).toEqual(secondButton);
    const outOfTrapButton = screen.getByTestId(/outoftrap/i);
    await user.click(outOfTrapButton);

    await user.tab();
    expect(document.activeElement).toEqual(firstButton);
  });

  test('expect focus trap not to work when disabled', async () => {
    const user = userEvent.setup();
    render(
      <div>
        <button>out of trap</button>
        <Component disabled />
      </div>
    );

    await user.tab();
    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).not.toEqual(firstButton);
  });

  test('auto focuses to element that has autoFocus inside', () => {
    render(
      <FocusTrap>
        <button>button</button>
        <input data-testid="input" autoFocus />
      </FocusTrap>
    );

    const activeElement = document.activeElement;
    const focusedElement = screen.queryByTestId(/input/i);

    expect(activeElement === focusedElement).toBe(true);
  });

  test('expect focus trap component to work correctly with tab and shift+tab', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).toEqual(firstButton);

    await user.tab();
    await waitFor(() => {
      const secondButton = screen.getByTestId(/second/i);
      expect(document.activeElement).toEqual(secondButton);
    });

    await user.tab({ shift: true });
    await waitFor(() => {
      expect(document.activeElement).toEqual(firstButton);
    });

    await user.tab();
    await waitFor(() => {
      const secondButton = screen.getByTestId(/second/i);
      expect(document.activeElement).toEqual(secondButton);
    });
  });

  test('focusTrap should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const Component = (props) => (
  <FocusTrap {...props}>
    <button data-testid="first">first</button>
    <button style={{ visibility: 'hidden' }}>hidden</button>
    <button data-testid="second">second</button>
    <button tabIndex={-1}>tabIndex -1</button>
    <button data-testid="last">last</button>
  </FocusTrap>
);
