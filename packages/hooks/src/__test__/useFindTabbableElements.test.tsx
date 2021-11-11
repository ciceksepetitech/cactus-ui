import React, { useRef } from 'react';
import { useFindTabbableElements } from '..';
import { render, screen, cleanup } from '@cs/component-utils';

describe('useFindTabbableElements hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect useFindTabbableElements to return tabbable elements', () => {
    render(<Component />);

    const focusables = screen.getAllByText(/focusable/i);
    const unfocusables = screen.queryAllByText(/unfocusable/i);

    expect(focusables).toHaveLength(2);
    expect(unfocusables).toHaveLength(0);
  });

  test('expect useFindTabbableElements not to return tabbable elements when ref is not provided', () => {
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

  test('expect useFindTabbableElements not to return tabbable elements when ref.current is null', () => {
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

const ui = ({ ref, tabbableElements }: any) => (
  <div ref={ref}>
    <button data-testid="focusable">button</button>
    <button data-testid="focusable">button</button>
    <p data-testid="unfocusable">text</p>
    <span data-testid="unfocusable">text</span>

    <ul>
      {tabbableElements?.map((each, index) => (
        <li key={index}>{each.dataset.testid}</li>
      ))}
    </ul>
  </div>
);

const Component = () => {
  const ref = useRef();
  const { tabbableElements } = useFindTabbableElements(ref);
  return ui({ ref, tabbableElements });
};

const ComponentWithNoRef = () => {
  const ref = useRef();
  const useFindTabbableElementsClone: any = useFindTabbableElements;
  const { tabbableElements } = useFindTabbableElementsClone();
  return ui({ ref, tabbableElements });
};

const ComponentWithNullRef = () => {
  const ref = useRef(null);
  const useFindTabbableElementsClone: any = useFindTabbableElements;
  const { tabbableElements } = useFindTabbableElementsClone(ref);
  return ui({ tabbableElements });
};
