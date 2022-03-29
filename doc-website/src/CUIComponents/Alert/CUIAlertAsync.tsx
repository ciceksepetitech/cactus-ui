import { Alert } from '@ciceksepeti/cui-alert';
import React, { useState } from 'react';

import PreviewContainer from '../Containers/PreviewContainer/PreviewContainer';

function CUIAlertAsync({ args }) {
  const [alerts, setAlerts] = useState([]);
  const onAddAlert = () => {
    setTimeout(() => {
      setAlerts((oldAlerts) => {
        const updatedAlerts = [
          ...oldAlerts,
          `I am an alert (${oldAlerts.length + 1})`,
        ];
        return updatedAlerts;
      });
    }, 100);
  };
  const onRemoveAlert = () => {
    setAlerts((oldAlerts) => {
      const [, ...rest] = oldAlerts;
      return rest;
    });
  };
  return (
    <PreviewContainer title="Async Version">
      <section aria-label="alert component mounted with setTimeout, async">
        <div style={{ display: 'flex', marginBottom: 10 }}>
          <button
            onClick={onAddAlert}
            style={{ marginRight: 10, padding: 5, width: '100%' }}
          >
            Add Alert
          </button>
          <button onClick={onRemoveAlert} style={{ padding: 5, width: '100%' }}>
            Remove Alert
          </button>
        </div>
        {alerts.map((each, index) => (
          <Alert {...args} key={each + index} style={{ marginBottom: 5 }}>
            {each}
          </Alert>
        ))}
      </section>
    </PreviewContainer>
  );
}

export default CUIAlertAsync;
