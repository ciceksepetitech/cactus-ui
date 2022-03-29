import { useForceUpdate } from '@ciceksepeti/cui-hooks';
import React, { useRef } from 'react';

import PreviewContainer from '../../Containers/PreviewContainer/PreviewContainer';

function ForceUpdate() {
  const ref1 = useRef({ count: 0 });
  const ref2 = useRef({ count: 0 });
  const forceUpdate = useForceUpdate();

  return (
    <div>
      <PreviewContainer title="" contentType="">
        <p>
          First Ref Count: <span className="fw-800">{ref1.current.count}</span>
        </p>
        <button className="p-10 w-100" onClick={() => ref1.current.count++}>
          increment
        </button>
      </PreviewContainer>
      <PreviewContainer title="" contentType="">
        <p>
          Second Ref Count: <span className="fw-800">{ref2.current.count}</span>
        </p>
        <button className="p-10 w-100" onClick={() => ref2.current.count--}>
          decrement
        </button>
      </PreviewContainer>
      <div>
        <button className="p-10 mt-10 w-100" onClick={() => forceUpdate()}>
          force update
        </button>
      </div>
    </div>
  );
}

export default ForceUpdate;
