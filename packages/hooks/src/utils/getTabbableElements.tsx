import { isElementVisible } from '.';
import { focusableDOMElements } from '..';

export const getTabbableElements = (node: HTMLElement): HTMLElement[] => {
  const tabbableDOMElementsStr = focusableDOMElements.join(
    ':not([hidden]):not([tabindex="-1"]),'
  );

  const nodeList = node.querySelectorAll(tabbableDOMElementsStr);
  const iteratableNodeList = Array.prototype.slice.call(nodeList);
  return iteratableNodeList.filter(isElementVisible);
};
