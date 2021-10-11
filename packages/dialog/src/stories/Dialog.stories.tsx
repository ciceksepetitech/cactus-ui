import React, { useState, useEffect } from 'react';
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

const FocusTrapTemplate = (args) => {
  const buttonStyles: React.CSSProperties = {
    margin: '3px 5px',
    padding: '5px',
    cursor: 'pointer'
  };

  const dialogStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div>
      <button style={buttonStyles}>unfocusable button1</button>
      <button style={buttonStyles}>unfocusable button2</button>
      <Dialog {...args} open={true} style={dialogStyles}>
        <p>focusing with tab should not leave the dialog!</p>
        <button style={buttonStyles}>should be auto focused</button>
        <button style={buttonStyles}>second button</button>
        <button style={buttonStyles}>third button</button>
      </Dialog>
    </div>
  );
};

export const FocusTrap = FocusTrapTemplate.bind({});

FocusTrap.args = {};

/**
 * FocusTrapPreview
 */

const FocusTrapPreviewTemplate = (args) => {
  const [showDialog, setShowDialog] = useState(args.open);

  useEffect(() => {
    setShowDialog(args.open);
  }, [args.open]);

  const buttonStyles: React.CSSProperties = {
    margin: '3px 5px',
    padding: '5px',
    cursor: 'pointer'
  };

  const dialogStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column'
  };

  return (
    <div>
      <div style={{ height: '200vh' }}>
        <button style={buttonStyles}>unfocusable while modal is shown</button>
        <button style={buttonStyles} onClick={() => setShowDialog(!showDialog)}>
          show dialog
        </button>
      </div>
      <Dialog
        {...args}
        open={showDialog}
        style={dialogStyles}
        aria-label="some desc"
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

export const FocusTrapPreview = FocusTrapPreviewTemplate.bind({});

FocusTrapPreview.args = {
  open: false
};
