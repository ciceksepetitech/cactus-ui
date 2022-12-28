import { Alert } from '@ciceksepeti/cui-alert';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIAlertWithType({ args }) {
  return (
    <PreviewContainer title="Default Version">
      <Alert type='assertive' {...args}>I am an alert with 'assertive' type</Alert>
    </PreviewContainer>
  );
}

export default CUIAlertWithType;
