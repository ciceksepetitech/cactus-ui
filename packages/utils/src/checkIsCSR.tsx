/**
 * checks if page is being rendered at client-side
 * @returns boolean
 */
export function checkIsCSR() {
  return !!(
    typeof window !== 'undefined' &&
    window.document &&
    window.document.createElement
  );
}
