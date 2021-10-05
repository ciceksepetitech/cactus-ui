/**
 * Dialog
 * uses react-focus-on to control scroll and focus trap behavior
 * @2021
 * @see https://github.com/theKashey/react-focus-on
 */

import React, { isValidElement, cloneElement, forwardRef } from 'react';
import Portal from '@cs/component-portal';
import FocusTrap from '@cs/component-focus-trap';
import { RemoveScroll } from 'react-remove-scroll';
import { PolymorphicComponentProps } from '@cs/component-utils';

export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogProps>,
    forwardedRef
  ) => {
    const { as: Component = 'div', children, open, ...rest } = props;

    if (!open) return null;

    const _children = isValidElement(children)
      ? cloneElement(children, { ref: forwardedRef, ...rest })
      : null;

    return (
      <Portal>
        <Component data-cs-dialog-overlay>{_children}</Component>
      </Portal>
    );
  }
);

export const DialogInner = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogInnerProps>,
    forwardedRef
  ) => {
    const {
      style,
      children,
      as: Component = 'div',
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
          <Component
            role="dialog"
            style={style}
            aria-modal="true"
            ref={forwardedRef}
            data-cs-dialog-inner
          >
            {children}
          </Component>
        </RemoveScroll>
      </FocusTrap>
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
      <DialogOverlay open={open} {...rest}>
        <DialogInner as={as} style={style} ref={forwardedRef}>
          {children}
        </DialogInner>
      </DialogOverlay>
    );
  }
);

export default Dialog;

/** Types and Interfaces */

export interface IDialogInnerProps {
  children: React.ReactNode;
}
export interface IDialogProps {
  open: boolean;
  onClose: () => void;
  removeScrollBar?: boolean;
  children: React.ReactNode;
  autoFocusToLast?: boolean;
  autoFocusToFirst?: boolean;
  disableFocusTrap?: boolean;
  enableRemoveScroll?: boolean;
  restoreFocusOnUnmount?: boolean;
}

/** Display Names */

Dialog.displayName = 'Dialog';
DialogInner.displayName = 'DialogInner';
DialogOverlay.displayName = 'DialogOverlay';
