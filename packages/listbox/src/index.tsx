/**
 * @cs/component-listbox
 *
 * Listbox Component
 *
 */

import React, { forwardRef } from 'react';
import { PolymorphicComponentProps } from '@cs/component-utils';

/**
 * listbox component
 */
export const Listbox = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IListboxProps>,
    forwardedRef
  ) => {
    const { as, children, ...rest } = props;

    const Component = as || 'div';

    return <Component {...rest} ref={forwardedRef} data-cs-listbox></Component>;
  }
);

export default Listbox;

/** Types and Interfaces */

interface IListboxProps {
  children: React.ReactNode;
}

/** Display Names */

Listbox.displayName = 'Listbox';
