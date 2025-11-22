import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from '..';
import '../../styles.css';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'tri-state checkbox components allow a user to input true/false/indeterminate states'
      }
    }
  },
  args: {
    as: 'div',
    id: 'rose',
    name: 'rose',
    value: 'rose',
    disabled: false,
    checked: undefined,
    indeterminate: false
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description:
        'changes html tag of checkbox component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    id: {
      name: 'id',
      control: { type: 'text' },
      description: 'id of input element',
      table: { defaultValue: { summary: 'rose' } }
    },
    name: {
      name: 'name',
      control: { type: 'text' },
      description: 'name of input element',
      table: { defaultValue: { summary: '' } }
    },
    indeterminate: {
      name: 'indeterminate',
      control: { type: 'boolean' },
      description: 'sets the indeterminate state',
      table: { defaultValue: { summary: 'false' } }
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      description: 'sets the disabled state',
      table: { defaultValue: { summary: 'false' } }
    },
    checked: {
      name: 'checked',
      control: { type: 'boolean' },
      description: 'sets the check state',
      table: { defaultValue: { summary: undefined } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  render: (args) => {
    return (
      <Checkbox {...args}>
        <label htmlFor={args.id}>Rose</label>
      </Checkbox>
    );
  }
};

export const Controlled: Story = {
  render: (args) => {
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        {...args}
        checked={checked}
        onChange={() => setChecked(!checked)}
      >
        <label htmlFor={args.id}>Controlled Checkbox</label>
      </Checkbox>
    );
  }
};
