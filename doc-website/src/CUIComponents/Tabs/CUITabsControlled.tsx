import {
  Tab,
  TabList,
  TabPanel,
  TabPanelList,
  Tabs,
} from '@ciceksepeti/cui-tabs';
import React, { useState } from 'react';

import { TabProps } from './CUITabsDefault';

function CUITabsControlled({
  orientation = 'horizontal',
  activationType = 'auto',
}: TabProps) {
  const [key, setKey] = useState<number>(0);
  return (
    <Tabs
      orientation={orientation}
      activationType={activationType}
      index={key}
      onChange={(k) => setKey(k)}
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
export default CUITabsControlled;
