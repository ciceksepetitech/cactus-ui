import React, { useRef, useCallback, useState } from 'react';
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

  test('expect useFindTabbableElements not to return tabbable elements when node is not provided', () => {
    render(<ComponentWithNoNode />);

    const focusables = screen.queryAllByText(/focusable/i);
    const unfocusables = screen.queryAllByText(/unfocusable/i);

    expect(focusables).toHaveLength(0);
    expect(unfocusables).toHaveLength(0);
  });
});

const Component = () => {
  const ref = useRef(null);
  const [refNode, setRefNode] = useState<HTMLElement>();
  const { tabbableElements } = useFindTabbableElements(refNode);

  const refCallback = useCallback((node: any) => {
    ref.current = node;
    setRefNode(node);
  }, []);

  return (
    <div ref={refCallback}>
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
};

const ComponentWithNoNode = () => {
  const { tabbableElements } = useFindTabbableElements(null);

  return (
    <div>
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
};
