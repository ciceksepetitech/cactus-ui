import {
  Tab,
  TabList,
  TabPanel,
  TabPanelList,
  Tabs,
} from '@ciceksepeti/cui-tabs';
import React from 'react';

import { TabProps } from './CUITabsDefault';

function CUITabsRenderProps({
  orientation = 'horizontal',
  activationType = 'auto',
}: TabProps) {
  return (
    <Tabs
      orientation={orientation}
      activationType={activationType}
      defaultIndex={0}
    >
      {({ selectedTabIndex, focusedTabIndex }) => {
        return (
          <>
            <TabList>
              <Tab>Tab1</Tab>
              <Tab disabled>
                {orientation === 'horizontal'
                  ? focusedTabIndex === 0
                    ? 'focus on left'
                    : 'focus on right'
                  : orientation === 'vertical' && focusedTabIndex === 0
                  ? 'focus on up'
                  : 'focus on down'}
              </Tab>
              <Tab>{selectedTabIndex === 2 ? 'selected' : 'not selected'}</Tab>
            </TabList>
            <TabPanelList>
              <TabPanel>Panel1</TabPanel>
              <TabPanel>Panel2</TabPanel>
              <TabPanel>Panel3</TabPanel>
            </TabPanelList>
          </>
        );
      }}
    </Tabs>
  );
}

export default CUITabsRenderProps;
