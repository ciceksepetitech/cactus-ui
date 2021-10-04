export const checkStyleVisibility = (element: Element) => {
  if (!(element instanceof HTMLElement)) return false;

  const { display, visibility } = window.getComputedStyle(element);

  const isVisible =
    display !== 'none' && visibility !== 'hidden' && visibility !== 'collapse';

  return isVisible;
};

export const isElementVisible = (element: Element) => {
  return (
    element.nodeName !== '#comment' &&
    checkStyleVisibility(element) &&
    !element.hasAttribute('hidden')
  );
};

export default isElementVisible;
