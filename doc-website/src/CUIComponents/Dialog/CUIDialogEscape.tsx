import { Dialog } from '@ciceksepeti/cui-dialog';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';
import { args } from './args';

function CUIDialogEscape() {
  const [open, setOpen] = useState<boolean>(args.open);
  const buttonStyles = {
    margin: '3px 5px',
    padding: '5px',
    cursor: 'pointer',
  };
  const onEscapeKey = () => {
    setOpen(false);
  };
  const onClickOutside = () => {
    setOpen(false);
  };
  return (
    <PreviewContainer title="Escape Dialog">
      <button style={buttonStyles} onClick={() => setOpen(true)}>
        show 'escape' dialog
      </button>
      <Dialog
        {...args}
        open={open}
        onEscapeKey={onEscapeKey}
        onClickOutside={onClickOutside}
      >
        <p>I am a dialog</p>
      </Dialog>
    </PreviewContainer>
  );
}

export default CUIDialogEscape;
