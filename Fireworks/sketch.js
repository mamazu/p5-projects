let renderable = [];
let nextRocket = 0;

let settings = {
  "variance": 0.2,
  "timeBetweenRockets": 100,
  "particleCount": 400,
  "rocketSpeed": 3,
  "lifeTime": 200
}

function setup() {
  createCanvas(800, 800);
  ellipseMode(RADIUS);
}

function draw() {
  background(0);

  renderable.forEach(obj => obj.update());

  renderable = renderable.filter((item) => !item.isDone());

  renderable.forEach(obj => obj.draw());

  if (frameCount > nextRocket) {
    let nextTime = randomize(settings.timeBetweenRockets);
    nextRocket = frameCount += nextTime;
    renderable.push(new Rocket());
  }
}

function mouseClicked() {
  let mousePos = createVector(mouseX, mouseY);
  renderable.push(new Rocket(mousePos));
}

function randomize(number) {
  let lower = 1 - settings.variance;
  let higher = 1 + settings.variance;
  return random(number * lower, number * higher);
}