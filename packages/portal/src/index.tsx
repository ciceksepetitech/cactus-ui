import React, { useLayoutEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { PolymorphicComponentProps } from '@cs/component-utils';

const Portal = <C extends React.ElementType = 'div'>(
  props: PolymorphicComponentProps<C, IPortalProps>
) => {
  const { as = 'div', containerRef, containerId, children } = props;

  const [portalNode, setPortalNode] = useState<HTMLElement>(null);
  const ownerDocumentDetectRef = useRef<HTMLSpanElement | null>(null);

  useLayoutEffect(() => {
    if (!ownerDocumentDetectRef.current) return;

    const container =
      document.getElementById(containerId) ||
      containerRef?.current ||
      ownerDocumentDetectRef.current.ownerDocument.body;

    const elementType = as as keyof HTMLElementTagNameMap;
    const portalNode = document.createElement(elementType);

    setPortalNode(portalNode);
    container.appendChild(portalNode);

    return () => {
      if (!container || portalNode) return;
      container.removeChild(portalNode);
    };
  }, [as, containerId, containerRef]);

  const element = portalNode ? createPortal(children, portalNode) : null;
  console.log(element, children, portalNode, ownerDocumentDetectRef);

  // trick for detecting ownerDocument of the current tree to append it to correction document object
  // for example, iframe
  const ownerDocumentDetect = <span ref={ownerDocumentDetectRef}></span>;

  return element || ownerDocumentDetect;
};

/** Types and Interfaces */

interface IPortalProps {
  containerId?: string;
  children: React.ReactNode;
  containerRef?: React.RefObject<Node>;
}

/** Prop Types */

if (process.env.NODE_ENV === 'development') {
  Portal.displayName = 'Portal';
  Portal.propTypes = {
    children: PropTypes.node
  };
}

export default Portal;

Portal.displayName = 'Portal';
