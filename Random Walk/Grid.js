class Grid {
	constructor(width, height) {
		this.fields = {}

		this.height = height;
		this.width = width;
		this.lastField = undefined;
	}

	/**
	 * 
	 * @param {p5.Vector} point 
	 */
	update(point) {
		let positionString = `${point.x}|${point.y}`;
		if (this.fields[positionString] === undefined) {
			this.fields[positionString] = 0
		}
		this.fields[positionString]++;
		this.lastField = point;
	}

	contains(point) {
		if (point.x < 0 || point.x >= this.width) {
			return false;
		}
		if (point.y < 0 || point.t >= this.height) {
			return false;
		}

		return true;
	}

	getScale(){
		let fieldHeight = height / this.height;
		let fieldWidth = width / this.width;

		return [fieldHeight, fieldWidth];
	}

	getDistanceToCenter(point) {
		return dist(this.width / 2, this.height / 2, point.x, point.y);
	}

	_getHeat(timesVisted) {
		if (timesVisted > 10) {
			return [255, 0, 0];
		}
		let ratio = 2 * timesVisted / 10
		let b = int(max(0, 255 * (1 - ratio)))
		let r = int(max(0, 255 * (ratio - 1)))
		let g = 255 - b - r
		return [r, g, b]
	}

	draw() {
		noStroke();
		let fieldHeight, fieldWidth;
		[fieldHeight, fieldWidth] = this.getScale();

		for (let field in this.fields) {
			let x, y;
			let rectColor = this._getHeat(this.fields[field])

			fill(...rectColor);
			[x, y] = field.split('|');
			rect(fieldWidth * Number(x), fieldHeight * Number(y), fieldWidth, fieldHeight);
		}

		// drawing the current field
		fill(0, 255, 0);
		rect(fieldWidth * this.lastField.x, fieldHeight * this.lastField.y, fieldWidth, fieldHeight);
	}
}