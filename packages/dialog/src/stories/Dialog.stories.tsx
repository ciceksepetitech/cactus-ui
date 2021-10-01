import React, { useState } from 'react';
import Dialog from '..';
import '../../styles.css';
import { Meta } from '@storybook/react';

/**
 * Setup
 */
export default {
  title: 'Components/Dialog',
  component: Dialog,
  argTypes: {
    as: {
      defaultValue: 'div',
      control: { type: 'text' },
      description:
        'enables changing the html tag of dialog component which will render to DOM',
      table: {
        type: { summary: 'html tag' },
        defaultValue: { summary: 'div' }
      }
    }
  },
  parameters: {
    docs: {
      source: {
        state: 'open'
      }
    }
  }
} as Meta;

const Template = (args) => <Dialog {...args} />;

/**
 * Default
 */
export const Default = Template.bind({});

Default.args = {
  open: true,
  children: 'I am a dialog'
};

/**
 * FocusTrap
 */
export const FocusTrap = () => {
  const buttonStyles = { margin: '3px 5px', padding: '5px', cursor: 'pointer' };
  const dialogStyles = {
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div>
      <button style={buttonStyles}>unfocusable button1</button>
      <button style={buttonStyles}>unfocusable button2</button>
      <Dialog open={true} style={dialogStyles}>
        <p>focusing with tab should not leave the dialog!</p>
        <button style={buttonStyles}>should be auto focused</button>
        <button style={buttonStyles}>second button</button>
        <button style={buttonStyles}>third button</button>
      </Dialog>
    </div>
  );
};

/**
 * FocusTrap
 */
export const FocusPreview = () => {
  const [showDialog, setShowDialog] = useState(false);

  const buttonStyles = { margin: '3px 5px', padding: '5px', cursor: 'pointer' };
  const dialogStyles = {
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div>
      <button style={buttonStyles}>unfocusable while modal is shown</button>
      <button style={buttonStyles} onClick={() => setShowDialog(!showDialog)}>
        show dialog
      </button>
      <Dialog
        open={showDialog}
        style={dialogStyles}
        onEscapeKey={() => setShowDialog(false)}
        onClickOutside={() => setShowDialog(false)}
      >
        <p>focusing with tab should not leave the dialog!</p>
        <button style={buttonStyles}>should be auto focused</button>
        <button style={buttonStyles} onClick={() => setShowDialog(false)}>
          Close
        </button>
      </Dialog>
    </div>
  );
};
