import React, { useState } from 'react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, waitFor } from '../../../../utils/test-setup';
import {
  Accordion,
  AccordionHeader,
  AccordionButton,
  AccordionContent
} from '..';

let consoleWarn;

describe('accordion component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  beforeEach(() => {
    consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
  });

  test('accordion component should warn when indexes and defaultIndexes provided at the same time', () => {
    render(<Component indexes={[2]} defaultIndexes={[1]} />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('accordion component should warn when indexes passed without onChange prop', () => {
    render(<Component indexes={[2]} />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('accordion component should warn when onChange passed without indexes prop', () => {
    render(<Component onChange={console.log} />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('accordion header component should warn when more than one child is passed', () => {
    render(<ComponentWithMoreHeaderChild />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('accordion content should be visible when button is clicked', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);

    expect(content1).toBeVisible();
  });

  test('accordion content should be hidden when button is toggled', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);
    expect(content1).toBeVisible();

    await user.click(step1);
    expect(content1).not.toBeVisible();
  });

  test('accordion content visibility should change when space is pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);
    expect(content1).toBeVisible();

    await user.keyboard(' ');
    await waitFor(() => {
      expect(content1).not.toBeVisible();
    });

    step1.focus();
    await user.keyboard(' ');
    await waitFor(() => {
      expect(content1).toBeVisible();
    });
  });

  test('accordion content should not be visible when button is disabled', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step2 = screen.getByText(/step2/i);
    const content2 = screen.getByText(/step two content/i);

    await user.click(step2);

    expect(content2).not.toBeVisible();
  });

  test('accordion contents should not be visible at the same time by default', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);

    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);
    expect(content1).toBeVisible();

    const content3 = screen.getByText(/step three content/i);

    await user.click(step3);
    expect(content3).toBeVisible();
    expect(content1).not.toBeVisible();
  });

  test('accordion contents can be visible at the same time when single prop is set to false', async () => {
    const user = userEvent.setup();
    render(<Component single={false} />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);

    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);
    expect(content1).toBeVisible();

    const content3 = screen.getByText(/step three content/i);

    await user.click(step3);
    expect(content3).toBeVisible();
    expect(content1).toBeVisible();
  });

  test('accordion content should be visible when collapsible is set to false', async () => {
    const user = userEvent.setup();
    render(<Component collapsible={false} />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);
    expect(content1).toBeVisible();

    await user.click(step1);
    expect(content1).toBeVisible();
  });

  test('accordion contents should be visible when collapsible is set to false and single is set to false', async () => {
    const user = userEvent.setup();
    render(<Component collapsible={false} single={false} />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);
    const content1 = screen.getByText(/step one content/i);
    const content3 = screen.getByText(/step three content/i);

    await user.click(step1);
    await user.click(step3);

    expect(content1).toBeVisible();
    expect(content3).toBeVisible();

    await user.click(step1);
    await user.click(step3);

    expect(content1).toBeVisible();
    expect(content3).toBeVisible();
  });

  test('accordion button component aria-expanded should be false by default', () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    expect(step1).toHaveAttribute('aria-expanded', 'false');
  });

  test('accordion first button should be focused when home key pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);

    await user.click(step3);
    await user.type(step3, '{home}');

    expect(document.activeElement === step1).toBeTruthy();
  });

  test('accordion last button should be focused when end key pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);

    await user.click(step1);
    await user.type(step1, '{end}');

    expect(document.activeElement === step3).toBeTruthy();
  });

  test('accordion button component aria-expanded should be true when expanded', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    await user.click(step1);
    expect(step1).toHaveAttribute('aria-expanded', 'true');
  });

  test('accordion should be operatable when controlled', async () => {
    const user = userEvent.setup();
    render(<ComponentWithState />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    await user.click(step1);

    expect(content1).toBeVisible();
  });

  test('accordion onChange should be called when controlled', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();

    render(<ComponentWithState onChange={onChangeMock} />);

    const step1 = screen.getByText(/step1/i);
    await user.click(step1);
    expect(onChangeMock).toHaveBeenCalledTimes(1);

    onChangeMock.mockClear();
  });

  test('accordion buttons should respect to arrow keys', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    await user.click(step1);

    await user.type(step1, '{arrowup}');
    await waitFor(() => {
      const step3 = screen.getByText(/step3/i);
      expect(document.activeElement === step3).toBeTruthy();
    });

    const step3 = screen.getByText(/step3/i);
    await user.keyboard(' ');

    const content3 = screen.getByText(/step three content/i);
    await waitFor(() => {
      expect(content3).toBeVisible();
    });

    await user.type(step3, '{arrowdown}');
    await waitFor(() => {
      expect(document.activeElement === step1).toBeTruthy();
    });

    await user.keyboard(' ');

    const content1 = screen.getByText(/step one content/i);
    await waitFor(() => {
      expect(content1).toBeVisible();
    });
  });

  test('accordion buttons should not respect to arrow keys when disableOptionalArrowKeys is set to true', async () => {
    const user = userEvent.setup();
    render(<Component disableOptionalArrowKeys />);

    const step1 = screen.getByText(/step1/i);
    await user.click(step1);

    await user.type(step1, '{arrowup}');
    await user.keyboard('{space}');

    const content3 = screen.getByText(/step three content/i);
    expect(content3).not.toBeVisible();
  });

  test('accordion should pass a11y', async () => {
    const { container } = render(<Component />);

    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const Component = (props) => {
  return (
    <Accordion {...props}>
      <AccordionHeader>
        <AccordionButton>step1</AccordionButton>
      </AccordionHeader>
      <AccordionContent>step one content</AccordionContent>
      <AccordionHeader>
        <AccordionButton disabled>step2</AccordionButton>
      </AccordionHeader>
      <AccordionContent>step two content</AccordionContent>
      <AccordionHeader>
        <AccordionButton>step3</AccordionButton>
      </AccordionHeader>
      <AccordionContent>step three content</AccordionContent>
    </Accordion>
  );
};

const ComponentWithState = (props) => {
  const [indexes, setIndexes] = useState<number[]>([]);

  const onChangeHandler = (index: number) => {
    setIndexes((prev) => {
      if (prev.includes(index)) {
        return prev.filter((each) => each !== index);
      } else {
        return [...prev, index];
      }
    });
  };

  return <Component indexes={indexes} onChange={onChangeHandler} {...props} />;
};

const ComponentWithMoreHeaderChild = (props) => {
  return (
    <Accordion {...props}>
      <AccordionHeader>
        <AccordionButton>step1</AccordionButton>
        <p>wrong!</p>
      </AccordionHeader>
      <AccordionContent>step one content</AccordionContent>
    </Accordion>
  );
};
