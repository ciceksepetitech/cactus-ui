import React from 'react';
import { axe } from 'jest-axe';
import { RadioGroup, Radio } from '..';
import userEvent from '@testing-library/user-event';
import { render, screen, cleanup, waitFor } from '../../../../utils/test-setup';

let consoleWarn;

describe('radio group component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  beforeEach(() => {
    consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
  });

  test('radio group component should warn when aria-label and aria-labelledby provided at the same time', () => {
    render(<Component aria-label="fruits" aria-labelledby="fruits" />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('radio component should warn when aria attributes are not provided', () => {
    render(<Component />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('radio component should warn when aria-label and aria-labelledby attributes are passed at the same time', () => {
    render(<Component />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('radio group component value should not change when disabled radio is clicked', () => {
    render(<Component />);

    const orange = screen.getByText('orange');
    userEvent.click(orange);

    const radios = document.getElementsByName('fruits');
    const checkedRadio = Array.from(radios).find((radio: any) => radio.checked);

    expect(checkedRadio).toBeUndefined();
  });

  test('radio group component aria-orientation should be horizontal by default', () => {
    render(<Component />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-orientation', 'horizontal');
  });

  test('radio group component aria-orientation should respect to orientation prop', () => {
    render(<Component orientation="vertical" />);

    const radioGroup = screen.getByRole('radiogroup');
    expect(radioGroup).toHaveAttribute('aria-orientation', 'vertical');
  });

  test('radio group component value should change when undisabled radio is clicked', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const banana = screen.getByText('banana');
    await user.click(banana);

    const radios = document.getElementsByName('fruits');
    await waitFor(() => {
      const checkedRadio = Array.from(radios).find(
        (radio: any) => radio.checked
      );
      expect(checkedRadio).not.toBeUndefined();
      expect((checkedRadio as any).value).toBe('banana');
    });
  });

  test('radio group component value should change when with arrow keys', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const radios = document.getElementsByName('fruits');

    const banana = screen.getByText('banana');
    await user.click(banana);

    await waitFor(() => {
      let checkedRadio: any = getCheckedUncontrolledRadio(radios);
      expect(checkedRadio.value).toBe('banana');
    });

    const types = '{arrowleft}{arrowright}{arrowdown}{arrowup}{arrowleft}';
    await user.type(banana, types);
    await waitFor(() => {
      const checkedRadio: any = getCheckedUncontrolledRadio(radios);
      expect(checkedRadio.value).toBe('cherry');
    });
  });

  test('radio group component onchange should be called when provided with index prop', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    render(<Component value="cherry" onChange={onChangeMock} />);

    const banana = screen.getByText('banana');
    await user.click(banana);

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalledTimes(1);
    });
    onChangeMock.mockClear();
  });

  test('radio group component defaultValue should be set initially', () => {
    render(<Component defaultValue="cherry" />);

    const radios = document.getElementsByName('fruits');
    const checkedRadio: any = getCheckedUncontrolledRadio(radios);
    expect(checkedRadio.value).toBe('cherry');
  });

  test('radio group should respect to space and enter', async () => {
    const user = userEvent.setup();
    const onChangeMock = jest.fn();
    render(<Component value="cherry" onChange={onChangeMock} />);

    const banana = screen.getByText('banana');
    await user.type(banana, '{arrowleft}{space}{enter}');

    await waitFor(() => {
      expect(onChangeMock).toHaveBeenCalled();
    });

    onChangeMock.mockClear();
  });

  test('radio group component selected radio should be focused when tabbed from outside', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component defaultValue="cherry" />);

    const button1 = screen.getByText('button1');
    await user.click(button1);

    await user.tab();

    await waitFor(() => {
      expect(
        container.querySelector('[data-cui-radio-keyboard-focus="true"]')
      ).toBeTruthy();
    });
  });

  test('radio group component selected radio should loose focus when tabbed', async () => {
    const { container } = render(<Component defaultValue="cherry" />);

    const button1 = screen.getByText('button1');
    userEvent.click(button1);

    userEvent.tab();
    userEvent.tab();

    expect(
      container.querySelector('[data-cui-radio-keyboard-focus="true"]')
    ).toBeFalsy();
  });

  test('radio group component value should not be set when nothing is selected before and on first focus', async () => {
    render(<Component />);

    const button1 = screen.getByText('button1');
    userEvent.click(button1);

    userEvent.tab();

    const radios = document.getElementsByName('fruits');
    const checkedRadio: any = getCheckedUncontrolledRadio(radios);
    expect(checkedRadio).toBe(undefined);
  });

  test('radio group component value should be set when nothing is selected before and on first focus after arrow key type', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button1 = screen.getByText('button1');
    await user.click(button1);

    await user.tab();

    const radios = document.getElementsByName('fruits');
    let checkedRadio: any = getCheckedUncontrolledRadio(radios);
    expect(checkedRadio).toBe(undefined);

    await user.keyboard('{arrowright}');

    await waitFor(() => {
      checkedRadio = getCheckedUncontrolledRadio(radios);
      expect(checkedRadio.value).toBe('banana');
    });
  });

  test('value and defaultValue should not be provided at the same time', async () => {
    render(<Component value="banana" defaultValue="banana" />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('radio group should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const getCheckedUncontrolledRadio = (radios) => {
  return Array.from(radios).find((radio: any) => radio.checked);
};

const Component = (props) => {
  return (
    <div>
      <button>button1</button>
      <RadioGroup name="fruits" {...props}>
        <label id="apple-label" htmlFor="apple">
          <Radio disabled id="apple" value="apple" />
          apple
        </label>
        <label id="cherry-label" htmlFor="cherry">
          <Radio id="cherry" value="cherry" />
          cherry
        </label>
        <label id="orange-label" htmlFor="orange">
          <Radio disabled id="orange" value="orange" />
          orange
        </label>
        <label id="banana-label" htmlFor="banana">
          <Radio
            id="banana"
            value="banana"
            aria-label="banana-label"
            aria-labelledby="banana-label"
          />
          banana
        </label>
      </RadioGroup>
      <button>button2</button>
    </div>
  );
};
