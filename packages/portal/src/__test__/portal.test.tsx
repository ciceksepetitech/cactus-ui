import React, { useRef } from 'react';
import Portal from '..';
import { axe } from 'jest-axe';
import { render, cleanup, within } from '@ciceksepeti/cui-utils';

describe('portal component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect portal to render inside of specified element by id', () => {
    const { getByTestId } = render(<ById />);
    const { getByText } = within(getByTestId('container'));

    getByText(/i am in a portal/i);
  });

  test('expect portal to render inside of specified element by ref', () => {
    const { getByTestId } = render(<ByRef />);
    const { getByText } = within(getByTestId('container'));

    getByText(/i am in a portal/i);
  });

  test('portal should pass a11y', async () => {
    const { container } = render(<Portal>I am a portal</Portal>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const ById = (props) => (
  <div>
    <div data-testid="container" id="container"></div>
    <Portal containerId="container" {...props}>
      <p>I am in a portal</p>
    </Portal>
  </div>
);

const ByRef = (props) => {
  const ref = useRef();

  return (
    <div>
      <div data-testid="container" ref={ref} {...props}></div>
      <Portal containerRef={ref}>
        <p>I am in a portal</p>
      </Portal>
    </div>
  );
};
