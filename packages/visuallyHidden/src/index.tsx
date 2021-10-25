/**
 * @cs/component-visually-hidden
 *
 * VisuallyHidden Component
 *
 * visually hides its content from ui without removing it from dom
 * assistive technologies can still attract with the element but it will not take any space at the dom
 */

import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponentProps } from '@cs/component-utils';

/**
 * visually hidden component
 * visually hides its content from ui
 */
export const VisuallyHidden = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IVisuallyHiddenProps>,
    forwardedRef
  ) => {
    const { as, style, children, ...rest } = props;

    const Component = as || 'div';

    return (
      <Component
        {...rest}
        ref={forwardedRef}
        data-cs-visually-hidden
        style={{
          border: 0,
          padding: 0,
          width: '1px',
          height: '1px',
          margin: '-1px',
          overflow: 'hidden',
          visibility: 'hidden',
          position: 'absolute',
          clip: 'rect(0 0 0 0)',

          // https://medium.com/@jessebeach/beware-smushed-off-screen-accessible-text-5952a4c2cbfe
          wordWrap: 'normal',
          whiteSpace: 'nowrap',
          ...style
        }}
      >
        {children}
      </Component>
    );
  }
);

export default VisuallyHidden;

/** Types and Interfaces */

interface IVisuallyHiddenProps {
  children: React.ReactNode;
}

/** Prop Types */

if (process.env.NODE_ENV === 'development') {
  VisuallyHidden.displayName = 'VisuallyHidden';
  VisuallyHidden.propTypes = {
    children: PropTypes.node
  };
}

/** Display Names */

VisuallyHidden.displayName = 'VisuallyHidden';
