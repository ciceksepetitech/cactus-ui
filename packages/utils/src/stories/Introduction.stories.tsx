import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';

const IntroductionComponent = () => {
  return (
    <div>
      <section aria-label="header">
        <h1>Welcome to Çiçeksepeti React Components</h1>
        <p>
          This is a collection of accessible, reusable React components built with TypeScript.
        </p>
      </section>
    </div>
  );
};

const meta: Meta<typeof IntroductionComponent> = {
  title: 'Introduction',
  component: IntroductionComponent,
  parameters: {
    layout: 'centered',
    docs: {
      page: null
    }
  }
};

export default meta;
type Story = StoryObj<typeof IntroductionComponent>;

export const Introduction: Story = {
  render: () => <IntroductionComponent />
};
