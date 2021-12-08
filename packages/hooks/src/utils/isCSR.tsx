/**
 * checks if page is being rendered at client-side or server-side
 * if returns true, it is client-side otherwise server-side
 *
 * @returns boolean
 */
export const isCSR = !!(
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement
);

export default isCSR;
