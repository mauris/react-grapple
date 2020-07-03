import { useRef } from 'react';

import { DEFAULT_INTERVAL } from '../utils/constants';
import { isPromiseLike } from '../utils/promises';

export default function useDelay(fn, interval=DEFAULT_INTERVAL) {
	const timer = useRef(null);
	const fnPromise = useRef([true, Promise.resolve()]);

	return {
		hasWaitingInvoke: timer.current !== null || !fnPromise.current[0],
		invoke: (...args) => {
			if (timer.current) {
				clearTimeout(timer.current);
			}
			
			return fnPromise.then(() => new Promise((resolve) => {
				timer.current = setTimeout(() => {
					timer.current = null;
					const fnResult = fn(...args);	
					if (isPromiseLike(fnResult)) {
						// promise-like result
						fnPromise.current = [
							false,
							fnResult.then(() => {
								fnPromise.current[0] = true;
								return Promise.resolve();
							})
						];
						fnResult.then(() => resolve());
						return;
					}
					resolve();
				});
			});
			});
		},
		reset: () => {
			if (timer.current) {
				clearTimeout(timer.current);
				timer.current = null;
			}
			fnPromise.current = [true, Promise.resolve()];
		}
	};
}