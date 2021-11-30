import { useState, useCallback } from 'react';

interface IUseArrayReturn<T> {
  clear: () => void;
  find: (value: T) => T;
  isEmpty: () => boolean;
  push: (value: T) => void;
  map: (value: T) => any[];
  filter: (value: T) => any[];
  includes: (value: T) => boolean;
  remove: (value: number) => void;
  findIndex: (value: T) => number;
}

/**
 * provides shortcut for array functionalities
 */
export function useArray<T>(initial: T[]): IUseArrayReturn<T> {
  const [value, setValue] = useState<T[]>(initial);

  const push = useCallback(
    (newValue: T) => setValue((prevValues) => [...prevValues, newValue]),
    []
  );

  const remove = useCallback(
    (index: number) =>
      setValue((prevValues) => prevValues.filter((_, i) => i !== index)),
    []
  );

  const clear = useCallback(() => setValue([]), []);

  const isEmpty = useCallback(() => value.length === 0, [value]);

  const map = useCallback((iterator) => value.map(iterator), [value]);

  const findIndex = useCallback(
    (iterator) => value.findIndex(iterator),
    [value]
  );

  const includes = useCallback((element) => value.includes(element), [value]);

  const find = useCallback((iterator) => value.find(iterator), [value]);

  const filter = useCallback((iterator) => value.map(iterator), [value]);

  return {
    map,
    push,
    find,
    clear,
    remove,
    filter,
    isEmpty,
    includes,
    findIndex
  };
}
