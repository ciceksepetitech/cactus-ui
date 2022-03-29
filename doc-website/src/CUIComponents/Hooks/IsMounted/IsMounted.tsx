import { useIsMounted } from '@ciceksepeti/cui-hooks';
import React, { useEffect, useState } from 'react';

const IsMounted = () => {
  const [text, setText] = useState('');
  const isMounted = useIsMounted();

  useEffect(() => {
    if (isMounted()) setText('Mounted');
    else setText('Not mounted');
  }, [isMounted]);

  return (
    <div>
      <span className='fw-800'>RESULT: </span>
      {text}
    </div>
  );
};

export default IsMounted;
