import { Portal } from '@ciceksepeti/cui-portal';
import React from 'react';

import { args } from './args';

function CUIPortalDefault() {
  return (
    <div>
      <div
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '3px solid #52AD36',
        }}
      >
        <span>Container</span>
      </div>
      <Portal {...args}>
        <div className="portal__child">
          This box is inside the{' '}
          <b>
            <u>default</u>
          </b>{' '}
          portal
        </div>
      </Portal>
    </div>
  );
}
export default CUIPortalDefault;
