import { useFindTabbableElements } from '@ciceksepeti/cui-hooks';
import React, { useCallback, useRef, useState } from 'react';

const FindTabbableElements = () => {
  const ref = useRef(null);
  const [refNode, setRefNode] = useState();
  const { tabbableElements } = useFindTabbableElements(refNode);

  const refCallback = useCallback((node: any) => {
    ref.current = node;
    setRefNode(node);
  }, []);

  return (
    <div ref={refCallback}>
      <div>
        <span className='fw-800'>Element 1 - </span>
        <button data-istabbable='button 1 is tabbable'>button</button>
      </div>
      <div>
        <span className='fw-800'>Element 2 - </span>
        <button data-istabbable='button 2 is tabbable'>button</button>
      </div>
      <div>
        <span className='fw-800'>Element 3 - </span>
        <p data-istabbable='untabbable' className='d-inline'>
          text
        </p>
      </div>
      <div>
        <span className='fw-800'>Element 4 - </span>
        <span data-istabbable='untabbable'>text</span>
      </div>

      <div className='useFindTabbable mt-10'>
        <span className='fw-800'>RETURNING INFO AREA</span>
        <ul>
          {tabbableElements?.map((each, index) => (
            <li key={index}>{each.dataset.istabbable}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FindTabbableElements;
