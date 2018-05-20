let points = [];

points.containsX = function (mouseX) {
  for (let point of points) {
    if (point.x === mouseX) {
      return true;
    }
  }
  return false;
}

function setup() {
  createCanvas(800, 800);
  ellipseMode(CENTER);
}

function draw() {
  background(100);
  for (let i = 0; i < points.length; i++) {
    let point = points[i];
    ellipse(point.x, point.y, 10, 10);

    if (i !== points.length - 1) {
      linearInterpolation(point, points[i + 1]);
    }

    // const polynom = findPolynom(points);
  }
}

function mouseClicked() {
  if (points.containsX(mouseX)) {
    return;
  }

  points.push(createVector(mouseX, mouseY));
  points.sort((a, b) => a.x - b.x);
}

function linearInterpolation(p1, p2) {
  line(p1.x, p1.y, p2.x, p2.y);
}