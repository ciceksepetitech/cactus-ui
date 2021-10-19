import { useState, useCallback } from 'react';

/**
 * force updates the component when needed
 * for example, setting some state to ref and need to update when ref changed
 *
 * @returns function
 */
export function useForceUpdate(): () => void {
  const [, setState] = useState();

  const forceUpdate = useCallback(() => {
    setState(Object.create(null));
  }, []);

  return forceUpdate;
}
