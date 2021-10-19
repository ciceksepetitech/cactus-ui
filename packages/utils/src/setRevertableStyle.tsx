/**
 * takes html element, style and value for that style
 * sets the provided style and returns function to revert it when called
 *s
 * @param element HTMLElement
 * @param style string
 * @param value string
 * @returns function
 */
export const setRevertableStyle = (
  element: HTMLElement,
  style: string,
  value: string
): (() => void) => {
  const prevStyle = element.style[style];
  element.style[style] = value;
  return () => (element.style[style] = prevStyle);
};
