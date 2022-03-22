/**
 * @ciceksepeti/cui-popover
 *
 * Popover Component
 *
 */

import Portal from '@ciceksepeti/cui-portal';
import {
  useCombinedRefs,
  useEventListener,
  getTabbableElements,
  useFindTabbableElements
} from '@ciceksepeti/cui-hooks';
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
} from '@ciceksepeti/cui-utils';

const defaultPopoverStyles: CSSProperties = {
  top: '-100%',
  left: '-100%',
  position: 'absolute'
};

const usePopover = ({
  hidden,
  autoFlip,
  placement,
  targetRef,
  popoverNode
}: IUsePopoverProps) => {
  const [styles, setStyles] = useState<CSSProperties>(defaultPopoverStyles);

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
    ): Pick<DOMRect, PlacementGetterType> => ({
      left: targetRect.left - popoverRect.width,
      top: targetRect.top + window.pageYOffset
    }),
    []
  );

  const getPlacementRight = useCallback(
    (targetRect: DOMRect): Pick<DOMRect, PlacementGetterType> => ({
      left: targetRect.left + targetRect.width,
      top: targetRect.top + window.pageYOffset
    }),
    []
  );

  const getPlacementBottom = useCallback(
    (targetRect: DOMRect): Pick<DOMRect, PlacementGetterType> => ({
      left: targetRect.left,
      top: targetRect.top + targetRect.height + window.pageYOffset
    }),
    []
  );

  const getPlacementTop = useCallback(
    (
      targetRect: DOMRect,
      popoverRect: DOMRect
    ): Pick<DOMRect, PlacementGetterType> => ({
      left: targetRect.left,
      top: targetRect.top - popoverRect.height + window.pageYOffset
    }),
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
          return getPlacementBottom;
      }
    },
    [getPlacementLeft, getPlacementRight, getPlacementBottom, getPlacementTop]
  );

  const getPopoverPosition = useCallback(() => {
    if (!popoverNode) return;

    const targetRect: DOMRect = targetRef.current.getBoundingClientRect();
    const popoverRect: DOMRect = popoverNode.getBoundingClientRect();

    const availableSpaces = getAvailableSpaces(targetRect, popoverRect);

    const shouldFlip =
      autoFlip &&
      !availableSpaces[placement] &&
      availableSpaces[OppositePlacements[placement]];

    const certainPlacement = shouldFlip
      ? OppositePlacements[placement]
      : placement;

    const getPlacement = getPlacementGetter(certainPlacement);
    const newPosition: CSSProperties = {
      ...getPlacement(targetRect, popoverRect)
    };

    setStyles((prev) => ({
      ...prev,
      ...newPosition
    }));
  }, [
    hidden,
    autoFlip,
    placement,
    popoverNode,
    getAvailableSpaces,
    getPlacementGetter
  ]);

  useLayoutEffect(() => {
    getPopoverPosition();
  }, [getPopoverPosition]);

  useEventListener({
    name: 'resize',
    listener: getPopoverPosition
  });

  useEventListener({
    name: 'scroll',
    options: { passive: true },
    listener: getPopoverPosition
  });

  return {
    styles
  };
};

