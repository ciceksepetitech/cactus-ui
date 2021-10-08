/**
 * @cs/component-alert
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
import ReactDOM from 'react-dom';
import VisuallyHidden from '@cs/component-visually-hidden';
import { PolymorphicComponentProps } from '@cs/component-utils';

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
  const addToLiveRegion = (element: JSX.Element) => {
    regionElements[key] = element;
    renderAlertsToRegions();
  };

  /**
   * clones the children to specified live region
   * @param element
   * @returns
   */
  const clone = (element: JSX.Element) => {
    if (liveRegionContainers[liveRegionType]) {
      addToLiveRegion(element);
      return;
    }

    const liveRegionContainer = document.createElement('div');
    liveRegionContainer.setAttribute(`data-cs-live-${liveRegionType}`, 'true');
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
    const container = liveRegionContainers[liveRegionType]!;
    const regionElements = liveRegionContainerElements[liveRegionType];

    if (container) {
      ReactDOM.render(
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
        </VisuallyHidden>,
        container
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
  element: JSX.Element,
  liveRegionType: LiveRegionType,
  ref: React.RefObject<Element>
) => {
  const cloneRef = React.useRef<CloneRef | null>(null);

  useEffect(() => {
    cloneRef.current?.remove();
    cloneRef.current = createCloneFunctions(liveRegionType);
    cloneRef.current.clone(element);

    return () => cloneRef.current?.remove();
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
    const { as: Component = 'div', children, type = 'polite', ...rest } = props;

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    const component = useMemo(
      () => (
        <Component {...rest} ref={ref} data-cs-alert>
          {children}
        </Component>
      ),
      [children, rest, Component]
    );

    const element: JSX.Element = component.type ? component : <></>; // to avoid test crushing!
    useLiveRegionClone(element, type, ref);

    return element;
  }
);

/** Types and Interfaces */

type LiveRegionType = 'assertive' | 'polite' | 'off';

type CloneRef = {
  remove: () => void;
  clone: (element: JSX.Element) => void;
};

type LiveRegionElements = {
  [key in LiveRegionType]: {
    [key: string]: JSX.Element;
  };
};

type LiveRegionElementTypes<T extends HTMLElement = HTMLDivElement> = {
  [key in LiveRegionType]: T | null;
};

type LiveRegionKeys = {
  [key in LiveRegionType]: number;
};

interface IAlertProps {
  type?: LiveRegionType;
  children: React.ReactNode;
}

export default Alert;

/** Display Names */

Alert.displayName = 'Alert';
