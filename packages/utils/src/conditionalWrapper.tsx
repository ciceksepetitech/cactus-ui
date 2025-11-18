/**
 *
 * utils component to wrap components conditionally
 * returns a component according to condition
 * wraps children if condition is true
 *
 */

import React, { FC } from 'react';

export const ConditionalWrapper: FC<IConditionalWrapper> = (props) => {
  const { children, condition, wrapper } = props;
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;

/** Types and Interfaces */

export interface IConditionalWrapper {
  condition: boolean;
  children: React.ReactElement;
  wrapper: (children: React.ReactElement) => React.ReactElement;
}

/** Display Names */

ConditionalWrapper.displayName = 'ConditionalWrapper';
