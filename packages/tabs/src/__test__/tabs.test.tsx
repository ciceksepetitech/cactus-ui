import React from 'react';
import { axe } from 'jest-axe';
import { Tabs, TabList, Tab, TabPanelList, TabPanel } from '..';
import { render, screen, cleanup } from '../../../../utils/test-setup';

describe('tabs component tests', () => {
  afterEach(() => {
    cleanup();
  });

  test('tabs should pass a11y', async () => {
    const { container } = render(<Tabs></Tabs>);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
