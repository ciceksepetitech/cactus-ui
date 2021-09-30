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
export const Default = () => {
  return (
    <div>
      <div style={styles}>
        <span>Some Container</span>
      </div>
      <Portal>I am in a portal appended to body</Portal>
    </div>
  );
};

/**
 * Appends portal to another element by ref
 */
export const AppendToElementByRef = () => {
  const ref = useRef(null);

  return (
    <div>
      <div ref={ref} style={styles}>
        Some Container
      </div>
      <Portal containerRef={ref}>
        I am in a portal appended next to Some Container by ref
      </Portal>
    </div>
  );
};

/**
 * Appends portal to another element by id
 */
export const AppendToElementById = () => {
  return (
    <div>
      <div id="my-container" style={styles}>
        <span>Some Container</span>
      </div>
      <Portal containerId="my-container">
        I am in a portal appended next to Some Container by id
      </Portal>
    </div>
  );
};
