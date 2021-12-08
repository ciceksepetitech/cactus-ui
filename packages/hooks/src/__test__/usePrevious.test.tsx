import { usePrevious } from '..';
import { cleanup, reactHooks } from '@cs/component-utils';

const { renderHook } = reactHooks;

describe('usePrevious hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect hooks to respect previous values', () => {
    const { result, rerender } = renderHook(({ value }) => usePrevious(value), {
      initialProps: { value: 'value' }
    });

    expect(result.current).toBe(undefined);

    rerender({ value: 'next value' });
    expect(result.current).toBe('value');
  });
});
