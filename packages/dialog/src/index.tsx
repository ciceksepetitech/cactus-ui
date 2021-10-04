/**
 * Dialog
 * uses react-focus-on to control scroll and focus trap behavior
 * @2021
 * @see https://github.com/theKashey/react-focus-on
 */

import React, { forwardRef } from 'react';
import { FocusOn } from 'react-focus-on';
import Portal from '@cs/component-portal';
import FocusWrapper from '@cs/component-focus-wrapper';
import { PolymorphicComponentProps } from '@cs/component-utils';

export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IDialogProps>,
    forwardedRef
  ) => {
    const { as: Component = 'div', children, open, ...rest } = props;

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
    forwardedRef
  ) => {
    const { as: Component = 'div', children, style, ...rest } = props;

    return (
      <FocusWrapper>
        <Component
          role="dialog"
          style={style}
          aria-modal="true"
          ref={forwardedRef}
          data-cs-dialog-inner
        >
          {children}
        </Component>
      </FocusWrapper>
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
  children: React.ReactNode;
}

/** Display Names */

Dialog.displayName = 'Dialog';
DialogInner.displayName = 'DialogInner';
DialogOverlay.displayName = 'DialogOverlay';
