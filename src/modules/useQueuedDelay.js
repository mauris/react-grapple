import { useRef, useState } from 'react';

import { DEFAULT_INTERVAL } from '../utils/constants';
import useDelay from './useDelay';
import useRefQueue from './useRefQueue';

export default function useQueuedDelay(fn, interval=DEFAULT_INTERVAL) {
	const queue = useRefQueue();
	const delay = useDelay(() => {
		return fn(queue.dequeueAll());
	}, interval);

	return {
		hasWaitingInvoke: delay.hasWaitingInvoke,
		invoke: (...args) => {
			queue.enqueue(args);
			return delay.invoke();
		},
		reset: delay.reset
	};
}