import React, { forwardRef, useMemo, useRef } from 'react';
import { PolymorphicComponentProps } from '@cs/component-utils';

const Dialog = forwardRef(
  <C extends React.ElementType = 'div'>(
    props: PolymorphicComponentProps<C, {}>,
    forwardedRef: React.RefObject<C>
  ) => {
    const { as: Component = 'div', children } = props;

    const internalRef = useRef(null);
    const ref = forwardedRef || internalRef;

    const component = useMemo(
      () => (
        <Component ref={ref} data-cs-alert>
          {children}
        </Component>
      ),
      [children, Component]
    );

    return component;
  }
);

Dialog.displayName = 'Dialog';
