import { useState, useMemo } from 'react';
import useDelay from './useDelay';

export default function useOnHover(lingerInteval = 0) {
  const [isHovering, setHovering] = useState(false);
  const lingerStopDelay = useDelay(() => {
    if (isHovering) {
      setHovering(false);
    }
  }, lingerInteval);
  
  const onHoverEvents = useMemo(() => ({
    onMouseEnter: () => {
      setHovering(true);
      if (lingerInteval > 0) {
        lingerStopDelay.invoke();
      }
    },
    onMouseMove: () => {
      if (!isHovering) {
        setHovering(true);
      }
      if (lingerInteval > 0) {
        lingerStopDelay.invoke();
      }
    },
    onMouseLeave: () => {
      setHovering(false);
    }
  }), [setHovering, isHovering, lingerStopDelay, lingerInteval]);
  
  return {
    isHovering,
    onHoverEvents
  }
}