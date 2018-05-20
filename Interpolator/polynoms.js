class Matrix {
	constructor(rank) {
		this.rank = rank;
		this.data = [];
	}

	fillValues(vectorList) {
		if (vectorList.length !== this.rank) {
			throw new Error('Invalid list length');
		}

		for (let i = 0; i < this.rank; i++) {
			let point = vectorList[i];

			let row = Array(this.rank).fill(0);
			row = row.map((_, index) => {
				let exponent = this.rank - (index + 1);
				return Math.pow(point.x, exponent);
			});
			row.push(point.y);
			this.data.push(row);
		}
	}

	makeStairs() {
		this.pivot();
		for (let start = 0; start < this.data.length; start++) {
			for (let i = start + 1; i < this.data.length; i++) {
				this.data[i] = subtractArray(this.getRow(start), this.getRow(i));
			}
			this.pivot();
		}
	}

	getRow(index, factor = 1) {
		const row = this.data[index];
		if (row === undefined) {
			return row;
		}

		return row.map((value) => value * factor);
	}

	pivot() {
		function findFirstNumber(array) {
			for (let i = 0; i < array.length; i++) {
				if (array[i] !== 0)
					return array[i];
			}
			return undefined;
		}

		this.data = this.data.map((row, index) => {
			const factor = findFirstNumber(row);
			console.log(this.data[index][0]);
			if (factor === undefined) {
				return row;
			}
			return this.getRow(index, 1 / factor);
		})
	}

	print() {
		console.log('Matrix rank ' + this.rank);
		console.log(this.data);
	}
}

function findPolynom(vectorList) {
	if (vectorList.length === 0) {
		return [];
	}
	const matrix = new Matrix(vectorList.length);
	matrix.fillValues(vectorList);
	matrix.makeStairs();
	matrix.print();
}

/** Helper Functions */
function subtractArray(a1, a2) {
	if (a1.length !== a2.length) {
		throw Error('Arrays have to have the same length');
	}

	return a1.map((value, index) => {
		return value - a2[index];
	});
}