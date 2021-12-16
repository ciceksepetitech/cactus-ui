import { useCallback, useEffect } from 'react';
import isElementVisible from '../utils/isElementVisible';
import { focusableDOMElements } from '../constants/focusableDOMElements';

/**
 * gets tabbable elements inside of passed nodeRef
 * the element is keyboard focusable ("tabbable"), as it is part of the document's sequential focus navigation order. The element is also focusable by script and possibly the mouse (or pointer)
 *
 * @returns Array<DOMNode>
 */
export function useFindTabbableElements(
  nodeRef: React.RefObject<HTMLElement>
): { getTabbableElements: () => HTMLElement[] } {
  /**
   * handles warnings and creates node list
   */
  useEffect(() => {
    if (!nodeRef) {
      console.warn('useFindTabbableElements: nodeRef is a required field!');
      return;
    }

    if (!nodeRef.current) {
      console.warn(
        'useFindTabbableElements: nodeRef.current is null or undefined!'
      );
    }
  }, []);

  const getTabbableElements = useCallback(() => {
    if (!nodeRef || !nodeRef.current) return;

    const tabbableDOMElementsStr = focusableDOMElements.join(
      ':not([hidden]):not([tabindex="-1"]),'
    );

    const nodeList = nodeRef.current.querySelectorAll(tabbableDOMElementsStr);
    const iteratableNodeList = Array.prototype.slice.call(nodeList);
    return iteratableNodeList.filter(isElementVisible);
  }, []);

  return { getTabbableElements };
}
