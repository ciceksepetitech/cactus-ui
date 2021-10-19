import React, { useRef, forwardRef } from 'react';
import PropTypes from 'prop-types';
import { PolymorphicComponentProps } from '@cs/component-utils';

/**
 * VisuallyHidden component visually hides its children from UI. @ciceksepeti/visuallyHidden is developed to increase web accessibility. So, assistive technologies can still attract with the element but it will not take any space at the DOM. Rendered visuallyhidden component HTML tag can be decided by the developer so developers can decide correct semantic for their application. VisuallyHidden component can have styles and correct other attributes according to the rendered tag
 */
const VisuallyHidden = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, IVisuallyHiddenProps>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as, style, children, ...rest } = props;

    const Component = as || 'div';

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    return (
      <Component
        {...rest}
        ref={ref}
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

export default VisuallyHidden;

VisuallyHidden.displayName = 'VisuallyHidden';
