import { useEffect, MutableRefObject, RefObject } from 'react';
import { isCSR } from '@cs/component-utils';
import { useLatestValue } from '../useLatestValue';

interface IUseEventListener {
  condition?: boolean;
  listener: EventListener;
  options?: AddEventListenerOptions;
  name: keyof HTMLElementEventMap | string; // string for custom events
  target?:
    | Window
    | Document
    | EventTarget
    | HTMLElement
    | RefObject<any>
    | typeof globalThis
    | MutableRefObject<any>;
}

/**
 * mounts and unmounts even listeners
 * stores all params in refs to avoid re-running effect for every render
 */
export function useEventListener({
  name,
  options,
  listener,
  condition = true,
  target = isCSR ? window : undefined
}: IUseEventListener) {
  const listenerRef = useLatestValue<EventListener>(listener);
  const optionsRef = useLatestValue<EventListenerOptions>(options);

  useEffect(() => {
    if (!target || !condition) return undefined;

    const _options = optionsRef.current;
    const _target = 'current' in target ? target.current : target;

    const eventListener = (event: Event) => listenerRef.current(event);
    _target.addEventListener(name, eventListener, _options);
    return () => _target.removeEventListener(name, eventListener, _options);
  }, [name, condition, target]);
}
