import { getTabbableElements } from '..';
import { useCallback, useEffect, useState } from 'react';

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

  const updateTabbableElements = useCallback(() => {
    if (!node) return;
    const _tabbableElements = getTabbableElements(node);
    setTabbableElements(_tabbableElements);
  }, [node]);

  /**
   * creates node list and adds mutation observer to update tabbable elements when there is a change in attributes
   */
  useEffect(() => {
    if (!node) return;
    updateTabbableElements();
    const observer = new MutationObserver(updateTabbableElements);

    observer.observe(node, {
      subtree: true,
      childList: true,
      attributeFilter: ['disabled'],
    });

    return () => observer.disconnect();
  }, [node, updateTabbableElements]);

  return { tabbableElements };
}
