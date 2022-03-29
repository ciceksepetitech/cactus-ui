import { usePrevious } from '@ciceksepeti/cui-hooks';
import React, { useState } from 'react';

const Previous = () => {
  const [count, setCount] = useState(0);

  const previousValue = usePrevious(count);

  return (
    <div>
      <span className='d-block'>
        Previous Value: <span className='fw-800'>{previousValue}</span>
      </span>
      <span className='d-block'>Value: {count}</span>

      <button className='p-10 mt-10 w-100' onClick={() => setCount(count + 1)}>
        Update Value
      </button>
    </div>
  );
};

export default Previous;
