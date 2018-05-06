var circleList = new CircleList();

function setup(){
	createCanvas(800, 800);
	updateCircleList();
	frameRate(5);
}

function draw(){
	noStroke();
	circleList.draw();
}

function invertColor(inputColor){
	let levels = [];
	for(let i = 0; i < 3; i++){
		levels.push(abs(inputColor.levels[i] - 255));
	}
	return color(...levels)
}

function updateCircleList(){
	circleList.clear();
	for(let i = 0; i < getCircleCount(); i++){
		let randomVector = createVector(random(width), random(height));
		let c = new Point(randomVector);
		circleList.addCircle(c);
	}
}

function getCircleCount(){
	let value = document.getElementById('numberOfPoints').value;
	console.log(value);
	return value;
}
