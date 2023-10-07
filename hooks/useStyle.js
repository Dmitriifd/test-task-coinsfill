import { useEffect, useState } from 'react';

export function useStyle(prop) {
  const isBrowser = typeof window !== 'undefined';

  const [value, setValue] = useState(
    isBrowser && getComputedStyle(document.body).getPropertyValue(prop)
  );

  useEffect(() => {
    document.body.style.setProperty(prop, value);
  }, [value]);

  return [value, setValue];
}
