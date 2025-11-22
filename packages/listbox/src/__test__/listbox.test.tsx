import React from 'react';
import { axe } from 'jest-axe';
import Listbox, { ListboxItem } from '..';
import userEvent from '@testing-library/user-event';
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor
} from '../../../../utils/test-setup';

let consoleWarn;

describe('listbox component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  beforeEach(() => {
    consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
  });

  test('listbox component should warn when aria attributes are not provided', () => {
    render(<Component />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('listbox component should warn when aria-label and aria-labelledby attributes are passed at the same time', () => {
    render(<Component aria-label="item list" aria-labelledby="itemlist" />);
    expect(consoleWarn).toHaveBeenCalled();
  });

  test('listbox component role should be rendered', () => {
    render(<Component />);
    screen.getByRole('listbox', { hidden: true });
  });

  test('listbox component should have aria-expanded=true when expanded', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-expanded', 'false');

    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');
  });

  test('listbox component button should have aria-haspopup=listbox', () => {
    render(<Component />);

    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-haspopup', 'listbox');
  });

  test('listbox component input value should be first option by default', () => {
    const { container } = render(<Component />);

    const input = container.querySelector('[data-cui-listbox-input]');
    expect(input).toHaveValue('item1');
  });

  test('listbox component input value should not change when disabled option is chosen', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const listbox = screen.getByRole('listbox');
    await user.type(listbox, '{arrowdown}{enter}');

    const input = container.querySelector('[data-cui-listbox-input]');
    expect(input).toHaveValue('item1');
  });

  test('listbox component input value should change when another option is chosen', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    expect(button).toHaveAttribute('aria-expanded', 'true');

    const listbox = screen.getByRole('listbox');
    await user.type(listbox, '{arrowdown}{arrowdown}{enter}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('listbox component should not be expanded when listbox is disabled', async () => {
    const user = userEvent.setup();
    render(<Component disabled />);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('listbox component should be closed after selection', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const listbox = screen.getByRole('listbox');
    await user.type(listbox, '{arrowdown}{arrowdown}{enter}');

    const input = container.querySelector('[data-cui-listbox-input]');
    expect(input).toHaveValue('item3');
  });

  test('listbox component should be closed after esc pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);
    await user.type(button, '{escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('listbox component should be closed after enter pressed for button', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);
    await user.type(button, 'Enter');

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('listbox component should be closed after esc pressed for listbox', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const listbox = screen.getByRole('listbox');
    await user.type(listbox, '{escape}');

    expect(button).toHaveAttribute('aria-expanded', 'false');
  });

  test('listbox component value should be set to passed value initially', () => {
    const { container } = render(<Component value="item3" />);

    const input = container.querySelector('[data-cui-listbox-input]');
    expect(input).toHaveValue('item3');
  });

  test('listbox component value should be set to passed defaultValue initially', () => {
    const { container } = render(<Component defaultValue="item3" />);

    const input = container.querySelector('[data-cui-listbox-input]');
    expect(input).toHaveValue('item3');
  });

  test('listbox component option should be selected with mouse click', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const option3 = screen.getByText(/item 3/i);
    await user.click(option3);

    const input = container.querySelector('[data-cui-listbox-input]');
    expect(input).toHaveValue('item3');
  });

  test('listbox component option mouse enter should set aria-selected to true', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const option3 = screen.getByText(/item 3/i);
    fireEvent.mouseOver(option3);

    expect(option3).toHaveAttribute('aria-selected', 'true');
  });

  test('listbox component should respect to arrow up', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const listbox = screen.getByRole('listbox');
    await user.type(listbox, '{arrowup}{arrowup}');

    const option3 = screen.getByText(/item 3/i);
    expect(option3).toHaveAttribute('aria-selected', 'true');
  });

  test('listbox component option mouse leave should set aria-selected to false', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const option3 = screen.getByText(/item 3/i);

    fireEvent.mouseOver(option3);
    fireEvent.mouseLeave(option3);

    expect(option3).toHaveAttribute('aria-selected', 'false');
  });

  test('listbox component option touch start should set aria-selected to true', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const option3 = screen.getByText(/item 3/i);
    fireEvent.touchStart(option3);

    expect(option3).toHaveAttribute('aria-selected', 'true');
  });

  test('listbox component should be closed after selection with space key', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component />);

    const button = screen.getByRole('button');
    await user.click(button);

    const listbox = screen.getByRole('listbox');
    await user.type(listbox, '{arrowdown}{arrowdown}');
    await user.type(listbox, ' ');

    await waitFor(() => {
      const input = container.querySelector('[data-cui-listbox-input]');
      expect(input).toHaveValue('item3');
    });
  });

  test('listbox component popover should be invisible when not expanded', async () => {
    const user = userEvent.setup();
    const { container } = render(<Component portal={false} />);

    expect(
      container.querySelector('[data-cui-listbox-popover]')
    ).not.toBeVisible();

    const button = screen.getByRole('button');
    await user.click(button);

    expect(container.querySelector('[data-cui-listbox-popover]')).toBeVisible();
  });

  test('listbox component should not warn when aria attributes are provided', () => {
    render(<Component aria-label="item list" />);
    expect(consoleWarn).not.toHaveBeenCalled();
  });

  test('listbox should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});

const Component = (props) => {
  return (
    <Listbox {...props}>
      <ListboxItem value="item1">item 1</ListboxItem>
      <ListboxItem disabled value="item2">
        <span>
          <b>item 2</b>
        </span>
      </ListboxItem>
      <ListboxItem value="item3">item 3</ListboxItem>
      <ListboxItem value="item4">
        <span>item 4</span>
      </ListboxItem>
    </Listbox>
  );
};
