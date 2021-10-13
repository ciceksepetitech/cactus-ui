import React from 'react';
import FocusTrap from '..';
import { axe } from 'jest-axe';
import userEvents from '@testing-library/user-event';
import { render, cleanup, screen } from '@cs/component-utils';

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

  test('expect focus trap component to avoid leaving focus out', () => {
    render(<Component />);

    const firstButton = screen.getByTestId(/first/i);
    expect(document.activeElement).toEqual(firstButton);

    userEvents.tab();
    const secondButton = screen.getByTestId(/second/i);
    expect(document.activeElement).toEqual(secondButton);

    userEvents.tab();
    const lastButton = screen.getByTestId(/last/i);
    expect(document.activeElement).toEqual(lastButton);

    userEvents.tab();
    expect(document.activeElement).toEqual(firstButton);

    userEvents.tab({ shift: true });
    expect(document.activeElement).toEqual(lastButton);
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
