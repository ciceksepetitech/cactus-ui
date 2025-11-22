import React, { useState, useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Popover from '..';

const meta: Meta<typeof Popover> = {
  title: 'Components/Popover',
  component: Popover,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Popover component displays floating content positioned relative to a target element'
      }
    }
  },
  args: {
    as: 'div'
  },
  argTypes: {
    as: {
      control: { type: 'text' },
      description: 'changes html tag which renders to DOM'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Popover>;

export const Default: Story = {
  render: (args) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    return (
      <div style={{ height: '100vh' }}>
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </p>
        <div>
          <button>some button</button>
          <button>some button</button>
          <button
            ref={targetRef}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            click me
          </button>
          <button>some button</button>
        </div>
        {isPopoverOpen && (
          <Popover
            {...args}
            targetRef={targetRef}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              background: 'white',
              border: '1px solid #eee'
            }}
          >
            <p style={{ width: '250px' }}>
              Aliqua consectetur non ut id nostrud sit ipsum consequat officia
              adipisicing cillum aliquip ex. Ex est magna nostrud sit ad id
              minim nulla.
            </p>
            <button>inside</button>
            <button>inside</button>
          </Popover>
        )}
        <p>
          Contrary to popular belief, Lorem Ipsum is not simply random text. It
          has roots in a piece of classical Latin literature from 45 BC, making
          it over 2000 years old.
        </p>
      </div>
    );
  }
};

export const DynamicChildren: Story = {
  render: (args) => {
    const targetRef = useRef<HTMLButtonElement>(null);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const popoverInnerText = 'Inside text';
    const [popoverInnerTextList, setPopoverInnerTextList] = useState(
      new Array(7).fill(popoverInnerText)
    );

    const addTextToPopover = () => {
      setPopoverInnerTextList((prev) => [...prev, popoverInnerText]);
    };

    const removeLastChildFromPopover = () => {
      setPopoverInnerTextList((prev) => [...prev].slice(0, -1));
    };

    return (
      <div style={{ height: '100vh' }}>
        <div style={{ height: '100vh', position: 'relative' }}>
          <p>
            Example of Popover with dynamic children. Popover respects the
            children's changes. When children changed, Popover automatically
            re-calculate its height and position in both cases that flipped or
            not.
          </p>
          <p>
            Click the button below and add/delete an item to the popover to see
            the behavior for each child change.
          </p>
          <button
            style={{ position: 'absolute', top: '50%' }}
            ref={targetRef}
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            click me
          </button>
        </div>
        {isPopoverOpen && (
          <Popover
            {...args}
            targetRef={targetRef}
            style={{
              padding: '5px 10px',
              borderRadius: '4px',
              background: 'white',
              border: '1px solid #eee'
            }}
          >
            <p>Test</p>
            {popoverInnerTextList.map((item, index) => (
              <p key={index}>Inside text</p>
            ))}
            <button onClick={addTextToPopover}>Add text</button>
            <button onClick={removeLastChildFromPopover}>Remove Text</button>
          </Popover>
        )}
      </div>
    );
  }
};
