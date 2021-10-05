/**
 * Dialog
 * uses react-focus-on to control scroll and focus trap behavior
 * @2021
 * @see https://github.com/theKashey/react-focus-on
 */

import React, { useRef, isValidElement, cloneElement, forwardRef } from 'react';
import Portal from '@cs/component-portal';
import FocusTrap from '@cs/component-focus-trap';
import { RemoveScroll } from 'react-remove-scroll';
import { PolymorphicComponentProps } from '@cs/component-utils';

export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogProps>,
    forwardedRef
  ) => {
    const {
      open,
      children,
      onEscapeKey,
      onClickOutside,
      as: Component = 'div',
      ...rest
    } = props;

    if (!open) return null;

    const ref = useRef(null) || forwardedRef;

    const _children = isValidElement(children)
      ? cloneElement(children, { ref, ...rest })
      : null;

    const handleEscapeKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.stopPropagation();
        onEscapeKey?.(event);
      }
    };

    const handleKeyDown = (event) => {
      handleEscapeKeyDown(event);
    };

    const handleOnClick = (event) => {
      if (!ref.current?.contains(event.target)) {
        event.stopPropagation();
        onClickOutside?.(event);
      }
    };

    return (
      <Portal>
        <Component
          data-cs-dialog-overlay
          onClick={handleOnClick}
          onKeyDown={handleKeyDown}
        >
          {_children}
        </Component>
      </Portal>
    );
  }
);

export const DialogContentWrapper = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogContentProps>,
    forwardedRef
  ) => {
    const {
      style,
      children,
      as = 'div',
      removeScrollBar = true,
      autoFocusToFirst = true,
      autoFocusToLast = false,
      disableFocusTrap = false,
      enableRemoveScroll = true,
      restoreFocusOnUnmount = true
    } = props;

    return (
      <FocusTrap
        disabled={disableFocusTrap}
        autoFocusToLast={autoFocusToLast}
        autoFocusToFirst={autoFocusToFirst}
        restoreFocusOnUnmount={restoreFocusOnUnmount}
      >
        <RemoveScroll
          enabled={enableRemoveScroll}
          removeScrollBar={removeScrollBar}
        >
          <DialogContent as={as} style={style} ref={forwardedRef}>
            {children}
          </DialogContent>
        </RemoveScroll>
      </FocusTrap>
    );
  }
);

export const DialogContent = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogContentProps>,
    forwardedRef
  ) => {
    const { children, as: Component = 'div', ...rest } = props;

    return (
      <Component
        role="dialog"
        aria-modal="true"
        ref={forwardedRef}
        data-cs-dialog-inner
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export const Dialog = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogProps>,
    forwardedRef
  ) => {
    const { as = 'div', children, open, style, ...rest } = props;

    return (
      <DialogOverlay open={open} {...rest} ref={forwardedRef}>
        <DialogContentWrapper as={as} style={style}>
          {children}
        </DialogContentWrapper>
      </DialogOverlay>
    );
  }
);

export default Dialog;

/** Types and Interfaces */

export interface IDialogContentProps {
  children: React.ReactNode;
}
export interface IDialogProps {
  open: boolean;
  removeScrollBar?: boolean;
  children: React.ReactNode;
  autoFocusToLast?: boolean;
  autoFocusToFirst?: boolean;
  disableFocusTrap?: boolean;
  enableRemoveScroll?: boolean;
  restoreFocusOnUnmount?: boolean;
  onEscapeKey?: (event: KeyboardEvent) => void;
  onClickOutside?: (event: MouseEvent | TouchEvent) => void;
}

/** Display Names */

Dialog.displayName = 'Dialog';
DialogContent.displayName = 'DialogContent';
DialogOverlay.displayName = 'DialogOverlay';
DialogContentWrapper.displayName = 'DialogContentWrapper';
