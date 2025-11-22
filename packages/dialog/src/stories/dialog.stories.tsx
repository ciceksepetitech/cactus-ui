import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Dialog from '..';
import '../../styles.css';

const meta: Meta<typeof Dialog> = {
  title: 'Components/Dialog',
  component: Dialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          "Shows the relevant content in a Dialog in accordance with accessibility rules. Dialog is a polymorphic component. That's why can be rendered as any valid HTML tag"
      }
    }
  },
  args: {
    as: 'div',
    open: false,
    removeScrollBar: true,
    autoFocusToLast: false,
    autoFocusToFirst: true,
    disableFocusTrap: false,
    enableRemoveScroll: true,
    restoreFocusOnUnmount: true
  },
  argTypes: {
    as: {
      control: { type: 'text' },
      description: 'changes html tag of dialog component which renders to DOM'
    },
    open: {
      control: { type: 'boolean' },
      description: 'show/hide dialog component'
    },
    removeScrollBar: {
      control: { type: 'boolean' },
      description: 'removes scroll bar from UI'
    },
    autoFocusToLast: {
      control: { type: 'boolean' },
      description: 'auto focus to last element of dialog'
    },
    autoFocusToFirst: {
      control: { type: 'boolean' },
      description: 'auto focus to first element of dialog'
    },
    disableFocusTrap: {
      control: { type: 'boolean' },
      description: 'disables focus trap functionality'
    },
    enableRemoveScroll: {
      control: { type: 'boolean' },
      description: 'enables disabling scroll events when dialog is mounted'
    },
    restoreFocusOnUnmount: {
      control: { type: 'boolean' },
      description: 'enables restoring of focus when dialog is unmounted'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Dialog>;

const buttonStyles = {
  margin: '3px 5px',
  padding: '5px',
  cursor: 'pointer'
};

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    return (
      <>
        <button style={buttonStyles} onClick={() => setOpen(true)}>
          Show Dialog
        </button>
        <Dialog {...args} open={open}>
          <p>I am a dialog</p>
          <button style={buttonStyles} onClick={() => setOpen(false)}>
            Close
          </button>
        </Dialog>
      </>
    );
  }
};

export const WithEscape: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    return (
      <>
        <button style={buttonStyles} onClick={() => setOpen(true)}>
          Show Dialog
        </button>
        <Dialog {...args} open={open} onEscapeKey={() => setOpen(false)}>
          <p>Press ESC to close</p>
          <button style={buttonStyles} onClick={() => setOpen(false)}>
            Close
          </button>
        </Dialog>
      </>
    );
  }
};

export const Trapped: Story = {
  render: (args) => {
    const [open, setOpen] = useState(false);
    const dialogStyles = {
      display: 'flex',
      flexDirection: 'column' as const
    };
    return (
      <div style={{ minHeight: '150vh' }}>
        <button style={buttonStyles}>unfocusable button1</button>
        <button style={buttonStyles} onClick={() => setOpen(true)}>
          show dialog
        </button>
        <Dialog {...args} style={dialogStyles} open={open}>
          <p>focusing with tab should not leave the dialog!</p>
          <button style={buttonStyles}>should be auto focused</button>
          <button style={buttonStyles}>second button</button>
          <button style={buttonStyles} onClick={() => setOpen(false)}>
            close button
          </button>
        </Dialog>
      </div>
    );
  }
};
