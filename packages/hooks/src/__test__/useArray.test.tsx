import { useArray } from '..';
import { cleanup, reactHooks } from '@ciceksepeti/cui-utils';

const { renderHook, act } = reactHooks;

describe('useArray hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect return value to equal initial value', () => {
    const mockArray = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useArray(mockArray));

    expect(result.current.value).toBe(mockArray);
  });

  test('expect push function to add new value', () => {
    const mockArray = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useArray(mockArray));

    act(() => result.current.push(6));
    expect(result.current.value).toContain(6);
  });

  test('expect remove function to remove value via index', () => {
    const mockArray = [1, 2, 3, 4, 5];
    const { result } = renderHook(() => useArray(mockArray));

    act(() => result.current.remove(0));
    expect(result.current.value).not.toContain(1);
  });

  test('expect set function to set new array', () => {
    const mockArray = [1, 2, 3, 4, 5];
    const newArray = [6, 7, 8, 9, 10];

    const { result } = renderHook(() => useArray(mockArray));

    act(() => result.current.set(newArray));
    expect(result.current.value).toBe(newArray);
  });

  test('expect clear function to clear array', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    act(() => result.current.clear());
    expect(result.current.isEmpty()).toBe(true);
  });

  test('expect includes function to return boolean', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    expect(result.current.includes(1)).toBe(true);
    expect(result.current.includes(6)).toBe(false);
  });

  test('expect map function to return new array', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    let mappedArray;

    act(() => {
      mappedArray = result.current.map((num) => num * num);
    });

    expect(mappedArray.includes(5)).toBe(false);
    expect(mappedArray.includes(25)).toBe(true);
  });

  test('expect filter function to return new array with filtered values', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    let filteredArray;

    act(() => {
      filteredArray = result.current.filter((num) => num > 3);
    });

    expect(filteredArray.includes(2)).toBe(false);
    expect(filteredArray.includes(4)).toBe(true);
  });

  test('expect isEmpty function to return false when array has values', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    expect(result.current.isEmpty()).toBe(false);
  });

  test('expect find function to return searched value', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    let found;

    act(() => {
      found = result.current.find((num) => num === 3);
    });

    expect(found).toBe(3);
  });

  test('expect findIndex function to return searched value index', () => {
    const mockArray = [1, 2, 3, 4, 5];

    const { result } = renderHook(() => useArray(mockArray));

    let foundIndex;

    act(() => {
      foundIndex = result.current.findIndex((num) => num === 3);
    });

    expect(foundIndex).toBe(2);
  });
});
