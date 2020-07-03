import { useState, useCallback } from 'react';

export default function useGate(initialState = false) {
  const [isActive, setActive] = useState(initialState);
  
  const isOpen = isActive;
  const setOpen = useCallback(() => setActive(true), []);
  const setClose = useCallback(() => setActive(false), []);
  const toggle = useCallback(() => setActive(!isActive), [isActive]);
  
  return Object.assign(
    [ isOpen, setOpen, setClose, toggle ],
    { isOpen, setOpen, setClose, toggle }
  );
}