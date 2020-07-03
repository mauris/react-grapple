import { useState } from 'react';
import createQueueObject from '../utils/createQueueObject';

export default function useStateQueue(initialQueue = []) {
	const [queue, setQueue] = useState(initialQueue);
  
	return createQueueObject(queue, setQueue);
}