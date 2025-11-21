import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import SkipNav from '..';
import '../../styles.css';

const meta: Meta<typeof SkipNav> = {
  title: 'Components/Skip Nav',
  component: SkipNav,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Enables skipping navigation or any other component when user tabs. Useful for situations when there are lots of component when tab is pressed to pass them'
      }
    }
  },
  args: {
    as: 'div'
  },
  argTypes: {
    as: {
      name: 'as',
      control: { type: 'text' },
      description:
        'changes html tag of skip nav component which renders to DOM',
      table: {
        defaultValue: { summary: 'div' },
        type: { summary: 'Values', detail: 'Valid HTML Tags' }
      }
    }
  }
};

export default meta;
type Story = StoryObj<typeof SkipNav>;

export const Default: Story = {
  render: (args) => {
    return (
      <div style={{ maxWidth: '50vw' }}>
        <SkipNav
          targetId="some-id"
          style={{
            margin: '10px',
            padding: '10px',
            backgroundColor: 'white'
          }}
        >
          Skip Navigation
        </SkipNav>
        <h1>Navigation</h1>
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
          <li>
            <a href="#">Link 4</a>
          </li>
          <li>
            <a href="#">Link 5</a>
          </li>
        </ul>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco. Occaecat consequat nisi sit
          officia eu sint cupidatat officia adipisicing consectetur. Velit
          occaecat ullamco ex ullamco non mollit dolor qui deserunt anim
          excepteur aliquip non. Quis in laboris laborum proident Lorem irure
          qui sint eu ullamco.
        </p>
        <h1 id="some-id">Target Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Links</h1>
        <ul>
          <li>
            <a href="#">Link 1</a>
          </li>
          <li>
            <a href="#">Link 2</a>
          </li>
          <li>
            <a href="#">Link 3</a>
          </li>
        </ul>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <div style={{ position: 'relative' }}>
          <SkipNav
            targetId="some-id-2"
            style={{
              padding: '10px',
              position: 'absolute',
              backgroundColor: 'white'
            }}
          >
            Skip Navigation 2
          </SkipNav>
          <h1>Some Links</h1>
          <ul>
            <li>
              <a href="#">Link 1</a>
            </li>
            <li>
              <a href="#">Link 2</a>
            </li>
            <li>
              <a href="#">Link 3</a>
            </li>
          </ul>
        </div>
        <h1 id="some-id-2">Target Content 2</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
        <h1>Some Content</h1>
        <p>
          Aute esse excepteur velit id nostrud in. Sint culpa eiusmod officia
          labore cillum incididunt id. Occaecat sunt dolore culpa fugiat
          occaecat ex. Aliquip voluptate anim laboris Lorem ex dolor laboris.
          Qui pariatur in pariatur eiusmod id officia non anim tempor aliquip ut
          ad. Occaecat consequat nisi sit officia eu sint cupidatat officia
          adipisicing consectetur. Velit occaecat ullamco ex ullamco non mollit
          dolor qui deserunt anim excepteur aliquip non. Quis in laboris laborum
          proident Lorem irure qui sint eu ullamco.
        </p>
      </div>
    );
  }
};
