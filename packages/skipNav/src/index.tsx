/**
 * @cs/component-skip-nav
 *
 * SkipNav Component
 *
 * visually hides its content from ui without removing it from dom
 * assistive technologies can still attract with the element but it will not take any space at the dom
 */

import React, { forwardRef } from 'react';
import '../styles.css';
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
