import React, { useRef } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Portal from '..';

const meta: Meta<typeof Portal> = {
  title: 'Components/Portal',
  component: Portal,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Portal component mounts its content in a specific area of the DOM. Default renders to end of the body tag. But the render area can be determined by ref or id'
      }
    }
  },
  argTypes: {
    containerRef: {
      name: 'containerRef',
      description: 'reference to a container element'
    },
    containerId: {
      name: 'containerId',
      control: { type: 'text' },
      description: 'element id of a container element'
    }
  }
};

export default meta;
type Story = StoryObj<typeof Portal>;

export const Default: Story = {
  render: (args) => {
    return (
      <div>
        <div
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '3px solid #52AD36'
          }}
        >
          <span>Container</span>
        </div>
        <Portal {...args}>I am in a portal appended to body</Portal>
      </div>
    );
  }
};

export const Reference: Story = {
  render: (args) => {
    const ref = useRef<Node>(null);
    return (
      <div>
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          style={{
            padding: '10px',
            borderRadius: '6px',
            border: '3px solid #52AD36'
          }}
        >
          Container
        </div>
        <Portal {...args} containerRef={ref}>
          I am in a portal appended next to Container by ref
        </Portal>
      </div>
    );
  }
};

export const Id: Story = {
  render: (args) => (
    <div>
      <div
        id="my-container"
        style={{
          padding: '10px',
          borderRadius: '6px',
          border: '3px solid #52AD36'
        }}
      >
        <span>Container</span>
      </div>
      <Portal {...args} containerId="my-container">
        I am in a portal appended next to Container by id
      </Portal>
    </div>
  )
};
