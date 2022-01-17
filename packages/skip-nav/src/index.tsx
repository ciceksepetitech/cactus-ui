/**
 * @cs/component-skip-nav
 *
 * SkipNav Component
 *
 * enables skipping some area of the dom. usually used before large amount of navigation items
 */

import React, { forwardRef } from 'react';
import { PolymorphicComponentProps } from '@cs/component-utils';

/**
 * skip nav component
 * enables skipping navigation or any part of the dom
 */
export const SkipNav = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, ISkipNavProps>,
    forwardedRef
  ) => {
    const { as, children, targetId, ...rest } = props;

    const Component = as || 'a';

    return (
      <Component
        data-cs-skip-nav
        ref={forwardedRef}
        href={`#${targetId}`}
        {...rest}
      >
        {children}
      </Component>
    );
  }
);

export default SkipNav;

/** Types and Interfaces */

interface ISkipNavProps {
  targetId: string;
  children: React.ReactNode;
}

/** Display Names */

SkipNav.displayName = 'SkipNav';
