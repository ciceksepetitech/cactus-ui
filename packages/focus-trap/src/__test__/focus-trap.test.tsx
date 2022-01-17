import React from 'react';
import FocusTrap from '..';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, cleanup, screen } from '@ciceksepeti/cui-utils';

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

  test('expect focus trap to respect user clicks', () => {
    render(<Component />);

    const lastButton = screen.getByTestId(/last/i);
    const secondButton = screen.getByTestId(/second/i);

    userEvent.click(secondButton);
    expect(document.activeElement).toEqual(secondButton);

    userEvent.tab();
    expect(document.activeElement).toEqual(lastButton);
  });

  test('expect focus trap to reset when user clicks outside of trap', () => {
    render(
      <div>
        <button data-testid="outoftrap">out of trap</button>
        <Component />
      </div>
    );

    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).toEqual(firstButton);
    userEvent.tab();
    const secondButton = screen.getByTestId(/second/i);
    expect(document.activeElement).toEqual(secondButton);
    const outOfTrapButton = screen.getByTestId(/outoftrap/i);
    userEvent.click(outOfTrapButton);

    userEvent.tab();
    expect(document.activeElement).toEqual(firstButton);
  });

  test('expect focus trap not to work when disabled', () => {
    render(
      <div>
        <button>out of trap</button>
        <Component disabled />
      </div>
    );

    userEvent.tab();
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

  test('expect focus trap component to avoid leaving focus out', () => {
    render(<Component />);

    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).toEqual(firstButton);

    userEvent.tab();
    const secondButton = screen.getByTestId(/second/i);
    expect(document.activeElement).toEqual(secondButton);

    userEvent.tab({ shift: true });
    expect(document.activeElement).toEqual(firstButton);

    const lastButton = screen.getByTestId(/last/i);
    userEvent.tab({ shift: true });
    expect(document.activeElement).toEqual(lastButton);

    userEvent.tab();
    expect(document.activeElement).toEqual(firstButton);
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
