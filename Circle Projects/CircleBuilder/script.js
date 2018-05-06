let circles = [];

function setup() {
  let size = createVector(800, 800);
  createCanvas(size.x, size.y);

  //Settings
  angleMode(DEGREES);
  frameRate(10);
  ellipseMode(RADIUS);
  textAlign(CENTER, CENTER);

  circles.push(new RandomCircle(createVector(200, 200), 100));
  circles.push(new OrderedCircle(createVector(600, 200), 100));
  circles.push(new PreciseCircle(createVector(200, 600), 100));

  frameRate(5);
}

function draw() {
  background(255);
  for (let circle of circles) {
    let center = circle.center;
    fill(0, 0, 255);
    ellipse(center.x, center.y, circle.radius);

    fill(255, 0, 0);
    circle.addPoint();
    circle.show();

    fill(255);
    text(circle.getPointsLeft(), center.x, center.y);
  }
}