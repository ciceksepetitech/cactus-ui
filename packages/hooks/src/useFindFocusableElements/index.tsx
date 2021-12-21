import { getFocusableElements } from '..';
import { useEffect, useState } from 'react';

/**
 * gets focusable elements inside of passed nodeRef
 * the element can be focused by script (element.focus()) and possibly the mouse (or pointer), but not the keyboard
 *
 * @returns Array<DOMNode>
 */
export function useFindFocusableElements(node: HTMLElement): {
  focusableElements: HTMLElement[];
} {
  const [focusableElements, setFocusableElements] =
    useState<Array<HTMLElement>>();

  /**
   * creates node list
   */
  useEffect(() => {
    if (!node) return;
    const _focusableEleemnts = getFocusableElements(node);
    setFocusableElements(Array.prototype.slice.call(_focusableEleemnts));
  }, [node]);

  return { focusableElements };
}
