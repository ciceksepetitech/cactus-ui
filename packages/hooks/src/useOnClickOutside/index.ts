import { RefObject, useCallback } from 'react';
import { useEventListener } from '..';
import { useLatestValue } from '../useLatestValue';

/**
 * captures outside click of specified area
 * calls handler when outside of a specified area is clicked or touched
 */
export function useOnClickOutside<T extends HTMLElement = HTMLElement>(
  specifiedNodeRef: RefObject<T>,
  callback: (event: MouseEvent | TouchEvent) => void
): void {
  const callbackRef =
    useLatestValue<(event: MouseEvent | TouchEvent) => void>(callback);

  const listener = useCallback((event: MouseEvent | TouchEvent) => {
    const specifiedNode = specifiedNodeRef?.current;
    const target = event.target as Node;

    if (!specifiedNode || specifiedNode.contains(target)) return;

    callbackRef.current(event);
  }, []);

  useEventListener({
    listener,
    name: 'mousedown'
  });

  useEventListener({
    listener,
    name: 'touchstart'
  });
}
