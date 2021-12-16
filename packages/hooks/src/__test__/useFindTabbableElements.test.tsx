import React, { useRef, useEffect, useState } from 'react';
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
});

const Component = () => {
  const ref = useRef(null);
  const [tabbableElements, setTabbableElements] = useState([]);
  const { getTabbableElements } = useFindTabbableElements(ref);

  useEffect(() => {
    setTabbableElements(getTabbableElements());
  }, [getTabbableElements]);

  return (
    <div ref={ref}>
      <button data-testid="focusable">button</button>
      <button data-testid="focusable">button</button>
      <p data-testid="unfocusable">text</p>
      <span data-testid="unfocusable">text</span>

      <ul>
        {tabbableElements.map((each, index) => (
          <li key={index}>{each.dataset.testid}</li>
        ))}
      </ul>
    </div>
  );
};

const ComponentWithNoRef = () => {
  const useFindTabbableElementsClone: any = useFindTabbableElements;
  const { getTabbableElements } = useFindTabbableElementsClone();

  return (
    <div>
      <button data-testid="focusable">button</button>
      <button data-testid="focusable">button</button>
      <p data-testid="unfocusable">text</p>
      <span data-testid="unfocusable">text</span>

      <ul>
        {getTabbableElements()?.map((each, index) => (
          <li key={index}>{each.dataset.testid}</li>
        ))}
      </ul>
    </div>
  );
};
