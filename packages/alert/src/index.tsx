import React, {
  useRef,
  useMemo,
  useEffect,
  forwardRef,
  cloneElement
} from 'react';
import IProps from './props';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import VisuallyHidden from '@cs/component-visually-hidden';
import { PolymorphicComponentProps } from '@cs/component-utils';

const liveRegionCount: LiveRegionKeys = {
  off: 0,
  polite: 0,
  assertive: 0
};

const liveRegionContainerElements: LiveRegionElements = {
  off: {},
  polite: {},
  assertive: {}
};

const liveRegionContainers: LiveRegionElementTypes = {
  off: null,
  polite: null,
  assertive: null
};

const createCloneFunctions = (liveRegionType: LiveRegionType): CloneRef => {
  const key = ++liveRegionCount[liveRegionType];

  const addToLiveRegion = (element: JSX.Element) => {
    liveRegionContainerElements[liveRegionType][key] = element;
    renderAlerts();
  };

  const clone = (element: JSX.Element) => {
    if (liveRegionContainerElements[liveRegionType]) {
      addToLiveRegion(element);
      return;
    }

    const liveRegionContainer = document.createElement('div');
    liveRegionContainer.setAttribute(`data-cs-live-${liveRegionType}`, 'true');
    liveRegionContainers[liveRegionType] = liveRegionContainer;
    document.body.appendChild(liveRegionContainers[liveRegionType]);

    addToLiveRegion(element);
  };

  const remove = () => {
    delete liveRegionContainers[liveRegionType][key];
    renderAlerts();
  };

  return { clone, remove };
};

const renderAlerts = () => {
  Object.keys(liveRegionContainerElements).forEach((elementType) => {
    const liveRegionType: LiveRegionType = elementType as LiveRegionType;
    const container = liveRegionContainers[liveRegionType]!;

    if (container) {
      ReactDOM.render(
        <VisuallyHidden as="div">
          <div
            aria-live={liveRegionType}
            role={liveRegionType === 'assertive' ? 'alert' : 'status'}
          >
            {Object.keys(liveRegionContainerElements[liveRegionType]).map(
              (key) =>
                cloneElement(liveRegionContainerElements[liveRegionType][key], {
                  key
                })
            )}
          </div>
        </VisuallyHidden>,
        liveRegionContainers[liveRegionType]
      );
    }
  });
};

const useLiveRegionClone = (
  element: JSX.Element,
  liveRegionType: LiveRegionType,
  ref: React.RefObject<Element>
) => {
  const cloneRef = React.useRef<CloneRef | null>(null);

  useEffect(() => {
    cloneRef.current && cloneRef.current.remove();
    cloneRef.current = createCloneFunctions(liveRegionType);
    cloneRef.current.clone(element);
  }, [element, liveRegionType, ref]);

  useEffect(() => {
    return () => cloneRef.current && cloneRef.current.remove();
  }, []);
};

const Alert = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IProps>,
    ref
  ) => {
    const { as: Component = 'div', children, type = 'polite', ...rest } = props;

    const alertRef = useRef(null);
    ref = ref || alertRef;

    const component = useMemo(
      () => (
        <Component {...rest} ref={ref} data-cs-alert>
          {children}
        </Component>
      ),
      [children, rest]
    );

    useLiveRegionClone(component, type, ref);

    return component;
  }
);

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

if (process.env.NODE_ENV === 'development') {
  Alert.displayName = 'Alert';
  Alert.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['assertive', 'polite'])
  };
}

export default Alert;
