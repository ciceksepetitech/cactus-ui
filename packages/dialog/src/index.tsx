/* eslint-disable jsx-a11y/no-static-element-interactions */

/**
 * @cs/component-dialog
 *
 * Accessible Dialog (Modal) Component
 *
 * shows the relevant content in a dialog in accordance with accessibility rules
 *
 * @see https://www.w3.org/TR/wai-aria-practices-1.2/#dialog_modal
 */

import React, {
  useRef,
  useEffect,
  forwardRef,
  useCallback,
  cloneElement,
  FunctionComponent
} from 'react';
import Portal from '@cs/component-portal';
import FocusTrap from '@cs/component-focus-trap';
import { RemoveScroll } from 'react-remove-scroll';
import { useCombinedRefs } from '@cs/component-hooks';
import { PolymorphicComponentProps } from '@cs/component-utils';

/**
 * dialog overlay component
 * handles escape and outside click of the dialog
 */
export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, Omit<IDialogProps, 'as'>>,
    forwardedRef
  ) => {
    const { open, children, onEscapeKey, onClickOutside, ...rest } = props;

    if (!open) return null;

    const childrenRef = useRef(null);
    const internalRef = useRef(null);
    const ref = useCombinedRefs(forwardedRef, internalRef);

    const handleEscapeKeyDown = useCallback(
      (event: KeyboardEvent | React.KeyboardEvent<HTMLElement>) => {
        if ((event.key === 'Escape' || event.key === 'Esc') && onEscapeKey) {
          event.stopPropagation();
          onEscapeKey(event);
        }
      },
      [onEscapeKey]
    );

    useEffect(() => {
      if (!onEscapeKey) return;

      document.addEventListener('keydown', handleEscapeKeyDown);
      return () => document.removeEventListener('keydown', handleEscapeKeyDown);
    }, [handleEscapeKeyDown, onEscapeKey]);

    const handleOnClick = (
      event: React.MouseEvent<HTMLElement, MouseEvent | TouchEvent>
    ) => {
      if (!childrenRef.current.contains(event.target)) {
        event.stopPropagation();
        onClickOutside?.(event);
      }
    };

    const clonedChildren = cloneElement(children, {
      ref: childrenRef,
      ...rest
    });

    return (
      <Portal>
        <div
          ref={ref}
          tabIndex={-1}
          data-cs-dialog-overlay
          onClick={handleOnClick}
          onKeyDown={handleEscapeKeyDown}
        >
          {clonedChildren}
        </div>
      </Portal>
    );
  }
);

/**
 * dialog content wrapper component
 * handles focus trapping and scroll blocking
 */
export const DialogContentWrapper = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, FunctionComponent>,
    forwardedRef
  ) => {
    const {
      children,
      removeScrollBar = true,
      autoFocusToFirst = true,
      autoFocusToLast = false,
      disableFocusTrap = false,
      enableRemoveScroll = true,
      restoreFocusOnUnmount = true,
      ...rest
    } = props;

    const clonedChildren = cloneElement(children, {
      ref: forwardedRef,
      ...rest
    });

    return (
      <RemoveScroll
        enabled={enableRemoveScroll}
        removeScrollBar={removeScrollBar}
      >
        <FocusTrap
          disabled={disableFocusTrap}
          autoFocusToLast={autoFocusToLast}
          autoFocusToFirst={autoFocusToFirst}
          restoreFocusOnUnmount={restoreFocusOnUnmount}
        >
          {clonedChildren}
        </FocusTrap>
      </RemoveScroll>
    );
  }
);

/**
 * dialog content component
 * handles accessibility features of dialog
 */
export const DialogContent = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, FunctionComponent>,
    forwardedRef
  ) => {
    showContentWarnings(DialogContent.displayName, props);

    const { children, as, ...rest } = props;

    const Component = as || 'div';

    return (
      <Component
        role="dialog"
        aria-modal="true"
        ref={forwardedRef}
        data-cs-dialog-content
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

/**
 * dialog component
 * exposes dialog overlay and dialog content wrapper
 */
export const Dialog = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, Omit<IDialogProps, 'as'>>,
    forwardedRef
  ) => {
    const { children, ...rest } = props;

    return (
      <DialogOverlay ref={forwardedRef} {...rest}>
        <DialogContentWrapper>
          <DialogContent>{children}</DialogContent>
        </DialogContentWrapper>
      </DialogOverlay>
    );
  }
);

export default Dialog;

/** Warnings */

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showContentWarnings = (
  componentName: string,
  props: FunctionComponent
) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props['aria-labelledby'] && props['aria-label']) {
    const warning = `@cs/component-dialog - ${componentName}: both aria-labelledby and aria-label provided to component. If label is visible, its id should be passed to aria-labelledby, if it is not description should be passed to aria-label. @see: https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html`;

    console.warn(warning);
  }

  if (props['aria-labelledby'] || props['aria-label']) return;

  const warning = `@cs/component-dialog - ${componentName}: aria-labelledby or aria-label attribute should be provided to describe content of dialog. @see: https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html`;

  console.warn(warning);
};

/** Types and Interfaces */

export interface IDialogProps {
  open: boolean;
  as?: React.ElementType;
  removeScrollBar?: boolean;
  autoFocusToLast?: boolean;
  autoFocusToFirst?: boolean;
  disableFocusTrap?: boolean;
  style?: React.CSSProperties;
  enableRemoveScroll?: boolean;
  restoreFocusOnUnmount?: boolean;
  onEscapeKey?: (
    event: KeyboardEvent | React.KeyboardEvent<HTMLElement>
  ) => void;
  onClickOutside?: (
    event: React.MouseEvent<HTMLElement, MouseEvent | TouchEvent>
  ) => void;
}

/** Display Names */

Dialog.displayName = 'Dialog';
DialogContent.displayName = 'DialogContent';
DialogOverlay.displayName = 'DialogOverlay';
DialogContentWrapper.displayName = 'DialogContentWrapper';
