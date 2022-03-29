import '@ciceksepeti/cui-listbox/styles.css';

import { Listbox, ListboxItem } from '@ciceksepeti/cui-listbox';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIListboxPrefix() {
  return (
    <PreviewContainer title="Listbox with Prefix">
      <Listbox
        name="listbox2"
        prefix={<span style={{ marginRight: 5 }}>#</span>}
        aria-labelledby="listbox2"
        style={{
          width: 200,
        }}
        as="button"
      >
        <ListboxItem value="item1">item 1</ListboxItem>
        <ListboxItem value="item2">item 2</ListboxItem>
        <ListboxItem value="item3">item 3</ListboxItem>
        <ListboxItem value="item4">item 4</ListboxItem>
      </Listbox>
    </PreviewContainer>
  );
}

export default CUIListboxPrefix;
