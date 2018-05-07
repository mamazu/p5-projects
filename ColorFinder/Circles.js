class Area {
	constructor(position, pointColor) {
		this.center = position;
		this.pointColor = color(random(255), random(255), random(255));
	}

	draw() {
		fill(invertColor(this.pointColor));
		ellipse(this.center.x, this.center.y, 5);
	}
}

class AreaList {
	constructor(numberOfAreas) {
		this.points = [];
		this.generatePoints(numberOfAreas);
	}

	clear() {
		this.points = [];
	}

	addCircle(circle) {
		this.points.push(circle);
	}

	getDistSquared(vec, point) {
		return pow(vec.x - point.center.x, 2) + pow(vec.y - point.center.y, 2);
	}

	generatePoints(numberOfPoints) {

	}

	getColor(x, y) {
		let color = undefined;
		let distance = Infinity;
		let pos = createVector(x, y);
		this.points.forEach((area) => {
			let d = this.getDistSquared(pos, area);
			if (d < distance) {
				distance = d;
				color = area.pointColor;
			}
		});
		return color;
	}

	draw() {
		for (let x = 0; x < width; x++) {
			for (let y = 0; y < height; y++) {
				let color = this.getColor(x, y);
				if (color !== undefined)
					set(x, y, color)
			}
		}
		updatePixels();
		this.points.forEach((c) => c.draw());
	}
}