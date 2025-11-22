import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Tabs, TabList, Tab, TabPanelList, TabPanel } from '..';
import '../../styles.css';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'The Tabs component consists of clickable tabs, that are aligned side by side. Tabs make it easy to explore and switch between different views. Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.'
      }
    }
  },
  args: {
    as: 'div',
    defaultIndex: 0,
    orientation: 'horizontal',
    activationType: 'auto'
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description: 'changes html tag of tabs component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    defaultIndex: {
      name: 'defaultIndex',
      control: { type: 'number' },
      description: 'default selected tab',
      table: { defaultValue: { summary: '0' } }
    },
    orientation: {
      control: { type: 'select' },
      options: ['horizontal', 'vertical'],
      description: 'orientation of tabs',
      table: {
        defaultValue: { summary: 'horizontal' },
        type: { summary: 'string' }
      }
    },
    activationType: {
      control: { type: 'select' },
      options: ['auto', 'manual'],
      description: 'activation type of tabs',
      table: {
        defaultValue: { summary: 'auto' },
        type: { summary: 'string' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args}>
      <TabList>
        <Tab>Tab1</Tab>
        <Tab disabled>Tab2</Tab>
        <Tab disabled>Tab3</Tab>
        <Tab>Tab4</Tab>
        <Tab disabled>Tab5</Tab>
      </TabList>
      <TabPanelList>
        <TabPanel>Panel1</TabPanel>
        <TabPanel>Panel2</TabPanel>
        <TabPanel>Panel3</TabPanel>
        <TabPanel>Panel4</TabPanel>
        <TabPanel>Panel5</TabPanel>
      </TabPanelList>
    </Tabs>
  )
};

export const RenderProps: Story = {
  render: (args) => (
    <Tabs {...args}>
      {({ selectedTabIndex, focusedTabIndex }) => {
        return (
          <React.Fragment>
            <TabList>
              <Tab>Tab1</Tab>
              <Tab disabled>
                {focusedTabIndex === 0 ? 'focus on left' : 'focus on right'}
              </Tab>
              <Tab>{selectedTabIndex === 2 ? 'selected' : 'not selected'}</Tab>
            </TabList>
            <TabPanelList>
              <TabPanel>Panel1</TabPanel>
              <TabPanel>Panel2</TabPanel>
              <TabPanel>Panel3</TabPanel>
            </TabPanelList>
          </React.Fragment>
        );
      }}
    </Tabs>
  )
};
