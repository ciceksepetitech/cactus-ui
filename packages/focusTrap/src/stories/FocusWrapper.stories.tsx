import React from 'react';
import FocusTrap from '..';

export default {
  title: 'Components/FocusTrap',
  component: FocusTrap,
  argTypes: {
    as: {
      defaultValue: 'div',
      control: { type: 'text' },
      description: 'usefull for handling tab in a specific portion of DOM',
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
};

/**
 * Default
 */
export const Default = () => {
  const buttonStyles = { margin: '3px 5px', padding: '5px', cursor: 'pointer' };

  return (
    <FocusTrap>
      <div>
        <button style={buttonStyles}>focusable button</button>
        <button style={buttonStyles}>focusable button</button>
        <button style={buttonStyles}>focusable button</button>
        <button style={buttonStyles} disabled>
          cant focus disabled
        </button>
        <button style={{ ...buttonStyles, visibility: 'hidden' }}>
          cant focus hidden
        </button>
        <button style={buttonStyles} tabIndex={-1}>
          cant focus tabindex -1
        </button>
        <button style={buttonStyles}>focusable button</button>
      </div>
    </FocusTrap>
  );
};
