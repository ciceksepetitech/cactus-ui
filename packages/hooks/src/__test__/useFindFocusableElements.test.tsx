import React, { useEffect, useRef, useState } from 'react';
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
});

const Component = () => {
  const ref = useRef(null);
  const [focusableElements, setFocusableElements] = useState([]);
  const { getFocusableElements } = useFindFocusableElements(ref);

  useEffect(() => {
    setFocusableElements(getFocusableElements());
  }, [getFocusableElements]);

  return (
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
};

const ComponentWithNoRef = () => {
  const useFindFocusableElementsClone: any = useFindFocusableElements;
  const { getFocusableElements } = useFindFocusableElementsClone();

  return (
    <div>
      <button data-testid="focusable">button</button>
      <button data-testid="focusable">button</button>
      <p data-testid="unfocusable">text</p>
      <span data-testid="unfocusable">text</span>

      <ul>
        {getFocusableElements()?.map((each, index) => (
          <li key={index}>{each.dataset.testid}</li>
        ))}
      </ul>
    </div>
  );
};
