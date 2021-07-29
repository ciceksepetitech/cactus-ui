import React from 'react';
import VisuallyHidden from '..';

export default {
  title: 'Components/VisuallyHidden',
  component: VisuallyHidden
};

export const VisuallyHiddenComponent = () => {
  return <VisuallyHidden>Should not be seen!</VisuallyHidden>;
};
