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
});

const Component = () => {
  const ref = useRef();
  const { focusableElements } = useFindFocusableElements(ref);

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
