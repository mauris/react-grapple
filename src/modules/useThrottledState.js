import { useState, useRef, useCallback } from 'react';
import useThrottle from './useThrottle';

export default function useThrottledState(initialState, throttleOptions = {}) {
  const [state, setState] = useState(initialState);
  const executeThrottled = useThrottle(throttleOptions);
  
  const setThrottledState = useCallback((newState) => {
    executeThrottled(() => {
      setState(newState)
    });
  }, [executeThrottled]);
  
  return [state, setThrottledState];
}