import { useIsCSR } from '@ciceksepeti/cui-hooks';
import React from 'react';

const IsCSR = () => {
  const isCSR = useIsCSR();
  return (
    <div>
      <span className='fw-800'>RESULT: </span>
      {isCSR
        ? 'Running in browser - Client Side'
        : 'Not running in browser - Server Side'}
    </div>
  );
};

export default IsCSR;
