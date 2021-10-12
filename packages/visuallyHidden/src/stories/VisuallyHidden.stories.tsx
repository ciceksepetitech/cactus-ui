import React from 'react';
import VisuallyHidden from '..';

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden,
  argTypes: {
    as: {
      defaultValue: 'div',
      control: { type: 'text' },
      description:
        'enables changing the tag of alert component which will render to DOM',
      table: {
        type: { summary: 'html tag' },
        defaultValue: { summary: 'div' }
      }
    }
  }
};

/**
 * Default
 */
const DefaultTemplate = (args) => {
  return (
    <>
      <p>"Should not be seen!" should not be seen below 😊</p>
      <VisuallyHidden {...args}>Should not be seen!</VisuallyHidden>
    </>
  );
};

export const Default = DefaultTemplate.bind({});

Default.args = {};
