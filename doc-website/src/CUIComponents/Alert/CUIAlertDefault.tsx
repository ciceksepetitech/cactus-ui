import { Alert } from '@ciceksepeti/cui-alert';
import React from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIAlertDefault({ args }) {
  return (
    <PreviewContainer title="Default Version">
      <Alert {...args}>I am an alert</Alert>
    </PreviewContainer>
  );
}

export default CUIAlertDefault;
