/**
 * @ciceksepeti/cui-alert
 *
 * Accessible Alert Component
 *
 * Clones components to specific aria-live regions to make it possible to announce alert with appropriate attributes
 *
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#alert
 */

import React, {
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  cloneElement
} from 'react';
import ReactDOM from 'react-dom/client';
import { useCombinedRefs } from '@ciceksepeti/cui-hooks';
import VisuallyHidden from '@ciceksepeti/cui-visually-hidden';
import { PolymorphicComponentProps } from '@ciceksepeti/cui-utils';

/**
 * for multiple alerts in a same liveRegionType,
 * holds key number to have unique index in liveRegionContainerElements
 */
const liveRegionCount: LiveRegionKeys = {
  off: 0,
  polite: 0,
  assertive: 0
};

/**
 * holds references to each created alert by its liveRegionType
 */
const liveRegionContainerElements: LiveRegionElements = {
  off: {},
  polite: {},
  assertive: {}
};

/**
 * holds references to created live region containers for each liveRegionType
 */
const liveRegionContainers: LiveRegionElementTypes = {
  off: null,
  polite: null,
  assertive: null
};

/**
 * holds references to created live roots
 */
const liveRegionRoots: LiveRegionRoots = {
  off: null,
  polite: null,
  assertive: null
};

/**
 * creates functions for a created alert
 * @param liveRegionType
 * @returns CloneRef
 */
const createCloneFunctions = (liveRegionType: LiveRegionType): CloneRef => {
  const key = ++liveRegionCount[liveRegionType];
  const regionElements = liveRegionContainerElements[liveRegionType];

  /**
   * adds alert to liveRegionContainerElements by its liveRegionType,
   * than re-renders alerts
   * @param element
   */
  const addToLiveRegion = (element: React.ReactElement) => {
    regionElements[key] = element;
    renderAlertsToRegions();
  };

  /**
   * clones the children to specified live region
   * @param element
   * @returns
   */
  const clone = (element: React.ReactElement) => {
    if (liveRegionContainers[liveRegionType]) {
      addToLiveRegion(element);
      return;
    }

    const liveRegionContainer = document.createElement('div');
    liveRegionContainer.setAttribute(`data-cui-live-${liveRegionType}`, 'true');
    liveRegionContainers[liveRegionType] = liveRegionContainer;
    document.body.appendChild(liveRegionContainers[liveRegionType]);

    addToLiveRegion(element);
  };

  /**
   * removes alert from live region when it is unmounted
   */
  const remove = () => {
    delete regionElements[key];
    renderAlertsToRegions();
  };

  return { clone, remove };
};

/**
 * renders all alerts in liveRegionContainerElements
 * by alerts liveRegionType as visually hidden
 */
const renderAlertsToRegions = () => {
  Object.keys(liveRegionContainerElements).forEach((elementType) => {
    const liveRegionType: LiveRegionType = elementType as LiveRegionType;
    const container = liveRegionContainers[liveRegionType];
    const regionElements = liveRegionContainerElements[liveRegionType];

    if (container) {
      let root = liveRegionRoots[liveRegionType];

      if (!root) {
        const _root = ReactDOM.createRoot(container as Element);
        liveRegionRoots[liveRegionType] = _root;
        root = _root;
      }

      root.render(
        <VisuallyHidden as="div">
          <div
            aria-live={liveRegionType}
            aria-roledescription="alert box"
            role={liveRegionType === 'assertive' ? 'alert' : 'status'}
          >
            {Object.keys(regionElements).map((key) =>
              cloneElement(regionElements[key], { key })
            )}
          </div>
        </VisuallyHidden>
      );
    }
  });
};

/**
 * creates a ref and holds createCloneFunctions inside of the ref
 * to manage cloning and removing of the alert from liveRegionContainerElements
 * @param element
 * @param liveRegionType
 * @param ref
 */
const useLiveRegionClone = (
  element: React.ReactElement,
  liveRegionType: LiveRegionType,
  ref: React.RefObject<Element>
) => {
  const cloneRef = React.useRef<CloneRef | null>(null);

  useEffect(() => {
    cloneRef.current?.remove();
    cloneRef.current = createCloneFunctions(liveRegionType);
    cloneRef.current.clone(element);

    return () => cloneRef.current.remove();
  }, [element, liveRegionType, ref]);
};

/**
 * An alert component displays an important/unimportant message to get the user's attention without interrupting the user. @ciceksepeti/alert is mainly focused on web accessibility. Thus, with aria-live and role attributes, we try to ensure that many assistive technologies announce the message to users according to the notification level specified by the developer. Rendered alert component HTML tag can be decided by the developer so developers can decide correct semantic for their application
 */
export const Alert = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IAlertProps>,
    forwardedRef
  ) => {
    const { as, children, type = 'polite', ...rest } = props;

    const Component = as || 'div';
    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const component = useMemo(
      () => (
        <Component {...rest} ref={ref} data-cui-alert>
          {children}
        </Component>
      ),
      [children, rest, Component, ref.current]
    );

    useLiveRegionClone(component, type, ref);

    return component;
  }
);

/** Types and Interfaces */

type LiveRegionType = 'assertive' | 'polite' | 'off';

type CloneRef = {
  remove: () => void;
  clone: (element: React.ReactElement) => void;
};

type LiveRegionElements = {
  [key in LiveRegionType]: {
    [key: string]: React.ReactElement;
  };
};

type LiveRegionElementTypes<T extends HTMLElement = HTMLDivElement> = {
  [key in LiveRegionType]: T | null;
};

type LiveRegionRoots = {
  [key in LiveRegionType]: ReactDOM.Root | null;
};

type LiveRegionKeys = {
  [key in LiveRegionType]: number;
};

export interface IAlertProps {
  type?: LiveRegionType;
  children: React.ReactNode;
}

export default Alert;

/** Display Names */

Alert.displayName = 'Alert';
