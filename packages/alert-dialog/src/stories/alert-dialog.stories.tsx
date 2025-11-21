import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import AlertDialog from '..';
import '../../styles.css';

const meta: Meta<typeof AlertDialog> = {
  title: 'Components/Alert Dialog',
  component: AlertDialog,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Provides accessible alert dialog for situations like user confirmation is needed'
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
      name: 'as',
      control: { type: 'text' },
      description: 'changes html tag of dialog component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    open: {
      name: 'open',
      control: { type: 'boolean' },
      description: 'show/hide dialog component',
      table: { defaultValue: { summary: 'false' } }
    },
    removeScrollBar: {
      name: 'removeScrollBar',
      control: { type: 'boolean' },
      description: 'removes scroll bar from UI',
      table: { defaultValue: { summary: 'true' } }
    },
    autoFocusToLast: {
      name: 'autoFocusToLast',
      control: { type: 'boolean' },
      description: 'auto focus to last element of dialog',
      table: { defaultValue: { summary: 'false' } }
    },
    autoFocusToFirst: {
      name: 'autoFocusToFirst',
      control: { type: 'boolean' },
      description: 'auto focus to first element of dialog',
      table: { defaultValue: { summary: 'true' } }
    },
    disableFocusTrap: {
      name: 'disableFocusTrap',
      control: { type: 'boolean' },
      description: 'disables focus trap functionality',
      table: { defaultValue: { summary: 'false' } }
    },
    enableRemoveScroll: {
      name: 'enableRemoveScroll',
      control: { type: 'boolean' },
      description: 'enables disabling scroll events when dialog is mounted',
      table: { defaultValue: { summary: 'true' } }
    },
    restoreFocusOnUnmount: {
      name: 'restoreFocusOnUnmount',
      control: { type: 'boolean' },
      description: 'enables restoring of focus when dialog is unmounted',
      table: { defaultValue: { summary: 'true' } }
    },
    onEscapeKey: {
      name: 'onEscapeKey',
      description: 'gets called when escape button is pressed'
    },
    onClickOutside: {
      name: 'onClickOutside',
      description: 'gets called when outside of dialog is clicked'
    }
  }
};

export default meta;
type Story = StoryObj<typeof AlertDialog>;

const buttonStyles = {
  padding: '5px',
  margin: '3px 5px',
  cursor: 'pointer'
};

export const Default: Story = {
  render: (args) => {
    const [open, setOpen] = useState(args.open);
    return (
      <>
        <button style={buttonStyles} onClick={() => setOpen(true)}>
          Show Alert Dialog
        </button>
        <AlertDialog
          aria-label="alert-dialog"
          aria-describedby="alert-desc"
          {...args}
          open={open}
          onEscapeKey={() => setOpen(false)}
          onClickOutside={() => setOpen(false)}
        >
          <p id="alert-desc">
            Lorem incididunt ipsum in nostrud. Nisi commodo aliqua magna
            exercitation exercitation dolore minim commodo adipisicing veniam
            eiusmod ut aute ad. Consectetur consectetur enim nostrud duis
            laboris ex fugiat consequat veniam excepteur quis. Aute veniam
            voluptate deserunt commodo aliquip amet enim cillum magna proident.
          </p>
          <button style={buttonStyles} onClick={() => setOpen(false)}>
            Confirm
          </button>
          <button style={buttonStyles} autoFocus onClick={() => setOpen(false)}>
            Cancel
          </button>
        </AlertDialog>
      </>
    );
  }
};
