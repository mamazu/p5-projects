class Circle {
	public level: number;
	public radius: number;
	public bgColor: p5.Color;
	public position: p5.Vector;
	public destination: p5.Vector | undefined;

	constructor(position?: p5.Vector) {
		this.level = 0;
		this.radius = 20;
		this.bgColor = sketchP.color(255);

		this.position = position ? position : getRandomPosition();
		this.destination = undefined;
	}

	upgrade(): void {
		this.bgColor = sketchP.color(255, 0, 0);
		this.level += 1;
		this.destination = undefined;
	}

	overlaps(otherCircle: Circle): boolean {
		const otherPosition = otherCircle.position;
		let pow = sketchP.pow;

		return pow(this.position.x - otherPosition.x, 2) + pow(this.position.y - otherPosition.y, 2) <= pow((this.radius + otherCircle.radius) * 0.8, 2)
	}

	contains(vector: p5.Vector): boolean {
		let pow = sketchP.pow;

		return pow(this.position.x - vector.x, 2) + pow(this.position.y - vector.y, 2) <= pow(this.radius, 2);
	}

	setDestination(destination: p5.Vector): void {
		this.destination = destination;
		this.bgColor = sketchP.color(255, 0, 0)
	}

	update() {
		if (this.destination === undefined) {
			return
		} else if (distance(this.position, this.destination) < 5) {
			this.destination = undefined;
			return
		}

		// Calculate the heading and the speed
		let heading = p5.Vector.sub(this.destination, this.position);
		let speed = sketchP.max(heading.mag() / 10, 5);
		heading.setMag(speed);

		this.position.add(heading);
	}

	draw() {
		sketchP.fill(this.bgColor);
		sketchP.ellipse(this.position.x, this.position.y, this.radius);
		if (this.destination !== undefined && debug) {
			sketchP.line(this.position.x, this.position.y, this.destination.x, this.destination.y)
		}
		sketchP.fill(sketchP.color(0));
		sketchP.text(String(this.level), this.position.x, this.position.y);
	}
}

/**
 * Generates a random vector in the canvas bounds
 */
function getRandomPosition() {
	const x = sketchP.random(0, sketchP.height);
	const y = sketchP.random(0, sketchP.width);

	return sketchP.createVector(x, y);
}

function distance(v1: p5.Vector, v2: p5.Vector) {
	return sketchP.dist(v1.x, v1.y, v2.x, v2.y);
}