import React from 'react';
import { axe } from 'jest-axe';
import AlertDialog from '..';
import { render, cleanup } from '@cs/component-utils';

let consoleWarn;
let consoleError;

describe('alert dialog component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  beforeEach(() => {
    consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
    consoleError = jest.spyOn(global.console, 'error').mockImplementation();
  });

  test('alertDialog component should warn when aria attributes are not provided', () => {
    render(<Component open />);
    expect(consoleWarn).toBeCalled();
  });

  test('alertDialog component should warn when aria-describedby is not provided', () => {
    render(<Component open aria-label="some label" />);
    expect(consoleWarn).toBeCalled();
  });

  test('alertDialog component should log error when at least one focusable element is not provided', () => {
    render(
      <ComponentWithNoFocusableElement open aria-describedby="some desc" />
    );

    expect(consoleError).toBeCalled();
  });

  test('alertDialog component should not warn in production', () => {
    process.env.NODE_ENV = 'production';

    render(<Component open />);
    expect(consoleWarn).not.toBeCalled();
    process.env.NODE_ENV = 'test';
  });

  test('alertDialog component should warn when aria-label and aria-labelledby provided at the same time', () => {
    render(
      <Component open aria-labelledby="some label" aria-label="some label" />
    );

    expect(consoleWarn).toBeCalled();
  });

  test('alertDialog should pass a11y', async () => {
    const { container } = render(<Component />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const Alert = () => (
  <p id="alert-desc">
    Lorem incididunt ipsum in nostrud. Nisi commodo aliqua magna exercitation
    exercitation dolore minim commodo adipisicing veniam eiusmod ut aute ad.
    Consectetur consectetur enim nostrud duis laboris ex fugiat consequat veniam
    excepteur quis. Aute veniam voluptate deserunt commodo aliquip amet enim
    cillum magna proident.
  </p>
);

const Component = ({ ...rest }) => {
  return (
    <AlertDialog open {...rest}>
      <Alert />
      <button>Confirm</button>
    </AlertDialog>
  );
};

const ComponentWithNoFocusableElement = ({ ...rest }) => {
  return (
    <AlertDialog open {...rest}>
      <Alert />
    </AlertDialog>
  );
};
