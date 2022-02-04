import { useRef, MutableRefObject } from 'react';

/**
 * stores latest value with ref
 * useful to get access to the latest value of some props or state inside an async callback, instead of at the time the callback was created.
 */
export function useLatestValue<T>(value: T): MutableRefObject<T> {
  const ref = useRef<T>(value);
  ref.current = value;
  return ref;
}
