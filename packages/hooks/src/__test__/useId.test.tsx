import { useId } from '..';
import { cleanup, renderHook } from '../../../../utils/test-setup';

describe('useId hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect hook to return and string id', () => {
    const initialProps = { value: null };
    const { result, rerender } = renderHook(({ value }) => useId(value), {
      initialProps
    });

    expect(result.current).toBe('1');
    rerender({ value: null });
    expect(result.current).toBe('1');
  });

  test('expect hook to return and string provided id', () => {
    const value = String(Math.random());
    const initialProps = { value };

    const { result, rerender } = renderHook(({ value }) => useId(value), {
      initialProps
    });

    expect(result.current).toBe(value);
    rerender({ value });
    expect(result.current).toBe(value);
  });
});
