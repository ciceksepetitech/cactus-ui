import React, { useRef } from 'react';
import Portal from '..';
import { Meta } from '@storybook/react';

export default {
  title: 'Components/Portal',
  component: Portal,
  argTypes: {
    as: {
      defaultValue: 'div',
      control: { type: 'text' },
      description:
        'enables changing the html tag of portal component which will render to DOM',
      table: {
        type: { summary: 'html tag' },
        defaultValue: { summary: 'div' }
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

const styles = {
  padding: '10px',
  margin: '10px 0px',
  borderRadius: '6px',
  border: '3px solid #E14336'
};

/**
 * Default
 */
const DefaultTemplate = (args) => {
  return (
    <div>
      <div style={styles}>
        <span>Some Container</span>
      </div>
      <Portal {...args}>I am in a portal appended to body</Portal>
    </div>
  );
};

export const Default = DefaultTemplate.bind({});

Default.args = {};

/**
 * Appends portal to another element by ref
 */
const AppendToElementByRefTemplate = (args) => {
  const ref = useRef(null);

  return (
    <div>
      <div ref={ref} style={styles}>
        Some Container
      </div>
      <Portal {...args} containerRef={ref}>
        I am in a portal appended next to Some Container by ref
      </Portal>
    </div>
  );
};

export const AppendToElementByRef = AppendToElementByRefTemplate.bind({});

AppendToElementByRef.args = {};

/**
 * Appends portal to another element by id
 */
const AppendToElementByIdTemplate = (args) => {
  return (
    <div>
      <div id="my-container" style={styles}>
        <span>Some Container</span>
      </div>
      <Portal {...args} containerId="my-container">
        I am in a portal appended next to Some Container by id
      </Portal>
    </div>
  );
};

export const AppendToElementById = AppendToElementByIdTemplate.bind({});

AppendToElementById.args = {};
