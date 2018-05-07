var circleList = null;

function setup() {
	circleList = new AreaList();
	createCanvas(800, 800);
	generateCircleList();
	noLoop();

	document.getElementById('numberOfPoints').addEventListener('change', draw);
}

function draw() {
	noStroke();
	circleList.draw();
}

function invertColor(inputColor) {
	let levels = [];
	for (let i = 0; i < 3; i++) {
		levels.push(abs(inputColor.levels[i] - 255));
	}
	return color(...levels)
}

function generateCircleList() {
	circleList.clear();
	let areasCount = document.getElementById('numberOfPoints').value;
	for (let i = 0; i < areasCount; i++) {
		let randomVector = createVector(random(width), random(height));
		circleList.addCircle(new Area(randomVector));
	}
}