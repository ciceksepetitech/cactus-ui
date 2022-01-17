import React, { useCallback, useRef, useState } from 'react';
import { useFindFocusableElements } from '..';
import { render, screen, cleanup } from '@ciceksepeti/cui-utils';

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

  test('expect useFindFocusableElements not to return focusable elements when node is not provided', () => {
    render(<ComponentWithNoRef />);

    const focusables = screen.queryAllByText(/focusable/i);
    const unfocusables = screen.queryAllByText(/unfocusable/i);

    expect(focusables).toHaveLength(0);
    expect(unfocusables).toHaveLength(0);
  });
});

const Component = () => {
  const ref = useRef(null);
  const [refNode, setRefNode] = useState<HTMLElement>();
  const { focusableElements } = useFindFocusableElements(refNode);

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
        {focusableElements?.map((each, index) => (
          <li key={index}>{each.dataset.testid}</li>
        ))}
      </ul>
    </div>
  );
};

const ComponentWithNoRef = () => {
  const { focusableElements } = useFindFocusableElements(null);

  return (
    <div>
      <button data-testid="focusable">button</button>
      <button data-testid="focusable">button</button>
      <p data-testid="unfocusable">text</p>
      <span data-testid="unfocusable">text</span>

      <ul>
        {focusableElements?.map((each, index) => (
          <li key={index}>{each.dataset.testid}</li>
        ))}
      </ul>
    </div>
  );
};
