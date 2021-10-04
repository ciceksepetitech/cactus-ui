import { useEffect, useState } from 'react';
import { focusableDOMElements } from '../constants/focusableDOMElements';

/**
 * gets focusable elements inside of passed nodeRef
 * the element can be focused by script (element.focus()) and possibly the mouse (or pointer), but not the keyboard.
 * @returns Array<DOMNode>
 */
export function useFindFocusableElements(
  nodeRef: React.RefObject<HTMLElement>
) {
  const [focusableElements, setFocusableElements] = useState<
    Array<HTMLElement>
  >([]);

  useEffect(() => {
    if (!nodeRef)
      console.warn('useFindFocusableElements: nodeRef is a required field!');

    if (!nodeRef.current)
      console.warn(
        'useFindFocusableElements: nodeRef.current is null or undefined!'
      );

    const focusableDOMElementsStr =
      focusableDOMElements.join(':not([hidden]),') +
      ',[tabindex]:not([disabled]):not([hidden])';

    const nodeList = nodeRef.current.querySelectorAll(focusableDOMElementsStr);
    setFocusableElements(Array.prototype.slice.call(nodeList));
  }, [nodeRef?.current]);

  return { focusableElements };
}
