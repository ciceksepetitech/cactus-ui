import React, { forwardRef, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFindTabbableElements } from '@cs/component-hooks';
import { PolymorphicComponentProps } from '@cs/component-utils';

export const FocusTrap = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IFocusTrapProps>,
    forwardedRef
  ) => {
    const { as: Component = 'div', children, ...rest } = props;

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    const currentFocusedElementIndex = useRef(0);
    const parentActiveElementRef = useRef<HTMLElement>(null);
    const { tabbableElements } = useFindTabbableElements(ref);

    const focusToElement = useCallback((element) => {
      if (!document.contains(element)) return;
      element.focus();
    }, []);

    const checkIfElementInTrap = useCallback(
      (element: HTMLElement) => {
        const index = tabbableElements.findIndex((each) => each === element);
        return index >= 0;
      },
      [tabbableElements]
    );

    const getElementIndex = useCallback(
      (element: HTMLElement) => {
        const index = tabbableElements.findIndex((each) => each === element);
        return index;
      },
      [tabbableElements]
    );

    const focusInListener = useCallback(
      (event) => {
        const element = event.target;

        const inTrap = checkIfElementInTrap(element);
        if (!inTrap) return;

        currentFocusedElementIndex.current = getElementIndex(element);
      },
      [tabbableElements, checkIfElementInTrap]
    );

    useLayoutEffect(() => {
      const parentActiveElement = document.activeElement as HTMLElement;
      parentActiveElementRef.current = parentActiveElement;

      return () => focusToElement(parentActiveElementRef.current);
    }, [focusToElement]);

    /**
     *
     */
    useLayoutEffect(() => {
      document.addEventListener('click', focusInListener, false);
      return () =>
        document.removeEventListener('click', focusInListener, false);
    }, [focusInListener]);

    const focusNextFocusableElement = () => {
      const nextFocusableElement =
        tabbableElements[currentFocusedElementIndex.current + 1];

      if (!nextFocusableElement) {
        focusFirstFocusableElement();
        return;
      }

      focusToElement(nextFocusableElement);
      currentFocusedElementIndex.current++;
    };

    const focusPrevFocusableElement = () => {
      const prevFocusableElement =
        tabbableElements[currentFocusedElementIndex.current - 1];

      if (!prevFocusableElement) {
        focusLastFocusableElement();
        return;
      }

      focusToElement(prevFocusableElement);
      currentFocusedElementIndex.current--;
    };

    const focusFirstFocusableElement = () => {
      const firstElement = tabbableElements[0];

      currentFocusedElementIndex.current = 0;
      focusToElement(firstElement);
    };

    const focusLastFocusableElement = () => {
      const lastElement = tabbableElements[tabbableElements.length - 1];
      currentFocusedElementIndex.current = tabbableElements.length - 1;

      focusToElement(lastElement);
    };

    const handleTabKeyDown = (event) => {
      const isTabKeyDown = !event.shiftKey && event.keyCode === 9;

      if (!isTabKeyDown) return;

      event.preventDefault();
      event.stopPropagation();

      focusNextFocusableElement();
    };

    const handleShiftTabKeyDown = (event) => {
      const isShiftTabKeyDown = event.shiftKey && event.keyCode === 9;

      if (!isShiftTabKeyDown) return;

      event.preventDefault();
      event.stopPropagation();

      focusPrevFocusableElement();
    };

    const handleKeyDown = (event) => {
      handleTabKeyDown(event);
      handleShiftTabKeyDown(event);
    };

    return (
      <Component
        {...rest}
        ref={ref}
        data-cs-focus-wrapper
        onKeyDown={handleKeyDown}
      >
        {children}
      </Component>
    );
  }
);

export default FocusTrap;

/** Types and Interfaces */

interface IFocusTrapProps {
  children: React.ReactNode;
}

/** Prop Types */

if (process.env.NODE_ENV === 'development') {
  FocusTrap.displayName = 'FocusTrap';
  FocusTrap.propTypes = {
    children: PropTypes.node
  };
}

/** Display Names */

FocusTrap.displayName = 'FocusTrap';
