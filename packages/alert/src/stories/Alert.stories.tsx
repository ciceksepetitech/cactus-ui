import React, { useState } from 'react';
import Alert from '..';

export default {
  title: 'Components/Alert',
  component: Alert
};

export const AlertComponent = () => {
  return <Alert style={{ color: 'red' }}>I am an alert</Alert>;
};

export const AlertAsSpan = () => {
  return <Alert as="span">I am an alert as a span tag</Alert>;
};

export const AlertGenerate = () => {
  const [rerender, setRerender] = useState(0);

  return (
    <>
      <button onClick={() => setRerender(rerender + 1)}>Add Alert</button>
      <br />
      {rerender > 0 && (
        <Alert as="span">{`I am an alert! (${rerender})`}</Alert>
      )}
    </>
  );
};

export const AlertAsync = () => {
  const [alerts, setAlerts] = useState([]);

  const onAddAlert = () => {
    setTimeout(() => {
      setAlerts((oldAlerts) => {
        const updatedAlerts = [
          ...oldAlerts,
          `I am an alert (${oldAlerts.length + 1})`
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
    <div>
      <button onClick={onAddAlert}>Add Alert</button>
      <button onClick={onRemoveAlert}>Remove Alert</button>
      <br />
      {alerts.map((each) => (
        <Alert key={each}>{each}</Alert>
      ))}
    </div>
  );
};
