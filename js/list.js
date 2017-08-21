/*
 * list.js
 *
 * defines a linked list
 */

class List {
	constructor(compare) {
		if (typeof(compare) == 'function') {
			this.compare = compare;
		}
		else if (typeof(compare) == 'string') {
			this.compare = this.key_compare(compare);
		}

		this.arr = [];
	}

	compare() { return true };

	key_compare(key) {
		return function(a, b) {
			return a[key] > b[key];
		};
	}

	insert(value) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.compare(value, this.arr[i])) {
				this.arr.splice(i, 0, value);
				return;
			}
		}
		
		// If we get this far, stick it on the end
		this.arr.splice(this.arr.length, 0, value);
	}

	remove(value, key = this.sort_key) {
		for (var i = 0; i < this.arr.length; i++) {
			if (this.arr[i][key] == value) {
				this.arr.splice(i, 1);
				return;
			}
		}
	}
}
