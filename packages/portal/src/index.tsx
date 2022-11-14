/**
 * @ciceksepeti/cui-portal
 *
 * React Portal Component
 *
 * mounts its content in a specific area of the dom
 */

import React, { FC, useState } from 'react';
import { createPortal } from 'react-dom';
import { useIsomorphicLayoutEffect } from '@ciceksepeti/cui-hooks';

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
  useIsomorphicLayoutEffect(() => {
    const container =
      document.getElementById(containerId) ||
      containerRef?.current ||
      document.body;

    const portalNode = document.createElement('div');
    portalNode.setAttribute('data-cui-portal', 'true');

    setPortalNode(portalNode);
    container.appendChild(portalNode);

    return () => {
      container.removeChild(portalNode);
    };
  }, [containerId, containerRef]);

  const element = portalNode ? createPortal(children, portalNode) : null;
  return element || <span></span>;
};

/** Types and Interfaces */

export interface IPortalProps {
  containerId?: string;
  children: React.ReactNode;
  containerRef?: React.RefObject<Node>;
}

export default Portal;

Portal.displayName = 'Portal';
