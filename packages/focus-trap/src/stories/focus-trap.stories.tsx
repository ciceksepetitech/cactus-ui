import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import FocusTrap from '..';

const meta: Meta<typeof FocusTrap> = {
  title: 'Components/Focus Trap',
  component: FocusTrap,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "FocusTrap component traps focus events inside of its boundries. It is developed according to the accessibility rules. User cannot leave the trap boundries unless disables it. Great match for components like Modals, Dialogs and etc. FocusTrap is a polymorphic component. That's why can be rendered as any valid HTML tag"
      }
    }
  },
  args: {
    as: 'div',
    disabled: false,
    autoFocusToLast: false,
    autoFocusToFirst: true,
    restoreFocusOnUnmount: true
  },
  argTypes: {
    as: {
      control: { type: 'text' },
      description: 'changes html tag which renders to DOM'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'disables focus trap'
    },
    autoFocusToLast: {
      control: { type: 'boolean' },
      description: 'auto focus to last element'
    },
    autoFocusToFirst: {
      control: { type: 'boolean' },
      description: 'auto focus to first element'
    },
    restoreFocusOnUnmount: {
      control: { type: 'boolean' },
      description: 'restores focus when unmounted'
    }
  }
};

export default meta;
type Story = StoryObj<typeof FocusTrap>;

const buttonStyles = {
  padding: '5px',
  margin: '3px 5px',
  cursor: 'pointer'
};

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <FocusTrap {...args}>
          <div>
            <button style={buttonStyles}>focusable</button>
            <button style={buttonStyles}>focusable</button>
            <button style={buttonStyles}>focusable</button>
            <button disabled style={buttonStyles}>
              disabled
            </button>
            <span>
              <button style={{ ...buttonStyles, visibility: 'hidden' }}>
                hidden
              </button>
              <button style={buttonStyles} tabIndex={-1}>
                tabindex -1
              </button>
            </span>
            <button style={buttonStyles}>focusable</button>
          </div>
        </FocusTrap>
      </div>
    );
  }
};

export const RefocusOnUnmount: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <div>
        <button style={buttonStyles}>some button</button>
        <button style={buttonStyles} onClick={() => setOpen(true)}>
          show panel
        </button>
        <button style={buttonStyles}>some button</button>
        {open && (
          <div
            style={{
              padding: 10,
              borderRadius: 4,
              margin: '10px 5px',
              border: '1px solid red'
            }}
          >
            <FocusTrap {...args}>
              <h3 style={{ marginTop: 0 }}>Trapped Panel</h3>
              <button style={buttonStyles}>focusable</button>
              <button style={buttonStyles}>focusable</button>
              <button style={buttonStyles} onClick={() => setOpen(false)}>
                close panel
              </button>
            </FocusTrap>
          </div>
        )}
      </div>
    );
  }
};

export const AutoFocusAttribute: Story = {
  render: (args) => (
    <FocusTrap {...args}>
      <button style={buttonStyles}>focusable</button>
      <button style={buttonStyles} autoFocus>
        autoFocus
      </button>
      <button style={buttonStyles}>focusable</button>
    </FocusTrap>
  )
};
