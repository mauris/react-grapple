import { useRef, useCallback } from 'react';

export default function useDebounce({ wait = 200, leading = false }) {
  const timer = useRef(null);
  
  return useCallback((func) => {
    const callNow = leading && !timer.current;
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => {
      timer.current = null;
      if (!leading) {
        func();
      }
    }, wait);
    
    if (callNow) {
      func();
    }
  }, [wait]);
}