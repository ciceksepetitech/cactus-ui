import React, { useState } from 'react';
import Alert from '..';
import '../../styles.css';
import { Meta } from '@storybook/react';

/**
 * Setup
 */
export default {
  title: 'Components/Alert',
  component: Alert,
  argTypes: {
    as: {
      defaultValue: 'div',
      control: { type: 'text' },
      description:
        'enables changing the html tag of alert component which will render to DOM',
      table: {
        type: { summary: 'html tag' },
        defaultValue: { summary: 'div' }
      }
    },
    type: {
      defaultValue: 'polite',
      control: { type: 'select' },
      description: 'type for accessibility',
      options: ['polite', 'assertive', 'off'],
      table: {
        type: { summary: 'aria-live values' },
        defaultValue: { summary: 'polite' }
      }
    }
  },
  parameters: {
    docs: {
      source: {
        state: 'open'
      }
    }
  }
} as Meta;

const Template = (args) => <Alert {...args} />;

/**
 * Default
 */
export const Default = Template.bind({});

Default.args = {
  children: 'I am an alert'
};

/**
 * As Span
 */
export const AsSpan = Template.bind({});

AsSpan.args = {
  as: 'span',
  children: 'I am an alert as a span tag'
};

/**
 * With Styles Attribute
 */
export const WithStylesAttribute = Template.bind({});

WithStylesAttribute.args = {
  children: 'I am an alert with styles attribute',
  style: {
    color: 'firebrick',
    fontStyle: 'italic',
    borderColor: 'firebrick',
    border: '2px solid firebrick'
  }
};

/**
 * Render Manually
 */
export const RenderManually = () => {
  const [reRender, setReRender] = useState(0);

  return (
    <section aria-label="alert component manually mounted">
      <button
        style={{ marginBottom: 10, padding: 5, width: '100%' }}
        onClick={() => setReRender(reRender + 1)}
      >
        Add Alert
      </button>
      {reRender > 0 && <Alert>{`I am an alert! (${reRender})`}</Alert>}
    </section>
  );
};

/**
 * Render Async
 */
export const RenderAsync = () => {
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
        <Alert key={each + index} style={{ marginBottom: 5 }}>
          {each}
        </Alert>
      ))}
    </section>
  );
};
