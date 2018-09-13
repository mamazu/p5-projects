let grid;
let player;
let distanceP;
let frameCountP;
let distances = [];

function setup() {
  createCanvas(700, 700);
  let gridWidth = 300;
  let gridHeight = 300;

  frameCountP = createP();
  distanceP = createP();

  grid = new Grid(gridWidth, gridHeight);
  player = createVector(gridWidth / 2, gridHeight / 2);

  
  ellipseMode(CENTER);
  frameRate(100);
}

function draw() {
  distances.push(grid.getDistanceToCenter(player));

  // Updating and drawing the grid
  grid.update(player);

  background(0);
  grid.draw();

  // Pointing at the current player
  stroke(255, 0, 0);
  strokeWeight(3);
  noFill();
  [scaleX, scaleY] = grid.getScale()
  ellipse(player.x * scaleX, player.y * scaleY, 10, 10);

  // Updating the html information
  renderHTML();

  // Calculating the next position and checking if it is in bounds
  nextPlayerPosition(player);

  if (!grid.contains(player)) {
    alert("Game over");
    noLoop();
  }
}

function renderHTML() {
  frameCountP.html(`Itteration : ${frameCount} @ ${frameRate().toFixed(1)}`);
  distanceP.html(`Average Distance : ${getAverageDistance(distances).toFixed(2)}`);
}

// Helper functions
function nextPlayerPosition(player) {
  let randomMovement = undefined;
  let randomNumber = random(4);

  if (randomNumber < 1) {
    randomMovement = createVector(0, 1);
  } else if (randomNumber < 2) {
    randomMovement = createVector(1, 0);
  } else if (randomNumber < 3) {
    randomMovement = createVector(0, -1);
  } else {
    randomMovement = createVector(-1, 0);
  }

  player.add(randomMovement);
}

/**
 * 
 * @param {array} distances 
 */
function getAverageDistance(distances) {
  let sum = distances.reduce((x, y) => x + y, 0);
  return sum / distances.length;
}
