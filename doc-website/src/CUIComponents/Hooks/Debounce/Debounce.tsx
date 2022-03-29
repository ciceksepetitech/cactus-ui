import { useDebounce } from '@ciceksepeti/cui-hooks';
import React, { useState } from 'react';

function Debounce() {
  const [text, setText] = useState(
    'This text will change 1 second later after finishing the typing.'
  );

  const debouncedText = useDebounce(text, 1000);

  return (
    <div>
      <p>{debouncedText}</p>
      <input
        type="text"
        style={{ padding: '10px', width: '100%' }}
        placeholder="Type here to test"
        onChange={(event) => setText(event.target.value)}
      />
    </div>
  );
}

export default Debounce;
