import { useIsomorphicLayoutEffect } from '@ciceksepeti/cui-hooks';
import React, { useState } from 'react';

const IsomorphicLayoutEffect = () => {
  const [text, setText] = useState('');

  useIsomorphicLayoutEffect(() => {
    setText('useIsomorphicLayoutEffect Called');
  }, []);

  return (
    <div>
      <span className='fw-800'>Result: </span> {text}
    </div>
  );
};

export default IsomorphicLayoutEffect;
