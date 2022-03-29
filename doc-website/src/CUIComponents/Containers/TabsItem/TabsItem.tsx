import {
    Tab,
    TabList,
    TabPanelList,
    Tabs,
} from '@ciceksepeti/cui-tabs';
import { TabPanel } from '@ciceksepeti/cui-tabs';
import React from 'react';

const TabsItem = ({ title, children }: TabItemProps) => {
    return (
        <Tabs
            defaultIndex={0}
            className='tabs--wrapper'
        >
            <TabList className='tablist'>
                {title?.map((text, index) => {
                    return <Tab key={index}>{text}</Tab>
                })}
            </TabList>
            <TabPanelList>
                {children}
            </TabPanelList>
        </Tabs>
    )
}

interface TabItemProps {
    title: string[];
    children: JSX.Element | JSX.Element[];
}

export { TabsItem, TabPanel }