import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Listbox, ListboxButton, ListboxList, ListboxItem } from '..';
import '../../styles.css';

const meta: Meta<typeof Listbox> = {
  title: 'Components/Listbox',
  component: Listbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Renders list of elements. Listbox is a polymorphic component. That's why can be rendered as any valid HTML tag"
      }
    }
  },
  args: {
    as: 'div'
  },
  argTypes: {
    as: {
      control: { type: 'text' },
      description: 'changes html tag which renders to DOM'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Listbox>;

const options = [
  { value: 'apple', label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'orange', label: 'Orange' }
];

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('apple');
    return (
      <Listbox {...args} value={selected} onChange={setSelected}>
        <ListboxButton>{selected}</ListboxButton>
        <ListboxList>
          {options.map((option) => (
            <ListboxItem key={option.value} value={option.value}>
              {option.label}
            </ListboxItem>
          ))}
        </ListboxList>
      </Listbox>
    );
  }
};

export const WithDisabledItem: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('apple');
    return (
      <Listbox {...args} value={selected} onChange={setSelected}>
        <ListboxButton>{selected}</ListboxButton>
        <ListboxList>
          <ListboxItem value="apple">Apple</ListboxItem>
          <ListboxItem value="banana" disabled>
            Banana (disabled)
          </ListboxItem>
          <ListboxItem value="orange">Orange</ListboxItem>
        </ListboxList>
      </Listbox>
    );
  }
};

export const WithSearch: Story = {
  render: (args) => {
    const [selected, setSelected] = useState('apple');
    const [search, setSearch] = useState('');
    const items = [
      { value: 'apple', label: 'Apple' },
      { value: 'orange', label: 'Orange' },
      { value: 'cherry', label: 'Cherry' },
      { value: 'banana', label: 'Banana' }
    ];

    return (
      <div>
        <Listbox {...args} value={selected} onChange={setSelected}>
          <ListboxButton>{selected}</ListboxButton>
          <ListboxList>
            <input
              type="text"
              value={search}
              placeholder="Search"
              style={{
                margin: '10px',
                padding: '5px',
                width: 'calc(100% - 20px)'
              }}
              onChange={(event) => setSearch(event.target.value)}
            />
            {items
              .filter(({ label }) =>
                label.toLowerCase().includes(search.toLowerCase())
              )
              .map(({ value, label }) => (
                <ListboxItem key={value} value={value}>
                  {label}
                </ListboxItem>
              ))}
          </ListboxList>
        </Listbox>
        <div style={{ marginTop: '10px' }}>
          <strong>Selected Value:</strong> {selected}
        </div>
      </div>
    );
  }
};
