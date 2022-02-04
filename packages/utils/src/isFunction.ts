/**
 * @see https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
 *  */
export const isFunction = (variable): variable is () => any => {
  return !!(variable && {}.toString.call(variable) == '[object Function]');
};
