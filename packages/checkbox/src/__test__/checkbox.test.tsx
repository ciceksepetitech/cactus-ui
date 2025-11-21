import React, { useState } from 'react';
import Checkbox from '..';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, waitFor } from '../../../../utils/test-setup';

describe('checkbox component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('checkbox should pass a11y on first render', async () => {
    const { container } = render(<Component />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('checkbox status change should respect to a11y', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component />);

    const checkboxWrapper = screen.getByTestId(/rose/i);
    await user.click(checkboxWrapper);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('checkbox indeterminate can be set', async () => {
    render(<Component indeterminate />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('mixed');
  });

  test('checkbox should be focused when tab key pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    await user.tab();
    expect(document.activeElement).toEqual(screen.getByRole('checkbox'));
  });

  test('checkbox change state when space key pressed', async () => {
    const user = userEvent.setup();
    render(<Component defaultChecked={true} />);

    const checkbox = screen.getByRole('checkbox');
    expect(checkbox).toBeChecked();

    await user.tab();
    expect(document.activeElement).toEqual(checkbox);
    await user.keyboard(' ');
    await waitFor(() => {
      expect(checkbox).not.toBeChecked();
    });
  });

  test('checkbox can also be controlled', async () => {
    const user = userEvent.setup();
    render(<ControlledComponent />);

    const checkboxWrapper = screen.getByTestId(/rose/i);
    const checkbox = screen.getByRole('checkbox');
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
    await user.click(checkboxWrapper);
    expect(checkbox.getAttribute('aria-checked')).toBe('true');
  });

  test('checkbox should not be focused when clicked outside', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const checkbox = screen.getByRole('checkbox');
    const clickme = screen.getByTestId(/clickme/i);

    await user.tab();
    expect(document.activeElement).toEqual(checkbox);

    await user.click(clickme);
    expect(document.activeElement).not.toEqual(checkbox);
  });

  test('checkbox should not change state when disabled', async () => {
    const user = userEvent.setup();
    render(<Component disabled />);

    const checkbox = screen.getByRole('checkbox');
    const checkboxWrapper = screen.getByTestId(/rose/i);

    await user.click(checkboxWrapper);
    expect(checkbox.getAttribute('aria-checked')).toBe('false');
  });
});

const Component = (props) => (
  <div>
    <Checkbox data-testid="rose" id="rose" value="rose" {...props} />
    <label htmlFor="rose">rose</label>
    <button data-testid="clickme">click me</button>
  </div>
);

const ControlledComponent = (props) => {
  const [checked, setChecked] = useState(false);

  return (
    <div>
      <Checkbox
        id="rose"
        value="rose"
        checked={checked}
        data-testid="rose"
        onChange={() => setChecked(!checked)}
        {...props}
      />
      <label htmlFor="rose">rose</label>
    </div>
  );
};
