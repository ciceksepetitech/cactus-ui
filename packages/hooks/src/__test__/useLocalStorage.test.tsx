import { useLocalStorage } from '..';
import { cleanup, renderHook, act } from '../../../../utils/test-setup';

describe('useLocalStorage hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect returned value to be passed defaultValue', () => {
    const { result } = renderHook(() => useLocalStorage('city', 'istanbul'));
    expect(result.current.value).toBe('istanbul');
  });

  test('expect stored value to be changed', () => {
    const { result } = renderHook(() => useLocalStorage('city', 'istanbul'));

    act(() => result.current.setValue('ankara'));

    expect(result.current.value).toBe('ankara');
  });

  test('expect stored value to be removed', () => {
    const { result } = renderHook(() => useLocalStorage('city', 'istanbul'));

    act(() => result.current.remove());

    expect(result.current.value).not.toBe('istanbul');
  });
});
