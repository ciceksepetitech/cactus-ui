/**
 * checks the visibility of element by using computed style on it
 *
 * @param element
 * @returns boolean
 */
export const checkStyleVisibility = (element: Element): boolean => {
  if (!(element instanceof HTMLElement)) return false;

  const { display, visibility } = window.getComputedStyle(element);

  const isVisible =
    display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';

  return isVisible;
};

/**
 * checks if element is visible on UI
 *
 * @param element
 * @returns boolean
 */
export const isElementVisible = (element: Element): boolean =>
  element.nodeName !== '#comment' &&
  checkStyleVisibility(element) &&
  !element.hasAttribute('hidden');

export default isElementVisible;
