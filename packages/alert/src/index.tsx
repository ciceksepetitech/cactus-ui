import React, { cloneElement, useEffect, useMemo } from 'react';
import IProps from './props';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import VisuallyHidden from '@cs/component-visually-hidden';
import { PolymorphicComponentProps } from '@cs/component-utils';

let liveRegionKeys: LiveRegionKeys = {
  polite: -1,
  assertive: -1
};

let liveRegionElements: LiveRegionElements = {
  polite: {},
  assertive: {}
};

let liveRegion: LiveRegionElementTypes = {
  polite: null,
  assertive: null
};

const createCloneFuncs = (type: LiveRegionType, doc: Document): CloneRef => {
  const key = ++liveRegionKeys[type];

  const addToLiveRegion = (element: JSX.Element) => {
    liveRegionElements[type][key] = element;
    renderAlerts();
  };

  const clone = (element: JSX.Element) => {
    if (liveRegionElements[type]) {
      addToLiveRegion(element);
      return;
    }

    const liveRegionContainer = doc.createElement('div');
    liveRegionContainer.setAttribute(`data-live-${type}`, 'true');
    liveRegion[type] = liveRegionContainer;
    doc.body.appendChild(liveRegion[type]);

    addToLiveRegion(element);
  };

  const remove = () => {
    delete liveRegion[type][key];
    renderAlerts();
  };

  return { clone, remove };
};

const renderAlerts = () => {
  Object.keys(liveRegionElements).forEach((elementType) => {
    const type: LiveRegionType = elementType as LiveRegionType;
    const container = liveRegion[type]!;

    if (container) {
      ReactDOM.render(
        <VisuallyHidden as="div">
          <div
            aria-live={type}
            role={type === 'assertive' ? 'alert' : 'status'}
          >
            {Object.keys(liveRegionElements[type]).map((key) =>
              cloneElement(liveRegionElements[type][key], {
                key,
                ref: null
              })
            )}
          </div>
        </VisuallyHidden>,
        liveRegion[type]
      );
    }
  });
};

const useCloneElement = (
  element: JSX.Element,
  liveRegionType: LiveRegionType,
  ref: React.RefObject<Element>
) => {
  const cloneRef = React.useRef<CloneRef | null>(null);

  useEffect(() => {
    cloneRef.current && cloneRef.current.remove();
    cloneRef.current = createCloneFuncs(liveRegionType, document);
    cloneRef.current.clone(element);
  }, [element, liveRegionType, ref]);

  useEffect(() => {
    return () => cloneRef.current && cloneRef.current.remove();
  }, []);
};

const Alert = <C extends React.ElementType = 'div'>(
  props: PolymorphicComponentProps<C, IProps>
) => {
  const { as: Component = 'div', children, type = 'polite', ...rest } = props;

  const component = useMemo(
    () => (
      <Component {...rest} data-cs-alert>
        {children}
      </Component>
    ),
    [children, rest]
  );

  return component;
};

if (process.env.NODE_ENV === 'development') {
  Alert.displayName = 'Alert';
  Alert.propTypes = {
    children: PropTypes.node,
    type: PropTypes.oneOf(['assertive', 'polite'])
  };
}

type LiveRegionType = 'assertive' | 'polite';

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

export default Alert;
