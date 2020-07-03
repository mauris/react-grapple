const RESIZE_EVENT = 'resize'

export default function useWindowSize({ throttle = null, debounce = null }) {
  const isClientSide = typeof window === 'object';
  
  const retrieveWindowSize = useCallback(
    () => (isClientSide ? {
      prevWidth: window.innerWidth,
      prevHeight: window.innerHeight,
      width: window.innerWidth,
      height: window.innerHeight
    }: undefined),
    []
  );
  
  const [windowSize, setWindowSize] = useState(retrieveWindowSize);
  const onWindowResizeHandler = () => {
    const newSize = retrieveWindowSize();
    setWindowSize({
      prevWidth: windowSize.width,
      prevHeight: windowSize.height,
      ...newSize
    });
  };
  
  useEffect(() => {
    if (!isClientSide) {
      return null;
    }
    
    window.addEventListener(RESIZE_EVENT, onWindowResizeHandler);
    return () => {
      window.removeEventListener('resize', onHandleResize);
    }
  }, []);
  
  return windowSize;
}