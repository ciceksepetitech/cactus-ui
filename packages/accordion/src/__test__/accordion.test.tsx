import React, { useState } from 'react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup } from '../../../../utils/test-setup';
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
    expect(consoleWarn).toBeCalled();
  });

  test('accordion component should warn when indexes passed without onChange prop', () => {
    render(<Component indexes={[2]} />);
    expect(consoleWarn).toBeCalled();
  });

  test('accordion component should warn when onChange passed without indexes prop', () => {
    render(<Component onChange={console.log} />);
    expect(consoleWarn).toBeCalled();
  });

  test('accordion header component should warn when more than one child is passed', () => {
    render(<ComponentWithMoreHeaderChild />);
    expect(consoleWarn).toBeCalled();
  });

  test('accordion content should be visible when button is clicked', async () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);

    expect(content1).toBeVisible();
  });

  test('accordion content should be hidden when button is toggled', async () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);
    expect(content1).toBeVisible();

    userEvent.click(step1);
    expect(content1).not.toBeVisible();
  });

  test('accordion content visibility should change when space is pressed', async () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);
    userEvent.keyboard('{space}');

    expect(content1).not.toBeVisible();

    userEvent.keyboard('{space}');

    expect(content1).toBeVisible();
  });

  test('accordion content should not be visible when button is disabled', async () => {
    render(<Component />);

    const step2 = screen.getByText(/step2/i);
    const content2 = screen.getByText(/step two content/i);

    userEvent.click(step2);

    expect(content2).not.toBeVisible();
  });

  test('accordion contents should not be visible at the same time by default', async () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);

    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);
    expect(content1).toBeVisible();

    const content3 = screen.getByText(/step three content/i);

    userEvent.click(step3);
    expect(content3).toBeVisible();
    expect(content1).not.toBeVisible();
  });

  test('accordion contents can be visible at the same time when single prop is set to false', async () => {
    render(<Component single={false} />);

    const step1 = screen.getByText(/step1/i);
    const step3 = screen.getByText(/step3/i);

    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);
    expect(content1).toBeVisible();

    const content3 = screen.getByText(/step three content/i);

    userEvent.click(step3);
    expect(content3).toBeVisible();
    expect(content1).toBeVisible();
  });

  test('accordion content should be visible when collapsible is set to false', async () => {
    render(<Component collapsible={false} />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);
    expect(content1).toBeVisible();

    userEvent.click(step1);
    expect(content1).toBeVisible();
  });

  test('accordion button component aria-expanded should be false by default', () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    expect(step1).toHaveAttribute('aria-expanded', 'false');
  });

  test('accordion button component aria-expanded should be true when expanded', () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    userEvent.click(step1);
    expect(step1).toHaveAttribute('aria-expanded', 'true');
  });

  test('accordion should be operatable when controlled', async () => {
    render(<ComponentWithState />);

    const step1 = screen.getByText(/step1/i);
    const content1 = screen.getByText(/step one content/i);

    userEvent.click(step1);

    expect(content1).toBeVisible();
  });

  test('accordion onChange should be called when controlled', async () => {
    const onChangeMock = jest.fn();

    render(<ComponentWithState onChange={onChangeMock} />);

    const step1 = screen.getByText(/step1/i);
    userEvent.click(step1);
    expect(onChangeMock).toBeCalledTimes(1);

    onChangeMock.mockClear();
  });

  test('accordion buttons should respect to arrow keys', () => {
    render(<Component />);

    const step1 = screen.getByText(/step1/i);
    userEvent.click(step1);

    userEvent.type(step1, '{arrowup}');
    userEvent.keyboard('{space}');

    const content3 = screen.getByText(/step three content/i);
    expect(content3).toBeVisible();

    const step3 = screen.getByText(/step3/i);
    userEvent.type(step3, '{arrowdown}');
    userEvent.keyboard('{space}');

    const content1 = screen.getByText(/step one content/i);
    expect(content1).toBeVisible();
  });

  test('accordion buttons should not respect to arrow keys when disableOptionalArrowKeys is set to true', () => {
    render(<Component disableOptionalArrowKeys />);

    const step1 = screen.getByText(/step1/i);
    userEvent.click(step1);

    userEvent.type(step1, '{arrowup}');
    userEvent.keyboard('{space}');

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
  const [indexes, setIndexes] = useState([]);

  const onChangeHandler = (index) => {
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
