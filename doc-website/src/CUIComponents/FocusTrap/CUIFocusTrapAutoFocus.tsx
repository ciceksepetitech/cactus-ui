import { Dialog } from '@ciceksepeti/cui-dialog';
import FocusTrap from '@ciceksepeti/cui-focus-trap';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIFocusTrapAutoFocus() {
  const buttonStyles = {
    padding: '5px',
    margin: '3px 5px',
    cursor: 'pointer',
  };

  const [open, setOpen] = useState(false);

  return (
    <PreviewContainer title="Focus Trap Autofocus">
      <button style={buttonStyles} onClick={() => setOpen(true)}>
        Show Panel With autoFocus Attribute
      </button>
      <Dialog
        open={open}
        disableFocusTrap="true"
        onClickOutside={() => setOpen(false)}
        onEscapeKey={() => setOpen(false)}
      >
        <FocusTrap className="focus-trap">
          <button style={buttonStyles}>focusable</button>
          <button style={buttonStyles} autoFocus>
            autoFocus
          </button>
          <button style={buttonStyles}>focusable</button>
          <button style={buttonStyles} onClick={() => setOpen(false)}>
            Close Dialog
          </button>
        </FocusTrap>
      </Dialog>
    </PreviewContainer>
  );
}

export default CUIFocusTrapAutoFocus;
