import { Alert } from '@ciceksepeti/cui-alert';
import React, { useState } from 'react';
import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIAlertManual({ args }) {
  const [reRender, setReRender] = useState<number>(0);
  return (
    <PreviewContainer title="Manually Rendered Version">
      <section aria-label="alert component manually mounted">
        <button
          style={{ marginBottom: 10, padding: 5, width: '100%' }}
          onClick={() => setReRender(reRender + 1)}
        >
          Add Alert
        </button>
        {reRender > 0 && (
          <Alert {...args}>{`I am an alert! (${reRender})`}</Alert>
        )}
      </section>
    </PreviewContainer>
  );
}
export default CUIAlertManual;
