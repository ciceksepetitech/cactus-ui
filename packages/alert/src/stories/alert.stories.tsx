import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Alert from '..';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert',
  component: Alert,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Alert component displays an important/unimportant message to get the user's attention without interrupting the user. It is mainly focused on web accessibility. Thus, with aria-live and role attributes, we try to ensure that many assistive technologies announce the message to users according to the notification level specified by the developer. Alert is a polymorphic component. That's why can be rendered as any valid HTML tag.`
      }
    }
  },
  args: {
    as: 'div',
    type: 'polite'
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description: 'changes html tag of alert component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    type: {
      name: 'type',
      control: { type: 'select' },
      description: 'type for accessibility',
      options: ['polite', 'assertive', 'off'],
      table: {
        defaultValue: { summary: 'polite' },
        type: { summary: 'Values', detail: 'Valid aria-live Values' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Alert>;

export const Default: Story = {
  render: (args) => <Alert {...args}>I am an alert</Alert>
};

export const RenderManually: Story = {
  render: (args) => {
    const [reRender, setReRender] = useState(0);
    return (
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
    );
  }
};

export const RenderAsync: Story = {
  render: (args) => {
    const [alerts, setAlerts] = useState<string[]>([]);
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
          <Alert {...args} key={each + index} style={{ marginBottom: 5 }}>
            {each}
          </Alert>
        ))}
      </section>
    );
  }
};
