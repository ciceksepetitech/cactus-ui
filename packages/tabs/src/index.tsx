/**
 * @ciceksepeti/cui-tabs
 *
 * Tabs Component
 *
 * The Tabs component consists of clickable tabs, that are aligned side by side.
 * Tabs make it easy to explore and switch between different views. Tabs organize
 * and allow navigation between groups of content that are related and at the
 * same level of hierarchy.
 */

import React, { forwardRef } from 'react';
import { PolymorphicComponentProps } from '@ciceksepeti/cui-utils';

/**
 * tabs component
 */
export const Tabs = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, ITabsProps>,
    forwardedRef
  ) => {
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    return <Component {...rest} data-cui-tabs ref={forwardedRef}></Component>;
  }
);

export default Tabs;

/** Types and Interfaces */

interface ITabsProps {
  children: React.ReactNode;
}

/** Display Names */

Tabs.displayName = 'Tabs';
