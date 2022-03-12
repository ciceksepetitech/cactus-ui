import { useRef, useCallback, useEffect } from 'react';

export type UseIsMounted = () => boolean;

/**
 * returns a memoized callback function to
 * retrieve isMounted boolean value. returns true if mounted, otherwise false
 */
export function useIsMounted(initial = false): UseIsMounted {
  const isMounted = useRef(initial);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return useCallback(() => isMounted.current, []);
}
