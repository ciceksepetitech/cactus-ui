/**
 * Dialog
 */
import React, {
  useRef,
  forwardRef,
  cloneElement,
  isValidElement,
  FunctionComponent
} from 'react';
import Portal from '@cs/component-portal';
import FocusTrap from '@cs/component-focus-trap';
import { RemoveScroll } from 'react-remove-scroll';
import { PolymorphicComponentProps } from '@cs/component-utils';

export const DialogOverlay = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, Omit<IDialogProps, 'as'>>,
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

    const handleEscapeKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Escape' || event.key === 'Esc') {
        event.stopPropagation();
        onEscapeKey?.(event);
      }
    };

    const handleKeyDown = (event) => {
      handleEscapeKeyDown(event);
    };

    const handleOnClick = (
      event: React.MouseEvent<HTMLElement, MouseEvent | TouchEvent>
    ) => {
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
      children,
      removeScrollBar = true,
      autoFocusToFirst = true,
      autoFocusToLast = false,
      disableFocusTrap = false,
      enableRemoveScroll = true,
      restoreFocusOnUnmount = true,
      ...rest
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
          <DialogContent ref={forwardedRef} {...rest}>
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

    showContentWarnings(DialogContent.displayName, props);

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

export const Dialog: FunctionComponent<IDialogProps> = (props) => {
  const { children, open, ...rest } = props;

  return (
    <DialogOverlay open={open} {...rest}>
      <DialogContentWrapper>{children}</DialogContentWrapper>
    </DialogOverlay>
  );
};

export default Dialog;

/** Warnings */

const showContentWarnings = (
  componentName: string,
  props: IDialogContentProps
) => {
  if (process.env.NODE_ENV !== 'development') return;

  if (props['aria-labelledby'] && props['aria-label']) {
    const warning = `@cs/component-dialog - ${componentName}: both aria-labelledby and aria-label provided to component. If label is visible, its id should be passed to aria-labelledby, if it is not description should be passed to aria-label. @see: https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html`;

    console.warn(warning);
    return;
  }

  if (props['aria-labelledby'] || props['aria-label']) return;

  const warning = `@cs/component-dialog - ${componentName}: aria-labelledby or aria-label attribute should be provided to describe content of dialog. @see: https://www.w3.org/TR/wai-aria-practices-1.1/examples/dialog-modal/dialog.html`;

  console.warn(warning);
};

/** Types and Interfaces */

export interface IDialogContentProps {
  children: React.ReactNode;
}
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
  onEscapeKey?: (event: React.KeyboardEvent<HTMLElement>) => void;
  onClickOutside?: (
    event: React.MouseEvent<HTMLElement, MouseEvent | TouchEvent>
  ) => void;
}

/** Display Names */

Dialog.displayName = 'Dialog';
DialogContent.displayName = 'DialogContent';
DialogOverlay.displayName = 'DialogOverlay';
DialogContentWrapper.displayName = 'DialogContentWrapper';
