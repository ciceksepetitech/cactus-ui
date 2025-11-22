import { useRef, useEffect } from 'react';

/**
 * holds a value with ref
 * returns it every value change and updates with useEffect
 */
export function usePrevious<T>(value: T): T | undefined {
  const prevRef = useRef<T | undefined>(undefined);

  useEffect(() => {
    prevRef.current = value;
  }, [value]);

  // returns previous value and runs before useEffect
  return prevRef.current;
}
