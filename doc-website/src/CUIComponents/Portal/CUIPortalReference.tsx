import { Portal } from '@ciceksepeti/cui-portal';
import React, { useRef } from 'react';

import { args } from './args';

function CUIPortalReference() {
  const ref = useRef(null);
  return (
    <div>
      <div
        ref={ref}
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '3px solid #52AD36',
        }}
      >
        Container
      </div>
      <Portal {...args} containerRef={ref}>
        I am in a portal appended next to Container by{' '}
        <b>
          <u>ref</u>
        </b>
      </Portal>
    </div>
  );
}
export default CUIPortalReference;
