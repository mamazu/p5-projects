class CircleList {
	constructor() {
		this.circles = [];
	}

	addCircle(circle) {
		if (circle === undefined) {
			circle = new Circle()
		}
		if (this.circles[circle.level] === undefined) {
			this.circles[circle.level] = [];
		}

		this.circles[circle.level].push(circle);
		this.circles.forEach(level =>
			level.forEach(c => c.bgColor = color(255))
		);
	}

	update() {
		this.checkUpgrades();
		this.circles.forEach(circleList => circleList.forEach(c => c.update()));
	}

	getCircleAt(position) {
		for (let level of this.circles) {
			for (let circle of level) {
				if (circle.contains(position)) {
					return circle;
				}
			}
		}
	}

	getValue() {
		let value = 0;
		this.circles.forEach((circleList, index) => {
			value += round(pow(3, index) * circleList.length);
		});

		return value;
	}

	magnetize() {
		for (let circleLevel of this.circles) {
			if (circleLevel.length < 2) {
				continue;
			}

			circleLevel[0].setDestination(circleLevel[1].position);
		}
	}

	checkUpgrades() {
		for (let circleList of this.circles) {
			for (let i = 0; i < circleList.length; i++) {
				const left = circleList[i];
				for (let j = i + 1; j < circleList.length; j++) {
					const right = circleList[j];
					if (left.overlaps(right)) {
						left.upgrade();
						circleList.splice(j, 1);

						const firstCircle = circleList.splice(i, 1)[0];
						this.addCircle(firstCircle);
					}
					// comparisions++;
				}
			}
		}
	}

	length() {
		return this.circles.length;
	}

	draw() {
		textSize(25);
		this.circles.forEach(circleList => circleList.forEach(c => c.draw()));
	}
}

class Circle {
	constructor(position) {
		this.level = 0;
		this.radius = 20;
		this.bgColor = color(255);

		this.position = position ? position : getRandomPosition();
		this.movement = createVector();
		this.destination = undefined;
	}

	upgrade() {
		this.bgColor = color(255, 0, 0);
		this.level += 1;
		this.destination = null;
		this.movement = createVector();
	}

	overlaps(otherCircle) {
		const otherPosition = otherCircle.position;

		return pow(this.position.x - otherPosition.x, 2) + pow(this.position.y - otherPosition.y, 2) <= pow((this.radius + otherCircle.radius) * 0.8, 2)
	}

	contains(vector) {
		return pow(this.position.x - vector.x, 2) + pow(this.position.y - vector.y, 2) <= pow(this.radius, 2);
	}

	setDestination(destination) {
		this.destination = destination;
	}

	update() {
		if (!this.destination) {
			return
		}

		// Calculate the heading and the speed
		let heading = p5.Vector.sub(this.destination, this.position);
		let speed = max(heading.mag() / 10, 1);
		heading.setMag(speed);

		this.position.add(heading);
	}

	draw() {
		fill(this.bgColor);
		ellipse(this.position.x, this.position.y, this.radius);
		fill(0);
		text(this.level, this.position.x, this.position.y);
	}
}

/**
 * Generates a random vector in the canvas bounds
 */
function getRandomPosition() {
	const x = random(0, height);
	const y = random(0, width);

	return createVector(x, y);
}