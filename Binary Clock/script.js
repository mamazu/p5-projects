let speed = 1;
let clock = new Clock(2);


function setup() {
  speed = select('#speed').value();
  createCanvas(700, 700);
  textAlign(CENTER, CENTER);
  textSize(100);
  fill(255);
  frameRate(60);
  // frameRate(1);
}

function draw() {
  background(0);
  clock.tick();
  clock.draw();
}

function setSpeed(e) {
  speed = Number(e.target.value);
}