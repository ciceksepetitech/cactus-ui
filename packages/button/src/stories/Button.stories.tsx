import React from 'react';
import { action } from '@storybook/addon-actions';
import Button from '..';

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      options: ['primary', 'secondary'],
      control: { type: 'radio' }
    }
  }
};

export const Primary = ({ variant }) => {
  const handleOnClick = (e) => {
    console.log(`Hello from ${variant}!`);
    action('button-click')(e);
  };

  return <Button variant={variant} onClick={handleOnClick} />;
};

Primary.args = {
  variant: 'secondary'
};
