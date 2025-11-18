import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import {
  Accordion,
  AccordionHeader,
  AccordionButton,
  AccordionContent
} from '..';

const meta: Meta<typeof Accordion> = {
  title: 'Components/Accordion',
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `An accordion is a vertically stacked set of interactive headings that each contain a title, content snippet, or thumbnail representing a section of content. The headings function as controls that enable users to reveal or hide their associated sections of content. Accordions are commonly used to reduce the need to scroll when presenting multiple sections of content on a single page.`
      }
    }
  },
  args: {
    as: 'div',
    single: true,
    collapsible: true,
    disableOptionalArrowKeys: false
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description:
        'changes html tag of accordion component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    },
    single: {
      name: 'single',
      control: { type: 'boolean' },
      description: 'sets the accordion toggle option',
      table: { defaultValue: { summary: 'true' } }
    },
    collapsible: {
      name: 'collapsible',
      control: { type: 'boolean' },
      description: 'sets if accordion can collape or not',
      table: { defaultValue: { summary: 'true' } }
    },
    disableOptionalArrowKeys: {
      name: 'disableOptionalArrowKeys',
      control: { type: 'boolean' },
      description: 'sets optional arrow type behaviour',
      table: { defaultValue: { summary: 'false' } }
    },
    indexes: {
      name: 'indexes',
      description: 'sets expanded indexes',
      table: { defaultValue: { summary: undefined } }
    },
    defaultIndexes: {
      name: 'defaultIndexes',
      description: 'sets expanded defaultIndexes',
      table: { defaultValue: { summary: undefined } }
    },
    onChange: {
      name: 'onChange',
      description: 'gets called when accordion is toggled',
      table: { defaultValue: { summary: undefined } }
    }
  }
};

export default meta;
type Story = StoryObj<typeof Accordion>;

export const Default: Story = {
  render: (args) => {
    return (
      <Accordion {...args}>
        <AccordionHeader>
          <AccordionButton>Step 1</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 1: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton disabled>Step 2</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 2: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </AccordionContent>
        <AccordionHeader>
          <AccordionButton>Step 3</AccordionButton>
        </AccordionHeader>
        <AccordionContent>
          Step 3: Lorem Ipsum is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book.
        </AccordionContent>
      </Accordion>
    );
  }
};
