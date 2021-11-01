import { isElementVisible } from '../utils';
import { cleanup } from '@cs/component-utils';

describe('isElementVisible utility tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect isElementVisible to return false if element is not instance of HTMLElement', () => {
    const p = '<p>some text</p>' as unknown as HTMLElement;
    expect(isElementVisible(p)).toBe(false);
  });

  test('expect isElementVisible to return boolean for visibility of an element', () => {
    const p = document.createElement('p');

    p.style.visibility = 'hidden';
    expect(isElementVisible(p)).toBe(false);

    p.style.visibility = 'visible';
    expect(isElementVisible(p)).toBe(true);
  });
});
