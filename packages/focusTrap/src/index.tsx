/**
 * @cs/component-focus-trap
 *
 * Focus Trap Component
 *
 * focusTrap component traps focus events inside of its boundries. It is developed according to the accessibility rules. User cannot leave the trap boundries unless disables it. Great match for components like Modals, Dialogs and etc.
 */

import React, {
  useRef,
  useState,
  forwardRef,
  useCallback,
  useLayoutEffect
} from 'react';
import { PolymorphicComponentProps } from '@cs/component-utils';
import { useFindTabbableElements, useCombinedRefs } from '@cs/component-hooks';

/**
 * focus trap component
 * traps focus events inside of its boundries
 */
export const FocusTrap = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IFocusTrapProps>,
    forwardedRef
  ) => {
    const {
      as,
      children,
      disabled = false,
      autoFocusToLast = false,
      autoFocusToFirst = true,
      restoreFocusOnUnmount = true,
      ...rest
    } = props;

    const Component = as || 'div';
    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const currentFocusedElementIndex = useRef(0);
    const [refNode, setRefNode] = useState<HTMLElement>();
    const parentActiveElementRef = useRef<HTMLElement>(null);
    const { tabbableElements = [] } = useFindTabbableElements(refNode);

    const shouldAutoFocusToFirst = !autoFocusToLast ? autoFocusToFirst : false;

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
     * check if any element is alreay focused among tabbable elements, e.g with refs or autofocus
     * react pollyfills autofocus attribute to handle cross-browser problems
     * elements rendered via react will not have autofocus attribute when you inspect them
     * to get the element with autofocus, we need to check if any tabbable element has focused already.
     * also an element can be focused with refs, so if it is the case, we should not change it!
     * @returns element with autoFocus attribute
     */
    const checkForAlreadyFocusedElement = useCallback(() => {
      const focusedElementIndex = tabbableElements.findIndex(
        (element) => document.activeElement === element
      );

      currentFocusedElementIndex.current = focusedElementIndex;
      return focusedElementIndex >= 0;
    }, [tabbableElements]);

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
        if (!inTrap) {
          currentFocusedElementIndex.current = 0;
          return;
        }

        currentFocusedElementIndex.current = getElementIndex(element);
      },
      [checkIfElementInTrap]
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
      if (disabled) return;

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
     * focuses to first element on mount if autoFocusToFirst is true
     */
    useLayoutEffect(() => {
      if (!shouldAutoFocusToFirst || checkForAlreadyFocusedElement()) return;
      focusFirstFocusableElement();
    }, [
      shouldAutoFocusToFirst,
      focusFirstFocusableElement,
      checkForAlreadyFocusedElement
    ]);

    /**
     * focuses to last element on mount if autoFocusToLast is true
     */
    useLayoutEffect(() => {
      if (!autoFocusToLast || checkForAlreadyFocusedElement()) return;
      focusLastFocusableElement();
    }, [
      autoFocusToLast,
      focusLastFocusableElement,
      checkForAlreadyFocusedElement
    ]);

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

    /**
     * handles key events
     */
    const handleKeyDown = (event) => {
      handleTabKeyDown(event);
      handleShiftTabKeyDown(event);
    };

    const refCallback = useCallback((node: any) => {
      ref.current = node;
      setRefNode(node);
    }, []);

    return (
      <Component
        {...rest}
        ref={refCallback}
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
  autoFocusToLast?: boolean;
  autoFocusToFirst?: boolean;
  children: React.ReactNode;
  restoreFocusOnUnmount?: boolean;
}

/** Display Names */

FocusTrap.displayName = 'FocusTrap';
