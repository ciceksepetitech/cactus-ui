import React, { useState } from 'react';
import Dialog from '..';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, cleanup, screen, waitFor } from '../../../../utils/test-setup';

let consoleWarn;
let consoleError;

describe('dialog component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  beforeEach(() => {
    consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
    consoleError = jest.spyOn(global.console, 'error').mockImplementation();
  });

  test('dialog component can have a11y attributes', () => {
    render(
      <Component open aria-labelledby="title">
        <h1 data-testid="title" id="title">
          I am a title
        </h1>
      </Component>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'title');

    screen.getByText(/i am a title/i);
  });

  test('dialog component should not render children when closed', () => {
    render(<Component open={false}>I am a dialog</Component>);
    expect(screen.queryByText(/i am a dialog/i)).toBe(null);
  });

  test('dialog component should warn when aria attributes are not provided', () => {
    render(<Component open>I am a dialog</Component>);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('dialog component should not warn in production', () => {
    process.env.NODE_ENV = 'production';
    render(<Component open>I am a dialog</Component>);
    expect(consoleWarn).not.toHaveBeenCalled();
    process.env.NODE_ENV = 'test';
  });

  test('dialog component should warn when aria-label and aria-labelledby provided at the same time', () => {
    render(
      <Component open aria-labelledby="some label" aria-label="some label">
        I am a dialog
      </Component>
    );

    expect(consoleWarn).toHaveBeenCalled();
  });

  test('dialog should pass a11y', async () => {
    const { container } = render(<Component open>I am a dialog</Component>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('dialog should unmount when escape is pressed', async () => {
    const user = userEvent.setup();
    render(<Component open>I am a dialog</Component>);
    screen.getByText(/i am a dialog/i);
    await user.keyboard('{Escape}');
    await waitFor(() => {
      expect(screen.queryByText(/i am a dialog/i)).not.toBeInTheDocument();
    });
  });

  test('dialog should not unmount when other then escape button is pressed', async () => {
    const user = userEvent.setup();
    render(<Component open>I am a dialog</Component>);
    screen.getByText(/i am a dialog/i);
    await user.keyboard('{space}');
    expect(screen.queryByText(/i am a dialog/i)).toBeInTheDocument();
  });

  test('dialog should not unmount when escape is pressed if onEscapeKey is not provided', async () => {
    const user = userEvent.setup();
    render(
      <Component open onEscapeKey={undefined}>
        I am a dialog
      </Component>
    );

    screen.getByText(/i am a dialog/i);
    await user.keyboard('{esc}');
    expect(screen.queryByText(/i am a dialog/i)).toBeInTheDocument();
  });

  test('dialog should unmount when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Component open>I am a dialog</Component>);
    screen.getByText(/i am a dialog/i);
    const overlay = document.querySelector("[data-cui-dialog-overlay='true']");
    expect(overlay).not.toBeNull();
    await user.click(overlay!);
    expect(screen.queryByText(/i am a dialog/i)).not.toBeInTheDocument();
  });

  test('dialog should not unmount when other then overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<Component open>I am a dialog</Component>);
    screen.getByText(/i am a dialog/i);
    const content = document.querySelector("[data-cui-dialog-content='true']");
    expect(content).not.toBeNull();
    await user.click(content!);
    expect(screen.queryByText(/i am a dialog/i)).toBeInTheDocument();
  });

  test('dialog should not mount when invalid children is provided', async () => {
    render(
      <Component open>
        {function invalid() {
          <span>I am a dialog</span>;
        }}
      </Component>
    );

    const children = screen.queryByText(/i am a dialog/i);
    expect(children).not.toBeInTheDocument();
    expect(consoleError).toHaveBeenCalled();
  });

  test('dialog should not unmount when overlay is clicked if onClickOutside not provided', async () => {
    const user = userEvent.setup();
    render(
      <Component open onClickOutside={undefined}>
        I am a dialog
      </Component>
    );

    screen.getByText(/i am a dialog/i);
    const overlay = document.querySelector("[data-cui-dialog-overlay='true']");
    expect(overlay).not.toBeNull();
    await user.click(overlay!);
    expect(screen.queryByText(/i am a dialog/i)).toBeInTheDocument();
  });
});

const Component = ({ open, children, ...rest }) => {
  const [isOpen, setIsOpen] = useState(open);

  const onEscapeKey = () => {
    setIsOpen(false);
  };

  const onClickOutside = () => {
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onEscapeKey={onEscapeKey}
      onClickOutside={onClickOutside}
      {...rest}
    >
      {children}
    </Dialog>
  );
};
