/**
 *
 * utils component to wrap components conditionally
 * returns a component according to condition
 * wraps children if condition is true
 *
 */
export const ConditionalWrapper = (props: IConditionalWrapper) => {
  const { children, condition, wrapper } = props;
  return condition ? wrapper(children) : children;
};

export default ConditionalWrapper;

/** Types and Interfaces */

interface IConditionalWrapper {
  condition: boolean;
  children: React.ReactElement;
  wrapper: (children: React.ReactElement) => JSX.Element;
}

/** Display Names */

ConditionalWrapper.displayName = 'ConditionalWrapper';
