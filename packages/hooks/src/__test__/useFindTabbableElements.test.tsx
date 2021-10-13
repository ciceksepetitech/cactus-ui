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
});

const Component = () => {
  const ref = useRef();
  const { tabbableElements } = useFindTabbableElements(ref);

  return (
    <div ref={ref}>
      <button data-testid="focusable">button</button>
      <button data-testid="focusable">button</button>
      <button data-testid="focusable" tabIndex={-1}>
        button
      </button>
      <button data-testid="focusable" style={{ visibility: 'hidden' }}>
        button
      </button>
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
