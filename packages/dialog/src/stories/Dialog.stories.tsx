import React from 'react';
import Dialog from '..';
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
  children: 'I am a dialog'
};
