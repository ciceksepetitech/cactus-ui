import '@ciceksepeti/cui-listbox/styles.css';

import {
  ListboxButton,
  ListboxItem,
  ListboxPopover,
} from '@ciceksepeti/cui-listbox';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIListboxCompoundControlled() {
  const [value, setValue] = useState('orange');
  return (
    <PreviewContainer title="Compound Listbox - Controlled">
      <ListboxButton
        aria-labelledby="listbox4"
        value={value}
        onChange={(value) => setValue(value)}
      >
        <ListboxPopover>
          <ListboxItem value="apple">apple</ListboxItem>
          <ListboxItem value="orange">orange</ListboxItem>
          <ListboxItem value="cherry">cherry</ListboxItem>
          <ListboxItem value="banana">banana</ListboxItem>
        </ListboxPopover>
      </ListboxButton>
      <span style={{ marginLeft: '1rem' }}>Current State : {value}</span>
    </PreviewContainer>
  );
}
export default CUIListboxCompoundControlled;
