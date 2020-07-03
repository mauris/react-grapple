export default function createQueueObject(queue, setter) {
  return {
    enqueue: (item) => {
      setter([...queue, item]);
    },
		enqueueAll: (...items) => {
			if (items.length === 1 && Array.isArray(items[0])) {
        // enqueueAll([item1, item2, ...])
				setter([...queue, ...items[0]]);
				return;
			}
      // enqueueAll(item1, item2, ...)
 			setter([...queue, ...items]);
		},
    dequeue: (n = 1) => {
      if (queue.length === 0 || n < 1 || n >= queue.length) {
        return null;
      }
			const dequeuedItems = queue.slice(0, n);
			const remainingQueue = queue.slice(n);
      setter(remainingQueue);
      return dequeuedItems;
    },
		dequeueAll: () => {
			setter([]);
			return queue;
		},
    length: queue.length,
    peek: () => {
      if (queue.length === 0) {
        return null;
      }
      return queue[0];
    },
		clear: () => {
			setter([]);
		}
	};
}