import { useRef, useEffect } from 'react';

/**
 * holds a value with ref
 * returns it every re-render and updates with useEffect
 */
export function usePrevious<T>(prevValue: T): T {
  const prevRef = useRef<T>();

  useEffect(() => {
    prevRef.current = prevValue;
  }, [prevValue]);

  return prevRef.current;
}
