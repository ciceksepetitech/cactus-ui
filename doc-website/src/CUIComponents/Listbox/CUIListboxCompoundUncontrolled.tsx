import '@ciceksepeti/cui-listbox/styles.css';

import {
  ListboxButton,
  ListboxInput,
  ListboxItem,
  ListboxPopover,
} from '@ciceksepeti/cui-listbox';
import React, { useRef } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIListboxCompoundUncontrolled() {
  const inputRef = useRef(null);
  return (
    <PreviewContainer title="Compound Listbox - Uncontrolled">
      <ListboxButton aria-labelledby="listbox4" defaultValue="banana">
        <ListboxInput ref={inputRef} />
        <ListboxPopover>
          <ListboxItem value="apple">apple</ListboxItem>
          <ListboxItem value="orange">orange</ListboxItem>
          <ListboxItem value="cherry">cherry</ListboxItem>
          <ListboxItem value="banana">banana</ListboxItem>
        </ListboxPopover>
      </ListboxButton>
      <button onClick={() => alert(inputRef.current?.value)}>Submit</button>
    </PreviewContainer>
  );
}
export default CUIListboxCompoundUncontrolled;
