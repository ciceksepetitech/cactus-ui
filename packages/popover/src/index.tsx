/**
 * @cs/component-popover
 *
 * Popover Component
 *
 */

import Portal from '@cs/component-portal';
import { useCombinedRefs, useEventListener } from '@cs/component-hooks';
import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  CSSProperties,
  useLayoutEffect,
  MutableRefObject
} from 'react';
import {
  ConditionalWrapper,
  PolymorphicComponentProps
} from '@cs/component-utils';

const usePopover = ({
  autoFlip,
  placement,
  targetRef,
  popoverRef
}: IUsePopoverProps) => {
  const [styles, setStyles] = useState<CSSProperties>({
    position: 'absolute',
    visibility: 'hidden'
  });

  const getAvailableSpaces = useCallback(
    (targetNode: DOMRect, popoverNode: DOMRect): Record<string, boolean> => {
      const { innerWidth, innerHeight } = window;
      const { width: pWidth, height: pHeight } = popoverNode;
      const {
        top: tTop,
        left: tLeft,
        width: tWidth,
        bottom: tBottom
      } = targetNode;

      return {
        top: tTop - pHeight > 0,
        left: tLeft - pWidth > 0,
        bottom: innerHeight > tBottom + pHeight,
        right: innerWidth > tLeft + tWidth + pWidth
      };
    },
    []
  );

  const getPlacementLeft = useCallback(
    (
      targetNode: DOMRect,
      popoverNode: DOMRect
    ): Pick<DOMRect, 'left' | 'top'> => {
      return { left: targetNode.x - popoverNode.width, top: targetNode.y };
    },
    []
  );

  const getPlacementRight = useCallback(
    (targetNode: DOMRect): Pick<DOMRect, 'left' | 'top'> => {
      return { left: targetNode.x + targetNode.width, top: targetNode.y };
    },
    []
  );

  const getPlacementBottom = useCallback(
    (targetNode: DOMRect): Pick<DOMRect, 'left' | 'top'> => {
      return { left: targetNode.x, top: targetNode.y + targetNode.height };
    },
    []
  );

  const getPlacementTop = useCallback(
    (
      targetNode: DOMRect,
      popoverNode: DOMRect
    ): Pick<DOMRect, 'left' | 'top'> => {
      return {
        left: targetNode.left,
        top: targetNode.top - popoverNode.height
      };
    },
    []
  );

  const getPlacementGetter = useCallback(
    (placement: OppositePlacements | Placements) => {
      switch (placement) {
        case Placements.Top:
          return getPlacementTop;

        case Placements.Bottom:
          return getPlacementBottom;

        case Placements.Left:
          return getPlacementLeft;

        case Placements.Right:
          return getPlacementRight;

        default:
          break;
      }
    },
    [getPlacementLeft, getPlacementRight, getPlacementBottom, getPlacementTop]
  );

  const getPopoverPosition = useCallback(() => {
    setTimeout(() => {
      const targetNode: DOMRect = targetRef.current.getBoundingClientRect();
      const popoverNode: DOMRect = popoverRef.current?.getBoundingClientRect();

      const newPosition: CSSProperties = { visibility: 'visible' };
      const availableSpaces = getAvailableSpaces(targetNode, popoverNode);

      const shouldFlip =
        autoFlip &&
        !availableSpaces[placement] &&
        availableSpaces[OppositePlacements[placement]];

      const certainPlacement = shouldFlip
        ? OppositePlacements[placement]
        : placement;

      const getPlacement = getPlacementGetter(certainPlacement);
      const { left, top } = getPlacement(targetNode, popoverNode);

      newPosition.top = top;
      newPosition.left = left;

      setStyles((prev) => ({
        ...prev,
        ...newPosition
      }));
    }, 0);
  }, [autoFlip, getAvailableSpaces, getPlacementGetter]);

  useLayoutEffect(() => {
    getPopoverPosition();
  }, [getPopoverPosition]);

  useEventListener({ name: 'resize', listener: getPopoverPosition });

  useEventListener({ name: 'scroll', listener: getPopoverPosition });

  return {
    styles
  };
};

const Popover = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IPopoverProps>,
    forwardedRef
  ) => {
    const {
      as,
      style,
      children,
      targetRef,
      portal = true,
      autoFlip = true,
      reposition = true,
      placement = Placements.Bottom,
      ...rest
    } = props;

    const Component = as || 'div';

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const { styles: popoverStyles } = usePopover({
      autoFlip,
      placement,
      targetRef,
      popoverRef: ref
    });

    return (
      <ConditionalWrapper
        condition={portal}
        wrapper={(children) => <Portal>{children}</Portal>}
      >
        <Component
          {...rest}
          ref={ref}
          data-cs-popover
          style={{ ...style, ...popoverStyles }}
        >
          {children}
        </Component>
      </ConditionalWrapper>
    );
  }
);

export default Popover;

/** Types and Interfaces */

enum Placements {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

enum OppositePlacements {
  top = Placements.Bottom,
  left = Placements.Right,
  right = Placements.Left,
  bottom = Placements.Top
}

interface IPopoverProps {
  portal?: boolean;
  autoFlip?: boolean;
  placement?: Placements;
  children: React.ReactNode;
  targetRef: MutableRefObject<any>;
  popoverRef: MutableRefObject<any>;
}

type IUsePopoverProps = Pick<
  IPopoverProps,
  'autoFlip' | 'placement' | 'targetRef' | 'popoverRef'
>;

/** Display Names */

Popover.displayName = 'Popover';
