import React, { useState, useRef } from 'react';
import Popover from '..';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, cleanup, screen, waitFor } from '../../../../utils/test-setup';

describe('popover component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('popover should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('expect popover content to be not rendered', async () => {
    render(<Component />);
    expect(screen.queryAllByText('inside')).toHaveLength(0);
  });

  test('expect popover content to be rendered', async () => {
    render(<Component open />);
    screen.getAllByText('inside');
  });

  test('expect popover should respect to placement', async () => {
    render(<Component open placement="top" />);
    screen.getAllByText('inside');
  });

  test('expect popover should respect to placement', async () => {
    render(<Component open placement="left" />);
    screen.getAllByText('inside');
  });

  test('expect popover should respect to placement', async () => {
    render(<Component open placement="right" />);
    screen.getAllByText('inside');
  });

  test('expect popover not to change tab order when not rendered', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const autoFocused = screen.getByTestId(/autoFocused/i);
    expect(document.activeElement === autoFocused).toBeTruthy();

    await user.tab();

    const toggler = screen.getByText(/click me/i);
    expect(document.activeElement === toggler).toBeTruthy();

    await user.tab();

    const afterTarget = screen.getByTestId(/afterTarget/i);
    expect(document.activeElement === afterTarget).toBeTruthy();
  });

  test('expect popover tabbable elements to be in order', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const autoFocused = screen.getByTestId(/autoFocused/i);
    expect(document.activeElement === autoFocused).toBeTruthy();

    await user.tab();

    const toggler = screen.getByText(/click me/i);
    expect(document.activeElement === toggler).toBeTruthy();

    await user.click(toggler);
    await waitFor(() => {
      expect(screen.getByTestId(/inside/i)).toBeInTheDocument();
    });

    const inside = screen.getByTestId(/inside/i);

    inside.focus();
    await waitFor(() => {
      expect(document.activeElement === inside).toBeTruthy();
    });

    const afterTarget = screen.getByTestId(/afterTarget/i);
    afterTarget.focus();
    await waitFor(() => {
      expect(document.activeElement === afterTarget).toBeTruthy();
    });

    inside.focus();
    await waitFor(() => {
      expect(document.activeElement === inside).toBeTruthy();
    });

    toggler.focus();
    await waitFor(() => {
      expect(document.activeElement === toggler).toBeTruthy();
    });
  });

  test('expect popover tabbable elements to be in order even if not portalled', async () => {
    const user = userEvent.setup();
    render(<Component portal={false} />);

    const autoFocused = screen.getByTestId(/autoFocused/i);
    expect(document.activeElement === autoFocused).toBeTruthy();

    await user.tab();

    const toggler = screen.getByText(/click me/i);
    expect(document.activeElement === toggler).toBeTruthy();

    await user.click(toggler);
    await waitFor(() => {
      expect(screen.getByTestId(/inside/i)).toBeInTheDocument();
    });

    const inside = screen.getByTestId(/inside/i);

    inside.focus();
    await waitFor(() => {
      expect(document.activeElement === inside).toBeTruthy();
    });

    const afterTarget = screen.getByTestId(/afterTarget/i);
    afterTarget.focus();
    await waitFor(() => {
      expect(document.activeElement === afterTarget).toBeTruthy();
    });

    inside.focus();
    await waitFor(() => {
      expect(document.activeElement === inside).toBeTruthy();
    });

    toggler.focus();
    await waitFor(() => {
      expect(document.activeElement === toggler).toBeTruthy();
    });
  });
});

const Component = ({ open, ...rest }: any) => {
  const targetRef = useRef(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(open);

  return (
    <div>
      <button data-testid="autoFocused" autoFocus>
        button
      </button>
      <button ref={targetRef} onClick={() => setIsPopoverOpen(!isPopoverOpen)}>
        click me
      </button>
      <button data-testid="afterTarget">button</button>
      {isPopoverOpen && (
        <Popover targetRef={targetRef} {...rest}>
          <p style={{ width: '250px' }}>text</p>
          <button data-testid="inside">inside</button>
        </Popover>
      )}
    </div>
  );
};
