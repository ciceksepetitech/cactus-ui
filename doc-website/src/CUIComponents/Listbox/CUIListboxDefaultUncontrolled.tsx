import '@ciceksepeti/cui-listbox/styles.css';

import { Listbox, ListboxInput, ListboxItem } from '@ciceksepeti/cui-listbox';
import React, { useRef } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIListboxDefaultUncontrolled() {
  const inputRef = useRef(null);

  return (
    <PreviewContainer title="Listbox Default - Uncontrolled">
      <Listbox aria-labelledby="listbox 10">
        <ListboxInput ref={inputRef} />
        <ListboxItem value="apple">apple</ListboxItem>
        <ListboxItem value="orange">orange</ListboxItem>
        <ListboxItem value="cherry">cherry</ListboxItem>
        <ListboxItem value="banana">banana</ListboxItem>
      </Listbox>
      <button
        onClick={() => alert(inputRef.current?.value)}
        style={{ marginLeft: '1rem' }}
      >
        Submit
      </button>
    </PreviewContainer>
  );
}

export default CUIListboxDefaultUncontrolled;
