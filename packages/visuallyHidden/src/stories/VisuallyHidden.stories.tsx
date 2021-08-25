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
        'enables changing the tag of alert component which will render to DOM'
    }
  }
};

export const Default = () => {
  return (
    <>
      <p>"Should not be seen!" should not be seen below 😊</p>
      <VisuallyHidden>Should not be seen!</VisuallyHidden>
    </>
  );
};

Default.parameters = {
  docs: {
    source: {
      state: 'open'
    }
  }
};
