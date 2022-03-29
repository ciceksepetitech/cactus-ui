import { Dialog } from '@ciceksepeti/cui-dialog';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';
import { args } from './args';

function CUIDialogDefault() {
  const [open, setOpen] = useState<boolean>(args.open);

  const buttonStyles = {
    margin: '3px 5px',
    padding: '5px',
    cursor: 'pointer',
  };
  return (
    <PreviewContainer title="Default Dialog">
      <button style={buttonStyles} onClick={() => setOpen(true)}>
        show 'default' dialog
      </button>
      <Dialog {...args} open={open}>
        <p>I am a dialog</p>
        <button onClick={() => setOpen(false)}>Close Dialog</button>
      </Dialog>
    </PreviewContainer>
  );
}
export default CUIDialogDefault;
