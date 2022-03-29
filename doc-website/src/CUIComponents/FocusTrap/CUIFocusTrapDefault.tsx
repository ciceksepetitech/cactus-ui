import FocusTrap from '@ciceksepeti/cui-focus-trap';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIFocusTrapDefault() {
  const buttonStyle = {
    cursor: 'pointer',
    margin: '3px 5px',
    padding: '5px',
  };

  return (
    <PreviewContainer title="Focus Trap Default">
      <FocusTrap
        as="div"
        autoFocusToFirst={false}
        restoreFocusOnUnmount
        className="focus-trap"
      >
        <div>
          <p className="op-60">
            // Click here and press the tab button to see the focus trap how it
            works.
          </p>
          <button style={buttonStyle}>focusable</button>
          <button style={buttonStyle}>focusable</button>
          <button style={buttonStyle}>focusable</button>
          <button disabled style={buttonStyle}>
            disabled
          </button>
          <span>
            <button style={{ ...buttonStyle, visibility: 'hidden' }}>
              hidden
            </button>
            <button style={buttonStyle} tabIndex={-1}>
              tabindex -1
            </button>
          </span>
          <button style={buttonStyle}>focusable</button>
        </div>
      </FocusTrap>
    </PreviewContainer>
  );
}
export default CUIFocusTrapDefault;
