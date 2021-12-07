import { useState, useCallback, useEffect } from 'react';
import { useLatestValue } from '..';

/**
 * handles localstorage interactions
 * supports server-side rendering
 */
export function useLocalStorage(key: string, defaultValue: any) {
  const defaultValueRef = useLatestValue<any>(defaultValue);

  const initialize = useCallback(() => {
    try {
      const item = localStorage.getItem(key);
      if (item) return JSON.parse(item);
      localStorage.setItem(key, JSON.stringify(defaultValueRef.current));
    } finally {
      return defaultValueRef.current;
    }
  }, [key]);

  const [internalValue, setInternalValue] = useState(null);

  useEffect(() => {
    setValue(initialize);
  }, [initialize]);

  const setValue = useCallback(
    (value: any) => {
      try {
        setInternalValue(value);
        localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    },
    [key]
  );

  const remove = useCallback(() => {
    try {
      localStorage.removeItem(key);
      setInternalValue(null);
    } catch (error) {
      console.log(error);
    }
  }, [key]);

  return { value: internalValue, setValue, remove };
}
