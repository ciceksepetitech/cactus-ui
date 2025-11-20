import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { RadioGroup, Radio } from '..';
import '../../styles.css';

const meta: Meta<typeof RadioGroup> = {
  title: 'Components/Radio Group',
  component: RadioGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Radio buttons allow the user to select one option from a set. Once a radio group is established, selecting any radio button in that group automatically deselects any currently-selected radio button in the same group. RadioGroup is a polymorphic component. That's why can be rendered as any valid HTML tag"
      }
    }
  },
  args: {
    as: 'div',
    name: 'fruits',
    orientation: 'horizontal'
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description:
        'changes html tag of radio-group component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    orientation: {
      name: 'orientation',
      control: { type: 'select' },
      description: 'orientation of radios',
      options: ['horizontal', 'vertical'],
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'orientation of radios' }
      }
    },
    name: {
      name: 'name',
      control: { type: 'text' },
      description: 'name of input element',
      table: { defaultValue: { summary: '' } }
    },
    defaultValue: {
      name: 'defaultValue',
      control: { type: 'text' },
      description: 'defaultValue of input element',
      table: { defaultValue: { summary: '' } }
    },
    value: {
      name: 'value',
      control: { type: 'text' },
      description: 'value of input element',
      table: { defaultValue: { summary: '' } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args} aria-label="fruits">
      <label
        htmlFor="apple"
        id="apple-label"
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        <Radio
          disabled
          id="apple"
          value="apple"
          aria-labelledby="apple-label"
        />
        apple
      </label>
      <label
        htmlFor="cherry"
        id="cherry-label"
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        <Radio id="cherry" value="cherry" aria-labelledby="cherry-label" />
        cherry
      </label>
      <label
        htmlFor="orange"
        id="orange-label"
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        <Radio
          disabled
          id="orange"
          value="orange"
          aria-labelledby="orange-label"
        />
        orange
      </label>
      <label
        htmlFor="banana"
        id="banana-label"
        style={{ display: 'flex', alignItems: 'center', marginRight: '10px' }}
      >
        <Radio id="banana" value="banana" aria-labelledby="banana-label" />
        banana
      </label>
    </RadioGroup>
  )
};
