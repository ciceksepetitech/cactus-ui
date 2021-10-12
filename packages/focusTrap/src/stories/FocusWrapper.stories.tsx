import React, { useState } from 'react';
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
  }
};

const buttonStyles = { margin: '3px 5px', padding: '5px', cursor: 'pointer' };
const Button = (props) => (
  <button style={{ ...buttonStyles, ...props.styles }} {...props} />
);

/**
 * Default
 */
const DefaultTemplate = (args) => {
  return (
    <>
      <p>
        Buttons right below inside of a <b>FocusTrap</b> component. Except{' '}
        <b>disabled, tabindex -1 and hidden button</b>, all other buttons are
        focusable
      </p>
      <FocusTrap {...args}>
        <div>
          <Button>focusable</Button>
          <Button>focusable</Button>
          <Button>focusable</Button>
          <Button disabled>disabled</Button>
          <span>
            <Button style={{ visibility: 'hidden' }}>hidden</Button>
            <Button tabIndex={-1}>tabindex -1</Button>
          </span>
          <Button>focusable</Button>
        </div>
      </FocusTrap>
    </>
  );
};

export const Default = DefaultTemplate.bind({});

Default.args = {
  disabled: false,
  autoFocusToLast: false,
  autoFocusToFirst: true,
  restoreFocusOnUnmount: true
};

/**
 * Restore Focus On Unmount
 */
const RestoreFocusOnUnmountTemplate = (args) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p>
        <b>show panel</b> button will render bunch of buttons inside a{' '}
        <b>FocusTrap</b>. Those buttons will be focusable and when{' '}
        <b>close panel</b> button is clicked, last focused button (
        <b>show panel</b>) will be auto focused again
      </p>
      <Button>some button</Button>
      <Button onClick={() => setOpen(true)}>show panel</Button>
      <Button>some button</Button>
      {open && (
        <div
          style={{
            padding: 10,
            borderRadius: 4,
            margin: '10px 5px',
            border: '1px solid red'
          }}
        >
          <FocusTrap {...args}>
            <h3 style={{ marginTop: 0 }}>Trapped Panel</h3>
            <Button>focusable</Button>
            <Button>focusable</Button>
            <Button onClick={() => setOpen(false)}>close panel</Button>
          </FocusTrap>
        </div>
      )}
    </div>
  );
};

export const RestoreFocusOnUnmount = RestoreFocusOnUnmountTemplate.bind({});

RestoreFocusOnUnmount.args = {
  restoreFocusOnUnmount: true
};
