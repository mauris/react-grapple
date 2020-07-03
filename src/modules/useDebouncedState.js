import { useState, useRef, useCallback } from 'react';
import useDebounce from './useDebounce';

export default function useDebouncedState(initialState, debounceOptions = {}) {
  const [state, setState] = useState(initialState);
  const executeDebounced = useDebounce(debounceOptions);
  
  const setDebouncedState = useCallback((newState) => {
    executeDebounced(() => {
      setState(newState)
    });
  }, [executeDebounced]);
  
  return [state, setDebouncedState];
}