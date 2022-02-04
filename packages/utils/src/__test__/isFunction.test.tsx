import { isFunction } from '..';
import { cleanup } from '../../../../utils/test-setup';

describe('isFunction hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('should return true for if passed argument is function', () => {
    const fn = () => {};
    expect(isFunction(fn)).toBe(true);
  });

  test('should return false for if passed argument is not a function', () => {
    const str = '';
    expect(isFunction(str)).toBe(false);
  });
});
