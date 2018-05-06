let circle;

function setup(){
  let size = createVector(800, 800);
  createCanvas(size.x, size.y);

  //Settings
  angleMode(DEGREES);
  frameRate(10);
  ellipseMode(RADIUS);

  circle = new RandomCircle(p5.Vector.div(size, 2), 100);
}

function draw(){
  background(255);
  fill(0, 0, 255);
  ellipse(400, 400, 100);
  fill(255, 0, 0);
  circle.addPoint();
  circle.show();

  text(circle.getPointsLeft(), 40, 40);
}
