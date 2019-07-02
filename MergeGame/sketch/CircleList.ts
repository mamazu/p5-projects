class CircleList {
	private circles: Circle[][];

	constructor() {
		this.circles = [];
	}

	addCircle(circle?: Circle) {
		if (circle === undefined) {
			circle = new Circle()
		}
		if (this.circles[circle.level] === undefined) {
			this.circles[circle.level] = [];
		}

		this.circles[circle.level].push(circle);
	}

	*circleList() {
		for (let circles of this.circles) {
			for (let circle of circles) {
				yield circle
			}
		}
	}

	update() {
		this.circles.forEach(circleList => circleList.forEach(c => c.update()));
		this.checkUpgrades()
	}

	getCircleAt(position: p5.Vector): Circle | undefined {
		for (let circle of this.circleList()) {
			if (circle.contains(position)) {
				return circle;
			}
		}
	}

	getValue() {
		let value = 0;
		this.circles.forEach((circleList, index) => {
			value += sketchP.round(sketchP.pow(3, index) * circleList.length);
		});

		return value;
	}

	magnetize() {
		for (let circleLevel of this.circles) {
			if (circleLevel.length < 2) {
				continue;
			}

			let circleLength = circleLevel.length
			for (let i = 0; i < circleLength / 2; i++) {
				circleLevel[i].setDestination(circleLevel[circleLength - 1 - i].position);
			}
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
					// comparisons ++;
				}
			}
		}
	}

	draw() {
		sketchP.textSize(25);
		this.circles.forEach(circleList => circleList.forEach(c => c.draw()));
	}

	toString() {
		let string = ''
		for (let level in this.circles) {
			let count = this.circles[level].length;
			string += `Level ${level}: ${count} <br />`;
		}
		return string
	}
}