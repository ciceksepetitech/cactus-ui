import React from 'react';
import { axe } from 'jest-axe';
import userEvent from '@testing-library/user-event';
import { Tabs, TabList, Tab, TabPanelList, TabPanel, TabsActivation } from '..';
import { render, screen, cleanup, waitFor } from '../../../../utils/test-setup';

let consoleWarn;

describe('tabs component tests', () => {
  afterEach(() => {
    jest.restoreAllMocks();
    cleanup();
  });

  beforeEach(() => {
    consoleWarn = jest.spyOn(global.console, 'warn').mockImplementation();
  });

  test('tabs should pass a11y', async () => {
    const { container } = render(<Component />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  test('tabs selection should change with arrows when activationType auto', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowright}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel4/i)).toBeVisible();
    expect(screen.getByText(/panel1/i)).not.toBeVisible();
  });

  test('tabs first undisabled tab should be selected', async () => {
    render(<Component />);
    expect(screen.getByText(/panel1/i)).toBeVisible();
  });

  test('tabs selection should be set to first tab when home key is pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab4);
    expect(screen.getByText(/panel4/i)).toBeVisible();

    await user.keyboard('{home}');

    expect(tab1).toHaveFocus();
    expect(screen.getByText(/panel1/i)).toBeVisible();
  });

  test('tabs selection should be set to last tab when end key is pressed', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    expect(screen.getByText(/panel1/i)).toBeVisible();

    await user.keyboard('{end}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel4/i)).toBeVisible();
  });

  test('tabs selection should change with arrows when activationType auto and orientation vertical', async () => {
    const user = userEvent.setup();
    render(<Component orientation="vertical" />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowdown}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel4/i)).toBeVisible();
    expect(screen.getByText(/panel1/i)).not.toBeVisible();
  });

  test('tabs selection should not change with arrows when activationType manual', async () => {
    const user = userEvent.setup();
    render(<Component activationType={TabsActivation.Manual} />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowleft}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel1/i)).toBeVisible();
    expect(screen.getByText(/panel4/i)).not.toBeVisible();
  });

  test('tabs selection should change with space key when activationType manual', async () => {
    const user = userEvent.setup();
    render(<Component activationType={TabsActivation.Manual} />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowright}');
    await user.type(tab4, ' ');

    expect(tab4).toHaveFocus();
    await waitFor(() => {
      expect(screen.getByText(/panel4/i)).toBeVisible();
    });
    expect(screen.getByText(/panel1/i)).not.toBeVisible();
  });

  test('tabs selection should change with enter key when activationType manual', async () => {
    const user = userEvent.setup();
    render(<Component activationType={TabsActivation.Manual} />);

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowright}');
    await user.keyboard('{enter}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel4/i)).toBeVisible();
    expect(screen.getByText(/panel1/i)).not.toBeVisible();
  });

  test('tabs selection should not change with arrows when activationType manual and orientation vertical', async () => {
    const user = userEvent.setup();
    render(
      <Component
        orientation="vertical"
        activationType={TabsActivation.Manual}
      />
    );

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowup}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel1/i)).toBeVisible();
    expect(screen.getByText(/panel4/i)).not.toBeVisible();
  });

  test('tabs selection should change with space key when activationType manual and orientation vertical', async () => {
    const user = userEvent.setup();
    render(
      <Component
        orientation="vertical"
        activationType={TabsActivation.Manual}
      />
    );

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowdown}');
    await user.type(tab4, ' ');

    expect(tab4).toHaveFocus();
    await waitFor(() => {
      expect(screen.getByText(/panel4/i)).toBeVisible();
    });
    expect(screen.getByText(/panel1/i)).not.toBeVisible();
  });

  test('tabs selection should change with enter key when activationType manual and orientation vertical', async () => {
    const user = userEvent.setup();
    render(
      <Component
        orientation="vertical"
        activationType={TabsActivation.Manual}
      />
    );

    const tab1 = screen.getByText(/tab1/i);
    const tab4 = screen.getByText(/tab4/i);

    await user.click(tab1);
    await user.keyboard('{arrowdown}');
    await user.keyboard('{enter}');

    expect(tab4).toHaveFocus();
    expect(screen.getByText(/panel4/i)).toBeVisible();
    expect(screen.getByText(/panel1/i)).not.toBeVisible();
  });

  test('tabs should have aria-selected="true" when selected', async () => {
    const user = userEvent.setup();
    render(<Component />);

    const tab4 = screen.getByText(/tab4/i);
    expect(tab4).toHaveAttribute('aria-selected', 'false');
    await user.click(tab4);
    expect(tab4).toHaveAttribute('aria-selected', 'true');
  });

  test('tabs onChange should be called when passed with index prop', async () => {
    const user = userEvent.setup();
    const mockFn = jest.fn();

    render(<Component index={0} onChange={mockFn} />);

    const tab4 = screen.getByText(/tab4/i);
    await user.click(tab4);
    expect(mockFn).toHaveBeenCalledTimes(1);

    jest.clearAllMocks();
  });
});

const Component = (props) => {
  return (
    <Tabs {...props}>
      <TabList>
        <Tab disabled>Tab0</Tab>
        <Tab>Tab1</Tab>
        <Tab disabled>Tab2</Tab>
        <Tab disabled>Tab3</Tab>
        <Tab>Tab4</Tab>
        <Tab disabled>Tab5</Tab>
      </TabList>
      <TabPanelList>
        <TabPanel>Panel0</TabPanel>
        <TabPanel>Panel1</TabPanel>
        <TabPanel>Panel2</TabPanel>
        <TabPanel>Panel3</TabPanel>
        <TabPanel>Panel4</TabPanel>
        <TabPanel>Panel5</TabPanel>
      </TabPanelList>
    </Tabs>
  );
};
