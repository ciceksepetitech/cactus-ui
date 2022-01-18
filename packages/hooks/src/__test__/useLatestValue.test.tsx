import { useLatestValue } from '..';
import { cleanup, reactHooks } from '../../../../utils/test-setup';

const { renderHook } = reactHooks;

describe('useLatestValue hook tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('expect hook to respect passed values', () => {
    const { result, rerender } = renderHook(
      ({ value }) => useLatestValue(value),
      { initialProps: { value: 'value' } }
    );

    expect(result.current.current).toBe('value');

    rerender({ value: 'new value' });
    expect(result.current.current).toBe('new value');
  });
});
