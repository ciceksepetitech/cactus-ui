import { useFindFocusableElements } from '@ciceksepeti/cui-hooks';
import React, { useCallback, useRef, useState } from 'react';

const FindFocusableElements = () => {
  const ref = useRef(null);
  const [refNode, setRefNode] = useState();
  const { focusableElements } = useFindFocusableElements(refNode);

  const refCallback = useCallback((node) => {
    ref.current = node;
    setRefNode(node);
  }, []);

  return (
    <div ref={refCallback}>
      <div>
        <span className='fw-800'>Element 1 - </span>
        <button data-isfocusable='button 1 is focusable'>button</button>
      </div>
      <div>
        <span className='fw-800'>Element 2 - </span>
        <button data-isfocusable='button 2 is focusable'>button</button>
      </div>
      <div>
        <span className='fw-800'>Element 3 - </span>
        <p data-isfocusable='untabbable' className='d-inline'>
          text
        </p>
      </div>
      <div>
        <span className='fw-800'>Element 4 - </span>
        <span data-isfocusable='untabbable'>text</span>
      </div>

      <div className='useFindTabbable mt-10'>
        <span className='fw-800'>RETURNING INFO AREA</span>
        <ul>
          {focusableElements?.map((each, index) => (
            <li key={index}>{each.dataset.isfocusable}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FindFocusableElements;
