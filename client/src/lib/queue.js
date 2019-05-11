// simple queue implementation that allows for max length
class Queue {
	data = null;
	len = Number.MAX_VALUE;

	constructor(max, items) {
		// if max, set max length of queue
		if (max) len = max;

		// if items, init queue with provided items, if not make empty
		data = items ? new Array(len, items) : new Array(len);
	}

	// add to the front, if max is reached, remove from back first
	add = (record) => {
		if (data.length + 1 > len) remove();
		data.unshift(record);
	};

	// removes from the back
	remove = () => data.pop();

	// initalizes a new queue with same data as original
	makeCopy = () => new Queue(len, data);
}

export default Queue;
