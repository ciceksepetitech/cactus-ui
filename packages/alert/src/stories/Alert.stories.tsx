import React, { useState } from 'react';
import Alert from '..';
import '../../styles.css';

export default {
  title: 'Components/Alert',
  component: Alert
};

export const AlertComponent = () => {
  return <Alert>I am an alert</Alert>;
};

export const AlertAsSpan = () => {
  return <Alert as="span">I am an alert as a span tag</Alert>;
};

export const AlertWithStylesAttribute = () => {
  return (
    <Alert
      style={{
        color: 'steelblue',
        fontStyle: 'italic',
        borderColor: 'steelblue'
      }}
    >
      I am an alert with styles attribute
    </Alert>
  );
};

export const AlertGenerate = () => {
  const [rerender, setRerender] = useState(0);

  return (
    <div aria-label="alert component manually mounted">
      <button
        style={{ marginBottom: 10, padding: 5, width: '100%' }}
        onClick={() => setRerender(rerender + 1)}
      >
        Add Alert
      </button>
      {rerender > 0 && <Alert>{`I am an alert! (${rerender})`}</Alert>}
    </div>
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
    <div aria-label="alert component mounted with setTimeout, async">
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
        <Alert key={each + index} style={{ marginBottom: 5 }}>
          {each}
        </Alert>
      ))}
    </div>
  );
};
