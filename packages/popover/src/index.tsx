/**
 * @cs/component-popover
 *
 * Popover Component
 *
 */

import Portal from '@cs/component-portal';
import { useCombinedRefs } from '@cs/component-hooks';
import React, {
  useRef,
  forwardRef,
  useCallback,
  MutableRefObject
} from 'react';
import {
  isCSR,
  ConditionalWrapper,
  PolymorphicComponentProps
} from '@cs/component-utils';

const usePopover = ({
  placement,
  targetRef,
  popoverRef,
  bounding = isCSR ? window : undefined
}) => {
  const getTargetNodeRect = useCallback((nodeRef) => {
    return nodeRef.current.getBoundingClientRect();
  }, []);

  const getTargetNodeDistances = useCallback((nodeRef) => {
    const { top, bottom, left, right } =
      nodeRef.current.getBoundingClientRect();

    return { top, bottom, left, right };
  }, []);

  const getPopoverStyles = useCallback(() => {
    const targetNode = getTargetNodeRect(targetRef);

    const left = targetNode.y;
    const top =
      targetNode.x +
      (placement === 'bottom' ? targetNode.height : -1 * targetNode.height);

    return {
      top,
      left,
      position: 'absolute'
    };
  }, [placement, getTargetNodeRect]);

  return {
    getPopoverStyles,
    getTargetNodeRect,
    getTargetNodeDistances
  };
};

/**
 * popover component
 */
export const Popover = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IPopoverProps>,
    forwardedRef
  ) => {
    const {
      as,
      style,
      children,
      targetRef,
      portal = false,
      placement = 'bottom',
      ...rest
    } = props;

    const Component = as || 'div';

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const { getPopoverStyles } = usePopover({
      placement,
      targetRef,
      popoverRef: ref
    });

    const _style = { ...getPopoverStyles(), ...style };

    return (
      <ConditionalWrapper
        condition={portal}
        wrapper={(children) => <Portal>{children}</Portal>}
      >
        <Component {...rest} style={_style} ref={ref} data-cs-popover>
          {children}
        </Component>
      </ConditionalWrapper>
    );
  }
);

export default Popover;

/** Types and Interfaces */

interface IPopoverProps {
  portal?: boolean;
  placement?: PlacementType;
  children: React.ReactNode;
  targetRef: MutableRefObject<any>;
  popoverRef: MutableRefObject<any>;
}

type PlacementType = 'top' | 'bottom' | 'left' | 'right';

/** Display Names */

Popover.displayName = 'Popover';
