import {
  Tab,
  TabList,
  TabPanel,
  TabPanelList,
  Tabs,
} from '@ciceksepeti/cui-tabs';
import React from 'react';

function CUITabsDefault({
  orientation = 'horizontal',
  activationType = 'auto',
}: TabProps) {
  return (
    <Tabs
      orientation={orientation}
      activationType={activationType}
      defaultIndex={0}
    >
      <TabList>
        <Tab>Tab1</Tab>
        <Tab disabled>Tab2</Tab>
        <Tab disabled>Tab3</Tab>
        <Tab>Tab4</Tab>
        <Tab>Tab5</Tab>
      </TabList>
      <TabPanelList>
        <TabPanel>Panel1</TabPanel>
        <TabPanel>Panel2</TabPanel>
        <TabPanel>Panel3</TabPanel>
        <TabPanel>Panel4</TabPanel>
        <TabPanel>Panel5</TabPanel>
      </TabPanelList>
    </Tabs>
  );
}

export default CUITabsDefault;

export interface TabProps {
  as: React.ElementType;
  defaultIndex: number;
  orientation: 'horizontal' | 'vertical';
  activationType: 'auto' | 'manual';
}
