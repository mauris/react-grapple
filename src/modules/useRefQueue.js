import { useState } from 'react';
import createQueueObject from '../utils/createQueueObject';

export default function useRefQueue(initialQueue = []) {
	const queueRef = useRef(initialQueue);
  
	return createQueueObject(queue.current, (newQueue) => queueRef.current = newQueue);
}