import React, { useRef, useState } from 'react';
import { useLatestValue } from '@ciceksepeti/cui-hooks';

const LatestValue = () => {
  const [text, setText] = useState('This text will change')

  const ref = useRef(null)
  const latest = useLatestValue(ref)

  const onChangeHandler = () => {
    const { value } = latest.current.current;
    setText(value)
  }

  return (
    <div>
      <input type="text" ref={ref} onChange={onChangeHandler} placeholder='Please type here...' className='p-10' />
      <p className='d-block mt-10'>Example: <span className='fw-800'>{text}</span></p>
    </div>
  );
};

export default LatestValue;
