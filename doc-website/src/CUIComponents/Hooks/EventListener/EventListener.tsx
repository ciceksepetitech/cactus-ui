import React, { useRef, useState } from 'react';
import { useEventListener } from '@ciceksepeti/cui-hooks';

function EventListener() {
  const [counter, setCounter] = useState(0)
  const clickRef = useRef(null);
  const dblclickRef = useRef(null);
  const mouserOverRef = useRef(null);
  const mouseOutRef = useRef(null);

  const listenerHandler = () => {
    setCounter(prevState => prevState + 1)
  };

  useEventListener({
    name: 'click',
    target: clickRef,
    listener: listenerHandler,
  });

  useEventListener({
    name: 'dblclick',
    target: dblclickRef,
    listener: listenerHandler,
  });

  useEventListener({
    name: 'mouseover',
    target: mouserOverRef,
    listener: listenerHandler,
  });

  useEventListener({
    name: 'mouseout',
    target: mouseOutRef,
    listener: listenerHandler,
  });

  return (
    <div>
      <button className="p-10 mr-10" ref={clickRef}>
        click event
      </button>
      <button className="p-10 mr-10" ref={dblclickRef}>
        double click event
      </button>
      <button className="p-10 mr-10" ref={mouserOverRef}>
        mouseover event
      </button>
      <button className="p-10 mr-10" ref={mouseOutRef}>
        mouse out event
      </button>
      <div className="mt-10">
        <p>Counter: <span className='fw-800'>{counter}</span></p>
      </div>
    </div>
  );
}

export default EventListener;
