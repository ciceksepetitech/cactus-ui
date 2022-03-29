import React, { useRef, useState } from 'react';
import { useOnClickOutside } from '@ciceksepeti/cui-hooks';

const OnClickOutside = () => {
  const [activate, setActivate] = useState(false);
  const [counter, setCounter] = useState(0)
  const insideRef = useRef(null);
  const outsideRef = useRef(null);


  const onOutsideClick = () => {
    if (activate) {

      setCounter(prevState => prevState + 1)
    }
  };

  useOnClickOutside(insideRef, onOutsideClick);

  return (
    <div>
      <div>
        <p>
          Testing area is{' '}
          <span className="fw-800">{activate ? 'Active' : 'Deactive'}</span> now
        </p>
        <button
          onClick={() => {
            setActivate(!activate);
          }}
          className="mb-15 p-10 "
        >
          {activate ? 'Deactivate' : 'Activate'} onOutsideClick Testing Area
        </button>
      </div>
      <div
        ref={outsideRef}
        className={`useclick__outside ${!activate && 'useclick__outside--filter'
          }`}
      >
        outside
        <div ref={insideRef} className="useclick__inside">
          inside
        </div>
      </div>

      <div className="mt-10">
        <p>Counter: <span className='fw-800'>{counter}</span></p>
      </div>
    </div>
  );
};

export default OnClickOutside;
