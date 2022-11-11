/**
 * @ciceksepeti/cui-visually-hidden
 *
 * VisuallyHidden Component
 *
 * visually hides its content from ui without removing it from dom
 * assistive technologies can still attract with the element but it will not take any space at the dom
 */

import React, { forwardRef } from 'react';
import { PolymorphicComponentProps } from '@ciceksepeti/cui-utils';

/**
 * visually hidden component
 * visually hides its content from ui
 */
export const VisuallyHidden = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IVisuallyHiddenProps>,
    forwardedRef
  ) => {
    const { as, style, children, disabled, ...rest } = props;

    const Component = as || 'div';

    const _style = disabled
      ? style
      : {
          border: 0,
          padding: 0,
          width: '1px',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          visibility: 'hidden',
          position: 'absolute',
          clip: 'rect(0 0 0 0)',
          transform: 'translate(-100%, -100%)',

          // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
          wordWrap: 'normal',
          whiteSpace: 'nowrap',
          ...style
        };

    return (
      <Component
        {...rest}
        style={_style}
        ref={forwardedRef}
        data-cui-visually-hidden
      >
        {children}
      </Component>
    );
  }
);

export default VisuallyHidden;

/** Types and Interfaces */

export interface IVisuallyHiddenProps {
  disabled?: boolean;
  children: React.ReactNode;
}

/** Display Names */

VisuallyHidden.displayName = 'VisuallyHidden';
