/**
 * @cs/component-alert-nav
 *
 * AlertDialog Component
 *
 * provides accessible alert dialog for situations like user confirmation is needed
 */

import React, { useRef, forwardRef, useLayoutEffect } from 'react';
import { useFindTabbableElements } from '@cs/component-hooks';
import { PolymorphicComponentProps } from '@cs/component-utils';
import {
  IDialogProps,
  DialogOverlay,
  DialogContent,
  DialogContentWrapper
} from '@cs/component-dialog';

/**
 * alert dialog overlay component
 * handles escape and outside click of the alert dialog
 */
export const AlertDialogOverlay = forwardRef(
  (props: IAlertDialogProps, forwardedRef) => {
    const { children, ...rest } = props;

    return (
      <DialogOverlay ref={forwardedRef} {...rest}>
        {children}
      </DialogOverlay>
    );
  }
);

/**
 * alert dialog content wrapper component
 * handles focus trapping and scroll blocking
 */
export const AlertDialogContentWrapper = forwardRef(
  (props: IAlertDialogContentProps, forwardedRef) => {
    const { children, ...rest } = props;

    return (
      <DialogContentWrapper ref={forwardedRef} role="alertdialog" {...rest}>
        {children}
      </DialogContentWrapper>
    );
  }
);

/**
 * alert dialog content component
 * handles accessibility features of dialog
 */
export const AlertDialogContent = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IAlertDialogContentProps>,
    forwardedRef
  ) => {
    const { children, as, ...rest } = props;

    showContentWarnings(AlertDialogContent.displayName, props);

    const Component = as || 'div';

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    const { tabbableElements } = useFindTabbableElements(ref);

    useLayoutEffect(() => {
      if (process.env.NODE_ENV === 'production') return;

      if (tabbableElements?.length === 0) {
        const error = `@cs/component-alert-dialog-content: at least one focusable element should be provided for role=alertdialog. Ensure you have one focusable element added. @see: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Techniques/Using_the_alertdialog_role`;

        console.error(error);
      }
    }, [tabbableElements]);

    return (
      <Component
        ref={ref}
        aria-modal="true"
        role="alertdialog"
        data-cs-alert-dialog-content
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

/**
 * alert dialog component
 * exposes alert dialog overlay and alert dialog content wrapper
 */
export const AlertDialog = forwardRef(
  (props: IAlertDialogProps, forwardedRef) => {
    const { children, ...rest } = props;

    return (
      <AlertDialogOverlay ref={forwardedRef} {...rest}>
        <AlertDialogContentWrapper>
          <AlertDialogContent>{children}</AlertDialogContent>
        </AlertDialogContentWrapper>
      </AlertDialogOverlay>
    );
  }
);

export default AlertDialog;

/** Warnings */

/**
 * handles development environment warning messages
 * @param componentName
 * @param props
 * @returns
 */
const showContentWarnings = (
  componentName: string,
  props: IAlertDialogContentProps
) => {
  if (process.env.NODE_ENV === 'production') return;

  if (props['aria-labelledby'] && props['aria-label']) {
    const warning = `@cs/component-alert-dialog - ${componentName}: both aria-labelledby and aria-label provided to component. If label is visible, its id should be passed to aria-labelledby, if it is not description should be passed to aria-label. @see: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/alertdialog.html`;

    console.warn(warning);
    return;
  }

  if (!props['aria-describedby']) {
    const warning = `@cs/component-alert-dialog - ${componentName}: aria-describedby is not provided. Content of alert dialog should have an description and aria-describedby should be provided. @see: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/alertdialog.html`;

    console.warn(warning);
    return;
  }

  if (props['aria-labelledby'] || props['aria-label']) return;

  const warning = `@cs/component-alert-dialog - ${componentName}: aria-labelledby or aria-label attribute should be provided to describe content of dialog. @see: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/alertdialog.html`;

  console.warn(warning);
};

/** Types and Interfaces */

interface IAlertDialogProps extends IDialogProps {
  children: React.ReactNode;
}

interface IAlertDialogContentProps {
  children: React.ReactNode;
}

/** Display Names */

AlertDialog.displayName = 'AlertDialog';
AlertDialogContent.displayName = 'AlertDialogContent';
AlertDialogOverlay.displayName = 'AlertDialogOverlay';
AlertDialogContentWrapper.displayName = 'AlertDialogContentWrapper';
