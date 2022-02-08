/**
 * @ciceksepeti/cui-radio-group
 *
 * RadioGroup Component
 *
 * Radio buttons allow the user to select one option from a set. Once a radio
 * group is established, selecting any radio button in that group automatically
 * deselects any currently-selected radio button in the same group.
 *
 */

import React, { forwardRef } from 'react';
import { PolymorphicComponentProps } from '@ciceksepeti/cui-utils';

/**
 * radio group component
 */
export const RadioGroup = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IRadioGroupProps>,
    forwardedRef
  ) => {
    const { as, children } = props;

    const Component = as || 'div';

    return (
      <Component ref={forwardedRef} data-cui-radio-group>
        {children}
      </Component>
    );
  }
);

export default RadioGroup;

/**
 * radio component
 */
export const Radio = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IRadioGroupProps>,
    forwardedRef
  ) => {
    const { as, children } = props;

    const Component = as || 'input';

    return (
      <Component type="radio" ref={forwardedRef} data-cui-radio>
        {children}
      </Component>
    );
  }
);

/** Types and Interfaces */

interface IRadioGroupProps {
  children: React.ReactNode;
}

/** Display Names */

RadioGroup.displayName = 'RadioGroup';
