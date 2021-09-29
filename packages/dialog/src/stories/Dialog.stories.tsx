import React from 'react';
import '../../styles.css';

const Template = (args) => <div {...args} />;

/**
 * Default
 */
export const Default = Template.bind({});

Default.args = {
  children: 'I am an dialog'
};
