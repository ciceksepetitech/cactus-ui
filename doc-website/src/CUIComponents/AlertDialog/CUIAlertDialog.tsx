import { AlertDialog } from '@ciceksepeti/cui-alert-dialog';
import React, { useState } from 'react';

type AlertDialogProps = {
  open: boolean;
  as: React.ElementType;
  removeScrollBar: boolean;
  autoFocusToLast: boolean;
  autoFocusToFirst: boolean;
  disableFocusTrap: boolean;
  enableRemoveScroll: boolean;
  restoreFocusOnUnmount: boolean;
};

function CUIAlertDialog() {
  const [open, setOpen] = useState<boolean>(false);
  const args: AlertDialogProps = {
    open,
    as: 'div',
    removeScrollBar: true,
    autoFocusToLast: false,
    autoFocusToFirst: false,
    disableFocusTrap: false,
    enableRemoveScroll: true,
    restoreFocusOnUnmount: true,
  };
  const buttonStyles = {
    padding: '5px',
    margin: '3px 5px',
    cursor: 'pointer',
  };

  const alertDialogStateHandler = () => {
    setOpen(!open);
  };

  return (
    <>
      <AlertDialog
        aria-label="alert-dialog"
        aria-describedby="alert-desc"
        {...args}
      >
        <p id="alert-desc">
          Develop success from failures. Discouragement and failure are two of
          the surest stepping stones to success. - Dale Carnegie
        </p>

        <button style={buttonStyles} onClick={alertDialogStateHandler}>
          Confirm
        </button>
        <button
          style={buttonStyles}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={true}
          onClick={alertDialogStateHandler}
        >
          Focused
        </button>
      </AlertDialog>
      <button onClick={alertDialogStateHandler}>
        Show me something inspirational
      </button>
    </>
  );
}

export default CUIAlertDialog;
