import { useLocalStorage } from '@ciceksepeti/cui-hooks';
import React, { useEffect } from 'react';

function LocalStorage() {
  const { value, setValue } = useLocalStorage('city', 'İstanbul');

  useEffect(() => {
    setValue('Antalya');
    // remove();
  }, [value]);

  return (
    <p>
      The value that returns from Local Storage is <b>{value}</b>
    </p>
  );
}

export default LocalStorage;
