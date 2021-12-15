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
    (targetRect: DOMRect, popoverRect: DOMRect): Record<string, boolean> => {
      const { innerWidth, innerHeight } = window;
      const { width: pWidth, height: pHeight } = popoverRect;
      const {
        top: tTop,
        left: tLeft,
        width: tWidth,
        bottom: tBottom
      } = targetRect;

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
      targetRect: DOMRect,
      popoverRect: DOMRect
    ): Pick<DOMRect, 'left' | 'top'> => {
      return { left: targetRect.x - popoverRect.width, top: targetRect.y };
    },
    []
  );

  const getPlacementRight = useCallback(
    (targetRect: DOMRect): Pick<DOMRect, 'left' | 'top'> => {
      return { left: targetRect.x + targetRect.width, top: targetRect.y };
    },
    []
  );

  const getPlacementBottom = useCallback(
    (targetRect: DOMRect): Pick<DOMRect, 'left' | 'top'> => {
      return { left: targetRect.x, top: targetRect.y + targetRect.height };
    },
    []
  );

  const getPlacementTop = useCallback(
    (
      targetRect: DOMRect,
      popoverRect: DOMRect
    ): Pick<DOMRect, 'left' | 'top'> => {
      return {
        left: targetRect.left,
        top: targetRect.top - popoverRect.height
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
      const targetRect: DOMRect = targetRef.current.getBoundingClientRect();
      const popoverRect: DOMRect = popoverRef.current.getBoundingClientRect();

      const newPosition: CSSProperties = { visibility: 'visible' };
      const availableSpaces = getAvailableSpaces(targetRect, popoverRect);

      const shouldFlip =
        autoFlip &&
        !availableSpaces[placement] &&
        availableSpaces[OppositePlacements[placement]];

      const certainPlacement = shouldFlip
        ? OppositePlacements[placement]
        : placement;

      const getPlacement = getPlacementGetter(certainPlacement);
      const { left, top } = getPlacement(targetRect, popoverRect);

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
