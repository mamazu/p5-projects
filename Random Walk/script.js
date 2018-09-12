let grid;
let player;

function setup() {
  createCanvas(500, 500);
  grid = new Grid(10, 10);
  player = createVector(5, 5);
}

function draw() {
  grid.update(player);
  grid.draw();
  
  nextPlayerPosition(player);
  if(!grid.contains(player)){
    alert("Game over");
    noLoop();
  }
}

// Helper functions
function nextPlayerPosition(player) {
  let randomMovement = createVector(1, 0);

  player.add(randomMovement);
}
