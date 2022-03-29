import '@ciceksepeti/cui-listbox/styles.css';

import { Listbox, ListboxItem } from '@ciceksepeti/cui-listbox';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIListboxSearch() {
  const [search, setSearch] = useState('');
  const items = [
    { value: 'apple', label: 'apple' },
    { value: 'orange', label: 'orange' },
    { value: 'cherry', label: 'cherry' },
    { value: 'banana', label: 'banana' },
  ];
  return (
    <PreviewContainer title="Listbox with Search Input">
      <Listbox
        as="button"
        aria-labelledby="listbox3"
        name="listbox3"
        style={{
          width: 200,
        }}
      >
        <input
          onChange={(e) => {
            setSearch(e.target.value);
          }}
          placeholder="Search"
          style={{
            margin: '10px 0 10px 10px',
          }}
          type="text"
          value={search}
        />
        {items
          .filter(({ label }) => label.includes(search))
          .map(({ value, label }) => (
            <ListboxItem key={value} value={value}>
              {label}
            </ListboxItem>
          ))}
      </Listbox>
    </PreviewContainer>
  );
}

export default CUIListboxSearch;
