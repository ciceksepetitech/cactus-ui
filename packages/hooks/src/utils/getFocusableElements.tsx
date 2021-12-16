import { focusableDOMElements } from '..';

export const getFocusableElements = (node: HTMLElement): HTMLElement[] => {
  const focusableDOMElementsStr =
    focusableDOMElements.join(':not([hidden]),') +
    ',[tabindex]:not([disabled]):not([hidden])';

  const nodeList = node.querySelectorAll(focusableDOMElementsStr);
  return Array.prototype.slice.call(nodeList);
};
