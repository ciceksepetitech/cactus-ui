import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import VisuallyHidden from '..';

const meta: Meta<typeof VisuallyHidden> = {
  title: 'Components/Visually Hidden',
  component: VisuallyHidden,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Visually hides its content from UI without removing it from DOM. Assistive technologies can still attract with the element but it will not take any space at the DOM. VisuallyHidden is a polymorphic component. That's why can be rendered as any valid HTML tag"
      }
    }
  },
  args: {
    as: 'div',
    disabled: false
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description:
        'changes html tag of visually hidden component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    disabled: {
      name: 'disabled',
      control: { type: 'boolean' },
      table: { defaultValue: { summary: 'false' } },
      description: 'enables disabling behavior of visually hidden component'
    }
  }
};

export default meta;
type Story = StoryObj<typeof VisuallyHidden>;

export const Default: Story = {
  render: (args) => (
    <div>
      <span>The text "Should not be seen!" should not be seen below 😊</span>
      <VisuallyHidden {...args}>Should not be seen!</VisuallyHidden>
    </div>
  )
};

export const WithDescription: Story = {
  render: (args) => {
    return (
      <div>
        <VisuallyHidden {...args}>
          This text is visually hidden but available to screen readers
        </VisuallyHidden>
        <p>Visible content</p>
      </div>
    );
  }
};
