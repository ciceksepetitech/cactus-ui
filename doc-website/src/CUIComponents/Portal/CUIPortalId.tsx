import { Portal } from '@ciceksepeti/cui-portal';
import React from 'react';

import { args } from './args';

function CUIPortalId() {
  return (
    <div>
      <div
        id="my-container"
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '3px solid #52AD36',
        }}
      >
        <span>Container</span>
      </div>
      <Portal {...args} containerId="my-container">
        I am in a portal appended next to Container by{' '}
        <b>
          <u>id</u>
        </b>
      </Portal>
    </div>
  );
}
export default CUIPortalId;
