import { useRef, useCallback } from 'react';

export default function useThrottle({ wait = 200, leading = false }) {
  const timer = useRef(null);
  
  return useCallback((func) => {
    const callNow = leading && !timer.current;
    if (!timer.current) {
      timer.current = setTimeout(() => {
        if (!leading) {
          func();
        }
        timer.current = null;
      }, wait);
    }  
    if (callNow) {
      func();
    }
  }, [wait]);
}