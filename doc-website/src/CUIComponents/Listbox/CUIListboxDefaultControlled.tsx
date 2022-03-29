import '@ciceksepeti/cui-listbox/styles.css';

import { Listbox, ListboxItem } from '@ciceksepeti/cui-listbox';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIListboxDefaultControlled() {
  const [value, setValue] = useState('apple');

  return (
    <PreviewContainer title="Listbox Default - Controlled">
      <Listbox
        value={value}
        onChange={(value) => setValue(value)}
        aria-labelledby="listbox1"
      >
        <ListboxItem value="apple">apple</ListboxItem>
        <ListboxItem value="orange">orange</ListboxItem>
        <ListboxItem value="cherry">cherry</ListboxItem>
        <ListboxItem value="banana">banana</ListboxItem>
      </Listbox>
      <span style={{ marginLeft: '5px' }}>Current State: {value}</span>
    </PreviewContainer>
  );
}
export default CUIListboxDefaultControlled;
