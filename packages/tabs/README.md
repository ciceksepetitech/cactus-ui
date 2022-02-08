# @ciceksepeti/cui-tabs

[![npm version](https://img.shields.io/npm/v/@ciceksepeti/cui-tabs.svg?style=flat)](https://www.npmjs.com/package/@ciceksepeti/cui-tabs) ![storybook](https://shields.io/badge/storybook-white?logo=storybook&style=flat) ![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg) [![license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/ciceksepetitech/cactus-ui/blob/HEAD/LICENSE)

The Tabs component consists of clickable tabs, that are aligned side by side. Tabs make it easy to explore and switch between different views. Tabs organize and allow navigation between groups of content that are related and at the same level of hierarchy.

## Installing
Using Npm:
```bash
$ npm install @ciceksepeti/cui-tabs
```
Using Yarn:
```bash
$ yarn add @ciceksepeti/cui-tabs
```

## Example

```jsx
import {
  Tab,
  Tabs,
  TabList,
  TabPanel,
  TabPanelList
} from '@ciceksepeti/cui-tabs';

function Demo() {
  return (
    <Tabs>
      <TabList>
        <Tab>Tab1</Tab>
        <Tab disabled>Tab2</Tab>
        <Tab disabled>Tab3</Tab>
        <Tab>Tab4</Tab>
        <Tab disabled>Tab5</Tab>
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
```
