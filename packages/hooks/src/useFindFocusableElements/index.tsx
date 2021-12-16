import { useEffect, useState } from 'react';
import { focusableDOMElements } from '../constants/focusableDOMElements';

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

    const focusableDOMElementsStr =
      focusableDOMElements.join(':not([hidden]),') +
      ',[tabindex]:not([disabled]):not([hidden])';

    const nodeList = node.querySelectorAll(focusableDOMElementsStr);
    setFocusableElements(Array.prototype.slice.call(nodeList));
  }, [node]);

  return { focusableElements };
}
