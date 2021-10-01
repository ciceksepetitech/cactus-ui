/**
 * Dialog
 * uses react-focus-on to control scroll and focus trap behavior
 * @2021
 * @see https://github.com/theKashey/react-focus-on
 */

import React, { forwardRef } from 'react';
import { FocusOn } from 'react-focus-on';
import Portal from '@cs/component-portal';
import { PolymorphicComponentProps } from '@cs/component-utils';
import { ReactFocusOnSideProps } from 'react-focus-on/dist/es2015/types';

export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogOverlayProps>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as: Component = 'div', open, children, ...rest } = props;

    if (!open) return null;

    return (
      <Portal>
        <Component {...rest} ref={forwardedRef} data-cs-dialog-overlay>
          {children}
        </Component>
      </Portal>
    );
  }
);

export const DialogInner = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogInnerProps>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as: Component = 'div', children, style, ...rest } = props;

    return (
      <FocusOn {...rest}>
        <Component
          role="dialog"
          style={style}
          aria-modal="true"
          ref={forwardedRef}
          data-cs-dialog-inner
        >
          {children}
        </Component>
      </FocusOn>
    );
  }
);

export const Dialog = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogProps>,
    forwardedRef: React.RefObject<C>
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

export interface IDialogOverlayProps extends IDialogProps {}

export interface IDialogInnerProps {
  children: React.ReactNode;
}
export interface IDialogProps extends ReactFocusOnSideProps {
  open: boolean;
  onClose: () => void;
}

/** Display Names */

Dialog.displayName = 'Dialog';
DialogInner.displayName = 'DialogInner';
DialogOverlay.displayName = 'DialogOverlay';
