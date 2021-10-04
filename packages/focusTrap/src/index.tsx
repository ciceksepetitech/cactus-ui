import React, { forwardRef, useLayoutEffect, useRef, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useFindTabbableElements } from '@cs/component-hooks';
import { PolymorphicComponentProps } from '@cs/component-utils';

/**
 * FocusTrap component traps focus events inside of its boundries. It is developed according to the accessibility rules. User cannot leave the trap boundries unless disables it. Great match for components like Modals, Dialogs and etc.
 */
export const FocusTrap = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IFocusTrapProps>,
    forwardedRef
  ) => {
    const {
      children,
      disabled = false,
      focusToLast = false,
      focusToFirst = true,
      as: Component = 'div',
      restoreFocusOnUnmount = true,
      ...rest
    } = props;

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    const currentFocusedElementIndex = useRef(0);
    const parentActiveElementRef = useRef<HTMLElement>(null);
    const { tabbableElements } = useFindTabbableElements(ref);

    /**
     * checks existance of element and focuses if exists
     * kind of a safe focus!
     * TODO: waiting for transitions can be added in the future! If there is any animation on the element, wait until it completes then focus!
     */
    const focusToElement = useCallback((element) => {
      if (!document.contains(element)) return;
      element.focus();
    }, []);

    /**
     * checks existance of element in trap
     * @returns boolean
     */
    const checkIfElementInTrap = useCallback(
      (element: HTMLElement) => {
        const index = tabbableElements.findIndex((each) => each === element);
        return index >= 0;
      },
      [tabbableElements]
    );

    /**
     * gets index of the element in tabbableElements
     * @returns number
     */
    const getElementIndex = useCallback(
      (element: HTMLElement) => {
        const index = tabbableElements.findIndex((each) => each === element);
        return index;
      },
      [tabbableElements]
    );

    /**
     * listens for click events
     * if user clicks on a tabbable element inside of trap, currentFocusedElementIndex.current should be updated by the index of that element
     */
    const clickListener = useCallback(
      (event) => {
        const element = event.target;

        const inTrap = checkIfElementInTrap(element);
        if (!inTrap) return;

        currentFocusedElementIndex.current = getElementIndex(element);
      },
      [tabbableElements, checkIfElementInTrap]
    );

    /**
     * stores parent active element to refocus when user unmounts trap
     */
    useLayoutEffect(() => {
      if (!restoreFocusOnUnmount || disabled) return;

      const parentActiveElement = document.activeElement as HTMLElement;
      parentActiveElementRef.current = parentActiveElement;

      return () => focusToElement(parentActiveElementRef.current);
    }, [disabled, restoreFocusOnUnmount, focusToElement]);

    /**
     * listens for click events to correctly update currentFocusedElementIndex.current
     */
    useLayoutEffect(() => {
      if (!disabled) return;

      document.addEventListener('click', clickListener, false);
      return () => document.removeEventListener('click', clickListener, false);
    }, [disabled, clickListener]);

    /**
     * finds and focuses on next focusable element in trap
     * if there no any next focusable element, focuses the first element
     */
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

    /**
     * finds and focuses on previous focusable element in trap
     * if there no any previous focusable element, focuses the last element
     */
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

    /**
     * directly focuses on first element in trap
     */
    const focusFirstFocusableElement = () => {
      const firstElement = tabbableElements[0];

      currentFocusedElementIndex.current = 0;
      focusToElement(firstElement);
    };

    /**
     * directly focuses on last element in trap
     */
    const focusLastFocusableElement = () => {
      const lastElement = tabbableElements[tabbableElements.length - 1];
      currentFocusedElementIndex.current = tabbableElements.length - 1;

      focusToElement(lastElement);
    };

    /**
     * focuses to first element on mount if focusToFirst is true
     */
    useLayoutEffect(() => {
      if (!focusToFirst) return;
      focusFirstFocusableElement();
    }, [focusToFirst, focusFirstFocusableElement]);

    /**
     * focuses to last element on mount if focusToLast is true
     */
    useLayoutEffect(() => {
      if (!focusToLast) return;
      focusLastFocusableElement();
    }, [focusToLast, focusLastFocusableElement]);

    /**
     * handles tab key down event
     * if it is pressed, focuses on next element in trap
     */
    const handleTabKeyDown = (event) => {
      const isTabKeyDown = !event.shiftKey && event.keyCode === 9;

      if (!isTabKeyDown) return;

      event.preventDefault();
      event.stopPropagation();

      focusNextFocusableElement();
    };

    /**
     * handles shift+tab key down event
     * if it is pressed, focuses on previous element in trap
     */
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
        onKeyDown={disabled ? undefined : handleKeyDown}
      >
        {children}
      </Component>
    );
  }
);

export default FocusTrap;

/** Types and Interfaces */

interface IFocusTrapProps {
  disabled?: boolean;
  focusToLast?: boolean;
  focusToFirst?: boolean;
  children: React.ReactNode;
  restoreFocusOnUnmount?: boolean;
}

/** Prop Types */

if (process.env.NODE_ENV === 'development') {
  FocusTrap.displayName = 'FocusTrap';
  FocusTrap.propTypes = {
    disabled: PropTypes.bool,
    children: PropTypes.node,
    focusToLast: PropTypes.bool,
    focusToFirst: PropTypes.bool,
    restoreFocusOnUnmount: PropTypes.bool
  };
}

/** Display Names */

FocusTrap.displayName = 'FocusTrap';
