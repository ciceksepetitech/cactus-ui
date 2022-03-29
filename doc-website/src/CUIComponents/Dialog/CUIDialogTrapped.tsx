import { Dialog } from '@ciceksepeti/cui-dialog';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';
import { args } from './args';

function CUIDialogTrapped() {
  const [open, setOpen] = useState(args.open);
  const buttonStyles = {
    margin: '3px 5px',
    padding: '5px',
    cursor: 'pointer',
  };

  const dialogStyles = {
    display: 'flex',
    flexDirection: 'column',
  };

  return (
    <PreviewContainer title="Trapped Dialog">
      <div>
        <button style={buttonStyles}>unfocusable button1</button>
        <button style={buttonStyles} onClick={() => setOpen(true)}>
          show 'trapped' dialog
        </button>
        <Dialog {...args} style={dialogStyles} open={open}>
          <p>focusing with tab should not leave the dialog!</p>
          <button style={buttonStyles}>should be auto focused</button>
          <button style={buttonStyles}>second button</button>
          <button style={buttonStyles} onClick={() => setOpen(false)}>
            close button
          </button>
        </Dialog>
      </div>
    </PreviewContainer>
  );
}

export default CUIDialogTrapped;
