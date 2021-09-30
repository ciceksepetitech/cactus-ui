import React, { forwardRef, useRef } from 'react';
import Portal from '@cs/component-portal';
import { PolymorphicComponentProps } from '@cs/component-utils';

export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, {}>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as: Component = 'div', children } = props;

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    return (
      <Component ref={ref} data-cs-dialog-overlay>
        {children}
      </Component>
    );
  }
);

DialogOverlay.displayName = 'DialogOverlay';

export const DialogInner = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, {}>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as: Component = 'div', children } = props;

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    return (
      <Portal>
        <Component ref={ref} data-cs-dialog-inner>
          {children}
        </Component>
      </Portal>
    );
  }
);

DialogInner.displayName = 'DialogInner';

const Dialog = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, {}>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as = 'div', children } = props;

    return (
      <DialogOverlay as="div">
        <DialogInner as={as} ref={forwardedRef}>
          {children}
        </DialogInner>
      </DialogOverlay>
    );
  }
);

Dialog.displayName = 'Dialog';

export default Dialog;
