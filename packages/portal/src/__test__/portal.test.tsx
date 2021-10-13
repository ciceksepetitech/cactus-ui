import React, { useRef } from 'react';
import Portal from '..';
import { render, cleanup, within } from '@cs/component-utils';

describe('Portal component tests', () => {
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
});

const ById = () => (
  <div>
    <div data-testid="container" id="container"></div>
    <Portal containerId="container">
      <p>I am in a portal</p>
    </Portal>
  </div>
);

const ByRef = () => {
  const ref = useRef();

  return (
    <div>
      <div data-testid="container" ref={ref}></div>
      <Portal containerRef={ref}>
        <p>I am in a portal</p>
      </Portal>
    </div>
  );
};
