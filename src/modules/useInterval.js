import { useRef, useEffect } from 'react';

export default function useInterval(fn, interval) {
  const timer = useRef(null);
  
  useEffect(() => {
    timer.current = setInterval(fn, interval);
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);
}