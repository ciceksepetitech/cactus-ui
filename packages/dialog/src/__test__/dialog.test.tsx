import React from 'react';
import Dialog from '..';
import { axe } from 'jest-axe';
import { render, cleanup, screen } from '@cs/component-utils';

describe('dialog component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('dialog component can have a11y attributes', () => {
    render(
      <Dialog open aria-labelledby="title">
        <h1 data-testid="title" id="title">
          I am a title
        </h1>
      </Dialog>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-labelledby', 'title');

    screen.getByText(/i am a title/i);
  });

  test('dialog component should not render children when closed', () => {
    render(<Component open={false} />);
    expect(screen.queryByText(/i am a dialog/i)).toBe(null);
  });

  test('dialog should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const Component = (props) => <Dialog {...props}>I am a dialog</Dialog>;
