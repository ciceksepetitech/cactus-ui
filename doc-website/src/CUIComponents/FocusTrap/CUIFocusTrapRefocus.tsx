import FocusTrap from '@ciceksepeti/cui-focus-trap';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIFocusTrapRefocus() {
  const buttonStyles = {
    padding: '5px',
    margin: '3px 5px',
    cursor: 'pointer',
  };
  const args = {
    as: 'div',
    disabled: false,
    autoFocusToFirst: true,
    autoFocusToLast: false,
    restoreFocusOnUnmount: true,
  };

  const [open, setOpen] = useState(false);

  return (
    <PreviewContainer title="Focus Trap Refocus">
      <button style={buttonStyles}>some button</button>
      <button style={buttonStyles} onClick={() => setOpen(true)}>
        Show Panel
      </button>
      <button style={buttonStyles}>Some Button</button>
      {open && (
        <div
          style={{
            padding: 10,
            borderRadius: 4,
            margin: '10px 5px',
            border: '1px solid green',
          }}
        >
          <FocusTrap {...args} className="focus-trap">
            <h3 style={{ marginTop: 0 }}>Trapped Panel</h3>
            <button style={buttonStyles}>Focusable</button>
            <button style={buttonStyles}>Focusable</button>
            <button style={buttonStyles} onClick={() => setOpen(false)}>
              Close panel
            </button>
          </FocusTrap>
        </div>
      )}
    </PreviewContainer>
  );
}

export default CUIFocusTrapRefocus;
