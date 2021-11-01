import React, { useRef } from 'react';
import { useFindFocusableElements } from '..';
import { render, screen, cleanup } from '@cs/component-utils';

describe('useFindFocusableElements hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect useFindFocusableElements to return focusable elements', () => {
    render(<Component />);

    const focusables = screen.getAllByText(/focusable/i);
    const unfocusables = screen.queryAllByText(/unfocusable/i);

    expect(focusables).toHaveLength(2);
    expect(unfocusables).toHaveLength(0);
  });

  test('expect useFindFocusableElements not to return focusable elements when ref is not provided', () => {
    const consoleWarnMock = jest
      .spyOn(global.console, 'warn')
      .mockImplementation();

    render(<ComponentWithNoRef />);

    const focusables = screen.queryAllByText(/focusable/i);
    const unfocusables = screen.queryAllByText(/unfocusable/i);

    expect(focusables).toHaveLength(0);
    expect(unfocusables).toHaveLength(0);
    expect(consoleWarnMock).toBeCalled();

    consoleWarnMock.mockRestore();
  });

  test('expect useFindFocusableElements not to return focusable elements when ref.current is null', () => {
    const consoleWarnMock = jest
      .spyOn(global.console, 'warn')
      .mockImplementation();

    render(<ComponentWithNullRef />);

    const focusables = screen.queryAllByText(/focusable/i);
    const unfocusables = screen.queryAllByText(/unfocusable/i);

    expect(focusables).toHaveLength(0);
    expect(unfocusables).toHaveLength(0);
    expect(consoleWarnMock).toBeCalled();

    consoleWarnMock.mockRestore();
  });
});

const ui = ({ ref, focusableElements }: any) => (
  <div ref={ref}>
    <button data-testid="focusable">button</button>
    <button data-testid="focusable">button</button>
    <p data-testid="unfocusable">text</p>
    <span data-testid="unfocusable">text</span>

    <ul>
      {focusableElements.map((each, index) => (
        <li key={index}>{each.dataset.testid}</li>
      ))}
    </ul>
  </div>
);

const Component = () => {
  const ref = useRef();
  const { focusableElements } = useFindFocusableElements(ref);
  return ui({ ref, focusableElements });
};

const ComponentWithNoRef = () => {
  const ref = useRef();
  const useFindFocusableElementsClone: any = useFindFocusableElements;
  const { focusableElements } = useFindFocusableElementsClone();
  return ui({ ref, focusableElements });
};

const ComponentWithNullRef = () => {
  const ref = useRef(null);
  const useFindFocusableElementsClone: any = useFindFocusableElements;
  const { focusableElements } = useFindFocusableElementsClone(ref);
  return ui({ focusableElements });
};