const usePopoverTabIndexSyncing = (popoverNode: HTMLElement) => {
  const parentActiveElementRef = useRef<HTMLElement>(null);
  const { tabbableElements } = useFindTabbableElements(popoverNode);

  useLayoutEffect(() => {
    const parentActiveElement = document.activeElement as HTMLElement;
    parentActiveElementRef.current = parentActiveElement;
  }, []);

  const focusToElement = useCallback((element) => {
    if (!document.body.contains(element)) return;
    element.focus();
  }, []);

  const getFirstTabbableElement = useCallback(
    () => tabbableElements?.[0],
    [tabbableElements]
  );

  const getLastTabbableElement = useCallback(
    () => tabbableElements?.[tabbableElements?.length - 1],
    [tabbableElements]
  );

  const getNextNodeAfterTargetNode = useCallback(() => {
    const tabbableElements = getTabbableElements(document.body);
    const targetNodeIndex = tabbableElements?.findIndex(
      (element) => element === parentActiveElementRef.current
    );

    return tabbableElements[targetNodeIndex + 1];
  }, [tabbableElements]);

  const enableTabIndexSyncing = useCallback(() => {
    tabbableElements?.forEach((element) => (element.tabIndex = 0));
  }, [tabbableElements]);

  const disableTabIndexSyncing = useCallback(() => {
    tabbableElements?.forEach((element) => (element.tabIndex = -1));
  }, [tabbableElements]);

  const handleTabKeyDown = useCallback(
    (event) => {
      const isTabKeyDown = !event.shiftKey && event.keyCode === 9;
      if (!isTabKeyDown) return;

      if (document.activeElement === parentActiveElementRef.current) {
        event.preventDefault();

        const firstTabbableElement = getFirstTabbableElement();
        focusToElement(firstTabbableElement);
        enableTabIndexSyncing();

        return;
      }

      const lastTabbableElement = getLastTabbableElement();
      if (document.activeElement === lastTabbableElement) {
        event.preventDefault();

        const nodeAfterTargetNode = getNextNodeAfterTargetNode();
        focusToElement(nodeAfterTargetNode);
        disableTabIndexSyncing();

        event.preventDefault();
      }
    },
    [
      focusToElement,
      enableTabIndexSyncing,
      disableTabIndexSyncing,
      getLastTabbableElement,
      getFirstTabbableElement,
      getNextNodeAfterTargetNode
    ]
  );

  const handleShiftTabKeyDown = useCallback(
    (event) => {
      const isShiftTabKeyDown = event.shiftKey && event.keyCode === 9;
      if (!isShiftTabKeyDown) return;

      const firstTabbableElement = getFirstTabbableElement();
      if (document.activeElement === firstTabbableElement) {
        event.preventDefault();
        enableTabIndexSyncing();

        focusToElement(parentActiveElementRef.current);

        return;
      }

      const nodeAfterTargetNode = getNextNodeAfterTargetNode();
      if (document.activeElement === nodeAfterTargetNode) {
        event.preventDefault();
        enableTabIndexSyncing();

        const lastTabbableElement = getLastTabbableElement();
        focusToElement(lastTabbableElement);
      }
    },
    [
      focusToElement,
      enableTabIndexSyncing,
      getLastTabbableElement,
      getFirstTabbableElement,
      getNextNodeAfterTargetNode
    ]
  );

  const handleKeyDown = useCallback(
    (event) => {
      handleTabKeyDown(event);
      handleShiftTabKeyDown(event);
    },
    [handleTabKeyDown, handleShiftTabKeyDown]
  );

  useEventListener({
    name: 'keydown',
    listener: handleKeyDown,
    condition: tabbableElements?.length > 0
  });

  useEventListener({
    name: 'focusin',
    target: popoverNode,
    listener: enableTabIndexSyncing,
    condition: tabbableElements?.length > 0
  });

  return { handleKeyDown };
};

export const Popover = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IPopoverProps>,
    forwardedRef
  ) => {
    const {
      as,
      style,
      hidden,
      children,
      targetRef,
      portal = true,
      autoFlip = true,
      placement = Placements.Bottom,
      ...rest
    } = props;

    const [refNode, setRefNode] = useState<HTMLElement>();

    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    usePopoverTabIndexSyncing(refNode);

    const { styles: popoverStyles } = usePopover({
      hidden,
      autoFlip,
      placement,
      targetRef,
      popoverNode: refNode
    });

    const refCallback = useCallback((node: HTMLElement) => {
      ref.current = node;
      setRefNode(node);
    }, []);

    const Component = as || 'div';

    return (
      <ConditionalWrapper
        condition={portal}
        wrapper={(children) => <Portal>{children}</Portal>}
      >
        <Component
          {...rest}
          hidden={hidden}
          data-cui-popover
          ref={refCallback}
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

export enum Placements {
  Top = 'top',
  Left = 'left',
  Right = 'right',
  Bottom = 'bottom'
}

export enum OppositePlacements {
  top = Placements.Bottom,
  left = Placements.Right,
  right = Placements.Left,
  bottom = Placements.Top
}

export interface IPopoverProps {
  portal?: boolean;
  autoFlip?: boolean;
  placement?: Placements;
  children: React.ReactNode;
  targetRef: MutableRefObject<any>;
}

export type PlacementGetterType = Placements.Left | Placements.Top;

export interface IUsePopoverProps
  extends Pick<IPopoverProps, 'autoFlip' | 'placement' | 'targetRef'> {
  hidden?: boolean;
  popoverNode: HTMLElement;
}

/** Display Names */

Popover.displayName = 'Popover';
