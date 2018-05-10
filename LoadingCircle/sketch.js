let progress = 1;
let offset = 0;
let g;

function setup() {
  createCanvas(800, 800);
  g = createGraphics(width, height);
  g.angleMode(DEGREES);
  g.noStroke();
}

function draw() {
  if (progress === 0) {
    return;
  }

  image(drawCircle(), 0, 0);

  drawTriangle();

  offset += 1;

  if (progress === 100) {
    noLoop();
  }
}

function drawCircle() {
  g.background(0);
  g.fill(35, 106, 250);
  const endAngle = map(progress, 0, 100, 0, 360) + offset;
  g.arc(200, 200, 200, 200, offset, endAngle);

  g.fill(0);
  g.ellipse(200, 200, 180, 180);

  return g;
}

function drawTriangle() {

  fill(35, 106, 250);
  const middle = createVector(width / 2, height / 2);
  const size = createVector(200, 100);

  const progressHeight = map(progress, 0, 100, 0, size.y);

  const startHeight = offset % size.y;
  const endHeight = (offset + progressHeight) % size.y;

  const widthAtStart = map(startHeight, 0, size.y, 0, size.x);
  const widthAtEnd = map(endHeight, 0, size.y, 0, size.x);

  beginShape();
  vertex(middle.x - widthAtEnd, middle.y + endHeight);
  vertex(middle.x + widthAtEnd, middle.y + endHeight);
  vertex(middle.x + widthAtStart, middle.y + startHeight);
  vertex(middle.x - widthAtStart, middle.y + startHeight);
  endShape(CLOSE);
}

function mouseClicked() {
  progress += min(progress, 10);
}