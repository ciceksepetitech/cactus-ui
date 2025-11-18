import { MutableRefObject, useEffect, LegacyRef, useRef } from 'react';

/**
 * combines all passed props
 * usefull when React.forwardRef and internal ref is needed at the same time
 *
 * @returns React.RefCallback<T>
 */
export function useCombinedRefs<T = any>(
  ...refs: Array<MutableRefObject<T> | LegacyRef<T>>
): MutableRefObject<T> {
  const internalRef = useRef<T>(null as T);

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === 'function') ref(internalRef.current);
      else (ref as MutableRefObject<T | null>).current = internalRef.current;
    });
  }, [refs]);

  return internalRef;
}
