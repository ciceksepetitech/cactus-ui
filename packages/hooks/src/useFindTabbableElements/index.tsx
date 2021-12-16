import { getTabbableElements } from '..';
import { useEffect, useState } from 'react';

/**
 * gets tabbable elements inside of passed nodeRef
 * the element is keyboard focusable ("tabbable"), as it is part of the document's sequential focus navigation order. The element is also focusable by script and possibly the mouse (or pointer)
 *
 * @returns Array<DOMNode>
 */
export function useFindTabbableElements(node: HTMLElement): {
  tabbableElements: HTMLElement[];
} {
  const [tabbableElements, setTabbableElements] =
    useState<Array<HTMLElement>>();

  /**
   * creates node list
   */
  useEffect(() => {
    if (!node) return;
    const _tabbableElements = getTabbableElements(node);
    setTabbableElements(_tabbableElements);
  }, [node]);

  return { tabbableElements };
}
