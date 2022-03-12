import { useState, useCallback } from 'react';

export interface IUseArrayReturn<T> {
  value: T[];
  clear: () => void;
  isEmpty: () => boolean;
  push: (value: T) => void;
  set: (value: T[]) => void;
  includes: (value: T) => boolean;
  remove: (value: number) => void;
  map: (fn: (value: T) => any) => any;
  find: (fn: (value: T) => any) => any;
  filter: (fn: (value: T) => any) => any;
  findIndex: (fn: (value: T) => any) => any;
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

  const set = useCallback((newArr) => setValue(newArr), []);

  const includes = useCallback((element) => value.includes(element), [value]);

  const find = useCallback((iterator) => value.find(iterator), [value]);

  const filter = useCallback((iterator) => value.filter(iterator), [value]);

  return {
    set,
    map,
    push,
    find,
    clear,
    value,
    remove,
    filter,
    isEmpty,
    includes,
    findIndex
  };
}
