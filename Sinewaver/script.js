
let amplitute = 30;
let period = 30;
let offset = 0.23;

function setup(){
  createCanvas(800, 800);
  noFill();
  stroke(255, 0, 0);
  strokeWeight(5);


  // Setting up default value
  select('#ampliute').value(amplitute);
  select('#period').value(period);
  select('#offset').value(offset);
}


function draw(){
  // Get values
  amplitute = select("#ampliute").value();
  period = select('#period').value();
  offset = select('#offset').value();

  // Draw stuff
  background(255);
  beginShape();
  for(let i = 0; i < width; i++){
    vertex(i, amplitute * sin(i / width * period + offset) + height/ 2);
  }
  endShape();
}
