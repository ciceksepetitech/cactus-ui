import { useEffect, useState } from 'react';
import isElementVisible from '../utils/isElementVisible';
import { focusableDOMElements } from '../constants/focusableDOMElements';

/**
 * gets tabbable elements inside of passed nodeRef
 * the element is keyboard focusable ("tabbable"), as it is part of the document's sequential focus navigation order. The element is also focusable by script and possibly the mouse (or pointer).
 * @returns Array<DOMNode>
 */
export function useFindTabbableElements(nodeRef: React.RefObject<HTMLElement>) {
  const [tabbableElements, setTabbableElements] = useState<Array<HTMLElement>>(
    []
  );

  useEffect(() => {
    if (!nodeRef)
      console.warn('useFindTabbableElements: nodeRef is a required field!');

    if (!nodeRef.current)
      console.warn(
        'useFindTabbableElements: nodeRef.current is null or undefined!'
      );

    const tabbableDOMElementsStr = focusableDOMElements.join(
      ':not([hidden]):not([tabindex="-1"]),'
    );

    const nodeList = nodeRef.current.querySelectorAll(tabbableDOMElementsStr);
    const iteratableNodeList = Array.prototype.slice.call(nodeList);
    const _tabbableElements = iteratableNodeList.filter(isElementVisible);

    setTabbableElements(_tabbableElements);
  }, []);

  return { tabbableElements };
}
