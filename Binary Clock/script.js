let clock = new Clock(2);

function setup() {
  let speed = select('#speed').value();
  frameRate(speed);

  createCanvas(700, 700);
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(255);
}

function draw() {
  background(0);
  clock.tick();
  clock.draw();
}

function setSpeed(e) {
  let speed = Number(e.target.value);
  frameRate(speed);
}