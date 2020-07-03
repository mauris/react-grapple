import { useRef, useState } from 'react';

import { DEFAULT_INTERVAL } from '../utils/constants';
import { isPromiseLike } from '../utils/promises';
import useDelay from './useDelay';
import useRefQueue from './useRefQueue';

export default function useQueuedDelay(
	fn, interval=DEFAULT_INTERVAL,
	minBatchSize=DEFAULT_MIN_BATCH_SIZE, maxBatchSize=DEFAULT_MAX_BATCH_SIZE
) {
	const queue = useRefQueue();

	const triggerProcessing = () => {
		const fnResult = fn(queue.dequeue(maxBatchSize));
		if (isPromiseLike(fnResult)) {
			if (queue.length < minBatchSize) {
				return fnResult;
			}
			return fnResult.then(triggerProcessing);
		}
		if (queue.length < minBatchSize) {
			return Promise.resolve();
		}
		return triggerProcessing();
	};
	
	const delay = useDelay(triggerProcessing, interval);

	return {
		hasWaitingInvoke: delay.hasWaitingInvoke,
		invoke: (...args) => {
			queue.enqueue(args);
			if (queue.length >= minBatchSize) {
				return delay.invoke();
			}
			return Promise.resolve();
		},
		reset: delay.reset
	};
}