/**
 * @cs/component-portal
 *
 * React Portal Component
 *
 * mounts its content in a specific area of the dom
 */

import React, { FC, useLayoutEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

/**
 * portal component
 * mounts its content in a specific area of the dom
 */
export const Portal: FC<IPortalProps> = (props) => {
  const { containerRef, containerId, children } = props;

  const [portalNode, setPortalNode] = useState<HTMLElement>(null);

  /**
   * handles mounting/unmounting of its content
   * creates a portal node and mounts the content to the container (by default document.body)
   */
  useLayoutEffect(() => {
    const container =
      document.getElementById(containerId) ||
      containerRef?.current ||
      document.body;

    const portalNode = document.createElement('div');

    setPortalNode(portalNode);
    container.appendChild(portalNode);

    return () => {
      if (!container || portalNode) return;
      container.removeChild(portalNode);
    };
  }, [containerId, containerRef]);

  const element = portalNode ? createPortal(children, portalNode) : null;
  return element || <span></span>;
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
