import React from 'react';
import IProps from './props';
import PropTypes from 'prop-types';
import { PolymorphicComponentProps } from '@cs/component-utils';

const VisuallyHidden = <C extends React.ElementType = 'div'>(
  props: PolymorphicComponentProps<C, IProps>
) => {
  const { as: Component = 'div', style, children, ...rest } = props;

  return (
    <Component
      {...rest}
      data-cs-visually-hidden
      style={{
        border: 0,
        padding: 0,
        width: '1px',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
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
};

if (process.env.NODE_ENV === 'development') {
  VisuallyHidden.displayName = 'VisuallyHidden';
  VisuallyHidden.propTypes = {
    children: PropTypes.node
  };
}

export default VisuallyHidden;
