import { useRef, MutableRefObject } from 'react';
import { useIsomorphicLayoutEffect } from '../useIsomorphicLayoutEffect';

/**
 * stores latest value with ref
 */
export function useLatestValue<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>();

  useIsomorphicLayoutEffect(() => {
    ref.current = value;
  });

  return ref;
}
