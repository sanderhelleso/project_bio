// simple queue implementation that allows for max length
class Queue {
	data = null;
	len = Number.MAX_VALUE;

	constructor(max, items) {
		// if max, set max length of queue
		if (max) this.len = max;

		// if items, init queue with provided items, if not make empty
		this.data = items ? new Array(this.len, items) : new Array(this.len);
	}

	// add to the front, if max is reached, remove from back first
	add(record) {
		if (this.data.length + 1 > this.len) this.remove();
		this.data.unshift(record);
	}

	// removes from the back
	remove() {
		this.data.pop();
	}

	// initalizes a new queue with same data as original
	makeCopy() {
		return new Queue(this.len, this.data);
	}
}

export default Queue;
