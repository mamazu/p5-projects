const speed = 2000;
const circles = new CircleList();
let selectedCircle = null;

function setup() {
  let canvas = createCanvas(600, 600);
  ellipseMode(RADIUS);
  textAlign(CENTER, CENTER);
  frameRate(20);

  setInterval(c => circles.addCircle(), speed);
  canvas.mouseMoved(() => {
    if (selectedCircle !== null) {
      selectedCircle.position = createVector(mouseX, mouseY);
    }
  })
}

function draw() {
  background(0);

  circles.update();
  circles.draw();

  textSize(45);
  fill(255, 0, 255);
  text(circles.getValue(), width / 2, 45);
}

function mousePressed() {
  selectedCircle = circles.getCircleAt(createVector(mouseX, mouseY));
  // circles.sortToFront(selectedCircle);
}

function mouseReleased() {
  selectedCircle = null;
}

function keyPressed(e) {
  if (e.keyCode === 77) {
    circles.magnetize();
  }
}