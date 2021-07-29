import React from 'react';
import Alert from '..';

export default {
  title: 'Components/Alert',
  component: Alert
};

export const AlertComponent = () => {
  return <Alert style={{ color: 'red' }}>I am an alert</Alert>;
};

export const alertAsSpan = () => {
  return <Alert as="span">I am an alert as a span tag</Alert>;
};
