type ArgTypes = {
  as: string,
  open: boolean,
  removeScrollBar: boolean,
  autoFocusToLast: boolean,
  autoFocusToFirst: boolean,
  disableFocusTrap: boolean,
  enableRemoveScroll: boolean,
  restoreFocusOnUnmount: boolean,
};

export const args: ArgTypes = {
  as: 'div',
  open: false,
  removeScrollBar: false,
  autoFocusToLast: false,
  autoFocusToFirst: true,
  disableFocusTrap: false,
  enableRemoveScroll: false,
  restoreFocusOnUnmount: true,
};
